import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')
        if (!stripeSecret) throw new Error('STRIPE_SECRET_KEY is not configured in Supabase secrets')

        const stripe = new Stripe(stripeSecret, {
            apiVersion: '2022-11-15',
            httpClient: Stripe.createFetchHttpClient(),
        })

        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

        // We use service role key to bypass RLS for customer management
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

        // Get current user to verify identity
        const authHeader = req.headers.get('Authorization')!
        const { data: { user }, error: userError } = await createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
            global: { headers: { Authorization: authHeader } }
        }).auth.getUser()

        if (userError || !user) {
            throw new Error('User not authenticated')
        }

        const { cartItems, recurringType } = await req.json()

        if (!cartItems || !Array.isArray(cartItems)) {
            throw new Error('Invalid cart items')
        }

        // 1. Get or Create Stripe Customer
        let { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('stripe_customer_id, email, full_name')
            .eq('id', user.id)
            .single()

        if (profileError) {
            console.error('Error fetching profile:', profileError)
        }

        let customerId = profile?.stripe_customer_id

        if (!customerId) {
            console.log('Creating new Stripe customer for user:', user.id)
            const customer = await stripe.customers.create({
                email: user.email,
                name: profile?.full_name || user.user_metadata?.full_name || 'Valued Customer',
                metadata: {
                    supabase_uid: user.id
                }
            })
            customerId = customer.id
            // Update profile
            await supabaseAdmin
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id)
        }

        // 2. Generate Purchase ID
        const purchaseId = `PUR-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

        // 3. Create Session
        const origin = req.headers.get('origin') || 'http://localhost:5173'
        const success_url = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
        const cancel_url = `${origin}/checkout?canceled=true`

        let session;

        if (recurringType === 'weekly' || recurringType === 'monthly') {
            const priceKey = recurringType === 'weekly' ? 'STRIPE_PRICE_WEEKLY' : 'STRIPE_PRICE_MONTHLY'
            const priceId = Deno.env.get(priceKey)

            if (!priceId) {
                throw new Error(`Price ID for ${recurringType} (${priceKey}) not configured in secrets`)
            }

            session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                customer: customerId,
                line_items: [{ price: priceId, quantity: 1 }],
                success_url,
                cancel_url,
                metadata: {
                    patient_id: user.id,
                    purchase_id: purchaseId,
                    recurring_type: recurringType
                }
            })

        } else {
            // ONE-TIME PAYMENT MODE
            const line_items = cartItems.map((item: any) => {
                if (!item.price_cents || item.price_cents <= 0) {
                    throw new Error(`Invalid price for item: ${item.name}`)
                }
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: item.image_url ? [item.image_url] : undefined,
                        },
                        unit_amount: Math.round(item.price_cents),
                    },
                    quantity: item.quantity || 1,
                }
            })

            session = await stripe.checkout.sessions.create({
                mode: 'payment',
                customer: customerId,
                line_items,
                success_url,
                cancel_url,
                metadata: {
                    patient_id: user.id,
                    purchase_id: purchaseId,
                    cart_snapshot_ok: 'true'
                }
            })
        }

        console.log('Checkout session created:', session.id)

        return new Response(
            JSON.stringify({ url: session.url }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )

    } catch (error: any) {
        console.error('Checkout Function Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
