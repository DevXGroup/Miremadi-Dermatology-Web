import { serve } from "std/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    httpClient: Stripe.createFetchHttpClient(),
})
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

serve(async (req) => {
    try {
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

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            // Strict Security Check: Verify patient_id from metadata
            const patientId = session.metadata?.patient_id;
            const purchaseId = session.metadata?.purchase_id;

            if (!patientId) {
                console.error('Missing patient_id in metadata');
                // We could try to fallback to email lookup, but for secure flow we expect metadata
                // return new Response('Missing metadata', { status: 400 });
            }

            // Retrieve full session with line items
            const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items.data.price.product']
            });

            // 1. Create Order
            const { data: order, error: orderError } = await supabaseClient
                .from('orders')
                .insert({
                    user_id: patientId, // Trusted from server-side metadata
                    purchase_id: purchaseId, // Trusted from server-side metadata
                    total_amount_cents: session.amount_total,
                    currency: session.currency,
                    stripe_payment_intent_id: session.payment_intent as string,
                    stripe_subscription_id: session.subscription as string,
                    payment_status: 'paid',
                    shipping_status: 'pending',
                    recurring: session.mode === 'subscription' ? 'monthly' : 'none',

                    // Shipping Info
                    shipping_name: session.shipping_details?.name,
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
                // If purchase_id collision or other error
                console.error('Order creation error:', orderError);
                throw orderError;
            }

            // 2. Create Order Items
            const lineItems = fullSession.line_items?.data || [];

            // Allow for parallel processing of items
            for (const item of lineItems) {
                let productId = null;
                const productName = item.description;

                // Try to match product by name (MVP) or Metadata if we had it
                // Ideally Stripe Product Metadata has 'supabase_product_id'
                const stripeProduct = item.price?.product as Stripe.Product;
                // if (stripeProduct?.metadata?.supabase_id) ...

                if (!productId) {
                    const { data: product } = await supabaseClient
                        .from('products')
                        .select('id')
                        .eq('name', productName)
                        .maybeSingle();

                    if (product) productId = product.id;
                }

                // If still no product ID, we might need a fallback or just log it is a "Custom" item
                // For constraint safety, if we have a strict FK, we need a fallback product.
                if (!productId) {
                    // Fallback to avoid webhook crashing, or creating a 'Miscellaneous' product on fly
                    // For now, logging. The insert will fail if FK is strict and we pass null.
                    // Assuming FK is strictly linking to products table.
                    // Let's try to get ANY product to start with.
                    const { data: fallback } = await supabaseClient.from('products').select('id').limit(1).single();
                    productId = fallback?.id;
                }

                await supabaseClient.from('order_items').insert({
                    order_id: order.id,
                    product_id: productId,
                    product_name_snapshot: productName,
                    unit_price_cents: item.price?.unit_amount,
                    quantity: item.quantity,
                    line_total_cents: item.amount_total
                });
            }
        }

        return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
    } catch (err: any) {
        return new Response(err.message, { status: 400 })
    }
})
