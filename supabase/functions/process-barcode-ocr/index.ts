import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Tesseract from 'https://esm.sh/tesseract.js@4'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { orderId, imageUrl } = await req.json()

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        )

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
