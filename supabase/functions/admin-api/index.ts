import { createClient } from "@supabase/supabase-js"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Initialize Client with User Auth
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 1. Authenticate & Authorize
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
        if (authError || !user) throw new Error('Unauthorized');

        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (!profile || !profile.is_admin) {
            return new Response(JSON.stringify({ error: 'Forbidden: Admins only' }), { status: 403, headers: corsHeaders });
        }

        // 2. Handle Routes
        const url = new URL(req.url);
        const action = url.searchParams.get('action'); // actions: list, search, stats

        if (req.method === 'GET') {
            if (action === 'stats') {
                // Return simple stats for "Today"
                const today = new Date().toISOString().split('T')[0];

                const { count: pendingCount } = await supabaseClient
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('payment_status', 'paid')
                    .neq('status', 'completed'); // Assuming pending is default/paid

                const { count: completedCount } = await supabaseClient
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'completed')
                    .gte('completed_at', today);

                return new Response(JSON.stringify({ pending: pendingCount, completedToday: completedCount }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            if (action === 'list') {
                const status = url.searchParams.get('status') || 'pending';
                // Fetch orders. Join with profiles to get name?
                // Supabase JS doesn't do deep joins easily without knowing relationship names.
                // Assuming 'user_id' is FK to profiles.id

                let query = supabaseClient
                    .from('orders')
                    .select('*, profiles(full_name, email)')
                    .order('created_at', { ascending: false });

                if (status === 'completed') {
                    query = query.eq('status', 'completed');
                } else {
                    // Pending list: Paid but not completed
                    query = query.eq('payment_status', 'paid').neq('status', 'completed');
                }

                const { data, error } = await query;
                if (error) throw error;
                return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            if (action === 'search') {
                const q = url.searchParams.get('query');
                if (!q) return new Response(JSON.stringify({ data: [] }), { headers: corsHeaders });

                // Search by purchase_id OR profile name
                // This is complex in simple Supabase query. fallback to searching orders matching purchase_id 
                // OR finding users matching name then finding their orders.
                // Simplified: Search purchase_id ONLY, or simple match.

                const { data, error } = await supabaseClient
                    .from('orders')
                    .select('*, profiles(full_name, email)')
                    .or(`purchase_id.ilike.%${q}%,tracking_number.ilike.%${q}%`)
                    .limit(20);

                if (error) throw error;
                return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
        }

        if (req.method === 'POST') {
            // Assume Action is 'complete'
            const formData = await req.formData();
            const orderId = formData.get('orderId') as string;
            const trackingNumber = formData.get('trackingNumber') as string;
            const imageFile = formData.get('image') as File;

            if (!orderId || !trackingNumber || !imageFile) {
                throw new Error('Missing required fields');
            }

            // 1. Upload Image
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${orderId}/${crypto.randomUUID()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabaseClient
                .storage
                .from('order_tracking_images')
                .upload(fileName, imageFile, {
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabaseClient
                .storage
                .from('order_tracking_images')
                .getPublicUrl(fileName);

            // 3. Update Order
            const { data: order, error: updateError } = await supabaseClient
                .from('orders')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    tracking_number: trackingNumber,
                    tracking_image_url: publicUrl,
                    shipping_status: 'complete' // Sync this too
                })
                .eq('id', orderId)
                .select()
                .single();

            if (updateError) throw updateError;

            return new Response(JSON.stringify({ success: true, order }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        throw new Error('Method not supported');

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
