import { serve } from "std/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    httpClient: Stripe.createFetchHttpClient(),
})
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // Get current user
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            throw new Error('User not authenticated')
        }

        const { cartItems, recurringType } = await req.json()

        // 1. Get or Create Stripe Customer
        let { data: profile } = await supabaseClient
            .from('profiles')
            .select('stripe_customer_id, email, full_name')
            .eq('id', user.id)
            .single()

        let customerId = profile?.stripe_customer_id

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: profile?.full_name ?? user.user_metadata.full_name,
                metadata: {
                    supabase_uid: user.id
                }
            })
            customerId = customer.id
            // Update profile
            await supabaseClient
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
            // SUBSCRIPTION MODE
            const priceId = recurringType === 'weekly' ? Deno.env.get('STRIPE_PRICE_WEEKLY') : Deno.env.get('STRIPE_PRICE_MONTHLY')

            if (!priceId) {
                throw new Error(`Price ID for ${recurringType} not configured`)
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
            const line_items = cartItems.map((item: any) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: item.image_url ? [item.image_url] : undefined,
                    },
                    unit_amount: item.price_cents,
                },
                quantity: item.quantity,
            }))

            session = await stripe.checkout.sessions.create({
                mode: 'payment',
                customer: customerId,
                line_items,
                success_url,
                cancel_url,
                metadata: {
                    patient_id: user.id,
                    purchase_id: purchaseId,
                    // Store cart snapshot only if small enough, or handle item recreation in webhook
                    cart_snapshot_ok: 'true'
                }
            })
        }

        return new Response(
            JSON.stringify({ url: session.url }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
