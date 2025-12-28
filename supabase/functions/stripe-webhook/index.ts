import Stripe from "https://esm.sh/stripe@13.10.0?target=deno"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    try {
        const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')
        if (!stripeSecret) throw new Error('STRIPE_SECRET_KEY is not configured')

        const stripe = new Stripe(stripeSecret, {
            apiVersion: '2022-11-15',
            httpClient: Stripe.createFetchHttpClient(),
        })

        const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

        const signature = req.headers.get('stripe-signature')
        if (!signature) throw new Error('No signature')

        const body = await req.text()
        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return new Response(err.message, { status: 400 });
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

        console.log('Processing event:', event.type)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            const patientId = session.metadata?.patient_id;
            const purchaseId = session.metadata?.purchase_id;

            if (!patientId || !purchaseId) {
                console.error('Missing required metadata in session:', session.id);
                return new Response(JSON.stringify({ error: 'Missing metadata' }), { status: 400 });
            }

            // Retrieve full session with line items
            const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items.data.price.product']
            });

            // 1. Create Order
            const { data: order, error: orderError } = await supabaseAdmin
                .from('orders')
                .insert({
                    user_id: patientId,
                    purchase_id: purchaseId,
                    total_amount_cents: session.amount_total,
                    currency: session.currency,
                    stripe_payment_intent_id: session.payment_intent as string,
                    stripe_subscription_id: session.subscription as string,
                    payment_status: 'paid',
                    status: 'pending', // Main order status
                    recurring: session.mode === 'subscription' ? 'monthly' : 'none',

                    // Shipping Info
                    shipping_name: session.shipping_details?.name || session.customer_details?.name,
                    shipping_address_line1: session.shipping_details?.address?.line1,
                    shipping_address_line2: session.shipping_details?.address?.line2,
                    shipping_city: session.shipping_details?.address?.city,
                    shipping_state: session.shipping_details?.address?.state,
                    shipping_postal_code: session.shipping_details?.address?.postal_code,
                    shipping_country: session.shipping_details?.address?.country,
                })
                .select()
                .single()

            if (orderError) {
                console.error('Order creation error:', orderError);
                throw orderError;
            }

            // 2. Create Order Items
            const lineItems = fullSession.line_items?.data || [];

            for (const item of lineItems) {
                let productId = null;
                const productName = item.description;

                const { data: product } = await supabaseAdmin
                    .from('products')
                    .select('id')
                    .eq('name', productName)
                    .maybeSingle();

                if (product) productId = product.id;

                if (!productId) {
                    const { data: fallback } = await supabaseAdmin.from('products').select('id').limit(1).single();
                    productId = fallback?.id;
                }

                await supabaseAdmin.from('order_items').insert({
                    order_id: order.id,
                    product_id: productId,
                    product_name_snapshot: productName,
                    unit_price_cents: item.price?.unit_amount,
                    quantity: item.quantity,
                    line_total_cents: item.amount_total
                });
            }
            console.log('Order processed successfully:', order.id)
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    } catch (err: any) {
        console.error('Webhook Error:', err.message)
        return new Response(err.message, { status: 400 })
    }
})
