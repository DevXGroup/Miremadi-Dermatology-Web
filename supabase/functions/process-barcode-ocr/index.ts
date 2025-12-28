import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Tesseract from 'https://esm.sh/tesseract.js@4'

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    // Add production domains here
]

serve(async (req) => {
    const origin = req.headers.get('origin')
    const corsHeaders = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin!) ? origin! : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } }
        })

        // Verify the user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // Verify the user is an admin
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single()

        if (profileError || !profile?.is_admin) {
            return new Response(JSON.stringify({ error: 'Forbidden: Admins only' }), {
                status: 403,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        const { orderId, imageUrl } = await req.json()

        // 1. Fetch image from storage
        const { data: imageData, error: downloadError } = await supabase.storage
            .from('tracking-barcodes')
            .download(imageUrl)

        if (downloadError) throw downloadError

        // 2. Convert to base64 for Tesseract
        const buffer = await imageData.arrayBuffer()
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))

        // 3. OCR Processing
        const { data: { text } } = await Tesseract.recognize(
            `data:image/png;base64,${base64}`,
            'eng',
            {
                // logger: m => console.log(m)
            }
        )

        // 4. Extract tracking number (USPS: 20-22 digits)
        const trackingNumber = text.replace(/\s/g, '').match(/\d{20,22}/)?.[0]

        if (!trackingNumber) {
            throw new Error('No valid USPS tracking number found in the image. Please enter it manually.')
        }

        // 5. Generate USPS URL
        const trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`

        // 6. Update order in database
        const { error: updateError } = await supabase
            .from('orders')
            .update({
                tracking_number: trackingNumber,
                tracking_url: trackingUrl,
                barcode_image_url: imageUrl,
                status: 'shipped',
                shipped_at: new Date().toISOString()
            })
            .eq('id', orderId)

        if (updateError) throw updateError

        // 7. Success Response
        return new Response(
            JSON.stringify({
                success: true,
                trackingNumber,
                trackingUrl
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        console.error('OCR Error:', error.message)
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        )
    }
})
