import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    // Add production domains here
]

Deno.serve(async (req) => {
    const origin = req.headers.get('origin')
    const corsHeaders = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin!) ? origin! : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

        // We use service role key for administrative tasks
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

        // Authenticate the user calling the function
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) throw new Error('No authorization header')

        const { data: { user }, error: authError } = await createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
            global: { headers: { Authorization: authHeader } }
        }).auth.getUser()

        if (authError || !user) throw new Error('Unauthorized');

        // Check if user is admin
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (profileError || !profile || !profile.is_admin) {
            return new Response(JSON.stringify({ error: 'Forbidden: Admins only' }), {
                status: 403,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // 2. Handle Routes
        const url = new URL(req.url);
        const action = url.searchParams.get('action');

        if (req.method === 'GET') {
            if (action === 'stats') {
                const today = new Date().toISOString().split('T')[0];

                const { count: pendingCount } = await supabaseAdmin
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('payment_status', 'paid')
                    .neq('status', 'completed');

                const { count: completedCount } = await supabaseAdmin
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'completed')
                    .gte('completed_at', today);

                return new Response(JSON.stringify({ pending: pendingCount, completedToday: completedCount }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            if (action === 'list') {
                const status = url.searchParams.get('status') || 'pending';

                let query = supabaseAdmin
                    .from('orders')
                    .select('*, profiles(full_name, email)')
                    .order('created_at', { ascending: false });

                if (status === 'completed') {
                    query = query.eq('status', 'completed');
                } else {
                    query = query.eq('payment_status', 'paid').neq('status', 'completed');
                }

                const { data, error } = await query;
                if (error) throw error;
                return new Response(JSON.stringify({ data }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            if (action === 'search') {
                const q = url.searchParams.get('query');
                if (!q) return new Response(JSON.stringify({ data: [] }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });

                const { data, error } = await supabaseAdmin
                    .from('orders')
                    .select('*, profiles(full_name, email)')
                    .or(`purchase_id.ilike.%${q}%,tracking_number.ilike.%${q}%`)
                    .limit(20);

                if (error) throw error;
                return new Response(JSON.stringify({ data }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (req.method === 'POST') {
            const formData = await req.formData();
            const orderId = formData.get('orderId') as string;
            const trackingNumber = formData.get('trackingNumber') as string;
            const imageFile = formData.get('image') as File;

            if (!orderId || !trackingNumber || !imageFile) {
                throw new Error('Missing required fields');
            }

            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${orderId}/${crypto.randomUUID()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabaseAdmin
                .storage
                .from('order_tracking_images')
                .upload(fileName, imageFile, {
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabaseAdmin
                .storage
                .from('order_tracking_images')
                .getPublicUrl(fileName);

            const { data: order, error: updateError } = await supabaseAdmin
                .from('orders')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    tracking_number: trackingNumber,
                    tracking_image_url: publicUrl,
                    shipping_status: 'complete'
                })
                .eq('id', orderId)
                .select()
                .single();

            if (updateError) throw updateError;

            return new Response(JSON.stringify({ success: true, order }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        throw new Error('Method not supported');

    } catch (error: any) {
        console.error('Admin API Function Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
