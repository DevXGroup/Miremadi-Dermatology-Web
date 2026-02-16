import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, ChevronRight, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const POSTS = [
    {
        id: 1,
        title: 'The Science of Hydration',
        excerpt: 'Understanding how moisture retention works at a cellular level is key to glowing skin.',
        content: `
            <p>In my 57 years of practice, I have seen countless patients who underestimate the role of hydration in skin health. Hydration is the foundation of healthy, resilient skin. While we often think of hydration in terms of drinking water, the science of dermal hydration involves a complex interplay between water intake, the skin barrier, and hygroscopic molecules like Hyaluronic Acid.</p>
            <h3>The Role of the Skin Barrier</h3>
            <p>The stratum corneum, our outermost skin layer, acts as a critical seal. When this barrier is compromised by harsh cleansers or environmental stressors, we experience Trans-Epidermal Water Loss (TEWL). This leads to the tightness and flaking we associate with dehydration.</p>
            <h3>Humectants vs. Occlusives</h3>
            <p>In the Miremadi System, we emphasize the two-step approach:</p>
            <p>1. <strong>Humectants:</strong> Molecules like Hyaluronic Acid and Glycerin that draw water into the skin.<br/>
            2. <strong>Occlusives:</strong> Ceramides and oils that seal that moisture in.</p>
            <p>Understanding your skin type is essential for choosing the right balance between these two components. I always tell my patients — hydration is not optional, it is the first prescription I write for every skin type.</p>
        `,
        date: 'Sep 18, 2025',
        readTime: '5 min read',
        image: '/images/blog/hydration.jpg',
        category: 'Science'
    },
    {
        id: 2,
        title: 'Winter Skincare Routine',
        excerpt: 'As the seasons change, so should your routine. Here are our top tips for the cooler months.',
        content: `
            <p>Every year as the cooler months arrive in San Diego, I notice an uptick in patients coming in with dry, irritated skin. Even here in La Jolla, the drop in humidity and increase in indoor heating takes a real toll. The transition into winter is the perfect time to audit your skincare cabinet.</p>
            <h3>Swap to Creamier Cleansers</h3>
            <p>During summer, foaming cleansers help manage increased oil and sweat. However, in winter, these can be too stripping. Switching to a milk or cream-based cleanser helps preserve your natural lipid barrier. Our Mirage Silky Gentle Wash was formulated specifically for this purpose.</p>
            <h3>Introduce Gentle Retinoids</h3>
            <p>Post-summer is the "Golden Season" for corrective treatments. Since UV exposure is lower, it is safer to introduce Vitamin A derivatives to repair summer sun damage. I recommend starting with a low concentration and building up gradually.</p>
            <h3>Focus on Barrier Repair</h3>
            <p>Incorporate products rich in Niacinamide and fatty acids to fortify the skin against cold, dry air. A strong barrier is your best defense against the environmental stressors of winter.</p>
        `,
        date: 'Nov 05, 2025',
        readTime: '4 min read',
        image: '/images/blog/winter_skincare.jpg',
        category: 'Lifestyle'
    },
    {
        id: 3,
        title: 'Understanding Retinoids',
        excerpt: 'Everything you need to know about the gold standard of anti-aging ingredients.',
        content: `
            <p>Retinoids are arguably the most studied and proven ingredients in dermatology. Often referred to as the "Gold Standard," they offer benefits ranging from acne reduction to significant anti-aging effects. In my decades of prescribing retinoids, I have seen them transform skin when used correctly — and cause unnecessary frustration when used without guidance.</p>
            <h3>How Retinoids Work</h3>
            <p>Retinoids work by communicating with skin cells to increase turnover and stimulate collagen production. This process helps to thicken the deeper layers of the skin while smoothing the surface texture. The result is firmer, clearer, more even-toned skin over time.</p>
            <h3>The Transition Period</h3>
            <p>Known as "retinization," the first few weeks of use can involve redness and peeling. At Miremadi Dermatology, we recommend the "Sandwich Method" — applying moisturizer before and after your retinoid — to minimize irritation while maintaining efficacy. Most patients see the adjustment period resolve within three to four weeks.</p>
            <h3>Choosing the Right Strength</h3>
            <p>From over-the-counter Retinol to prescription-strength Tretinoin, the right choice depends on your skin's sensitivity and your specific goals. I always start patients on the gentlest effective dose and adjust from there. Consultation with a specialist is key to avoiding unnecessary inflammation and getting the results you are looking for.</p>
        `,
        date: 'Dec 20, 2025',
        readTime: '8 min read',
        image: '/images/blog/retinoids.jpg',
        category: 'Education'
    },
    {
        id: 4,
        title: 'Melanoma Prevention: Caring for Your Skin',
        excerpt: 'Learn essential dermatology-backed strategies to protect your skin and reduce your risk of melanoma.',
        content: `
            <p>Melanoma is the most serious form of skin cancer, but it is also one of the most preventable. As the only provider of free skin cancer screening for the American Cancer Society in San Diego County, I have made early detection a personal mission. At Miremadi Dermatology, proactive skin care and regular monitoring are the cornerstones of melanoma prevention.</p>
            <h3>Understanding Melanoma</h3>
            <p>Melanoma develops in the melanocytes, the cells responsible for producing pigment in our skin. While it accounts for only about 1% of skin cancers, it causes the majority of skin cancer deaths. Early detection dramatically improves outcomes, with a 5-year survival rate exceeding 99% when caught in its earliest stages.</p>
            <h3>The ABCDEs of Mole Monitoring</h3>
            <p>Regularly examining your skin is one of the most effective prevention tools. I teach every patient to look for the warning signs known as the ABCDEs:</p>
            <p><strong>A — Asymmetry:</strong> One half of the mole does not match the other.<br/>
            <strong>B — Border:</strong> Irregular, ragged, or blurred edges.<br/>
            <strong>C — Color:</strong> Uneven shades of brown, black, tan, red, white, or blue.<br/>
            <strong>D — Diameter:</strong> Larger than 6mm (the size of a pencil eraser), though melanomas can be smaller.<br/>
            <strong>E — Evolving:</strong> Any change in size, shape, color, or symptoms like itching or bleeding.</p>
            <h3>Daily Sun Protection</h3>
            <p>UV radiation is the leading modifiable risk factor for melanoma. Even here in La Jolla, where beautiful weather can lull us into complacency, sun protection must be a daily habit:</p>
            <p>1. <strong>Broad-spectrum sunscreen:</strong> Apply SPF 30 or higher every morning, and reapply every two hours when outdoors.<br/>
            2. <strong>Protective clothing:</strong> Wear wide-brimmed hats, UV-blocking sunglasses, and long sleeves when possible.<br/>
            3. <strong>Seek shade:</strong> Avoid direct sun exposure between 10 AM and 4 PM when UV rays are strongest.<br/>
            4. <strong>Avoid tanning beds:</strong> Indoor tanning increases melanoma risk by up to 75%, especially when used before age 35.</p>
            <h3>The Role of Annual Skin Exams</h3>
            <p>Self-exams are essential, but they are not a substitute for professional evaluation. A board-certified dermatologist can identify suspicious lesions that may be invisible to the untrained eye, using tools like dermoscopy for magnified analysis. We recommend annual full-body skin exams for all patients, and more frequent checks for those with a personal or family history of skin cancer.</p>
            <h3>Lifestyle Factors That Support Skin Health</h3>
            <p>Beyond sun protection, a holistic approach to skin health can further reduce risk. Antioxidant-rich foods such as berries, leafy greens, and fish high in omega-3 fatty acids help combat oxidative stress. Avoiding smoking and managing chronic inflammation also contribute to healthier skin over time.</p>
            <p>Prevention starts with awareness. If you notice any changes in your skin, do not wait — schedule a consultation promptly. In my experience, early intervention is always the best medicine.</p>
        `,
        date: 'Jan 28, 2026',
        readTime: '6 min read',
        image: '/images/blog/melanoma.webp',
        category: 'Prevention'
    },
    {
        id: 5,
        title: 'Introducing the Mirage Collection',
        excerpt: 'Dr. Miremadi shares the vision behind his signature medical-grade skincare line and how it embodies decades of clinical expertise.',
        content: `
            <p>After more than five decades of treating patients and studying the intricacies of skin at a cellular level, I wanted to create something that brought the precision of clinical dermatology directly into people's daily routines. The Mirage Collection is the culmination of that vision — a complete, medical-grade skincare system designed to deliver transformative results without the need for invasive procedures.</p>
            <h3>Why I Created Mirage</h3>
            <p>Throughout my career, I have seen patients spend considerable amounts on products that promise the world but deliver very little. Many over-the-counter products lack the active ingredient concentrations needed to make a real difference. I wanted to bridge that gap — to offer formulations with clinical-strength ingredients at concentrations that actually work, backed by my experience in both dermatology and pathology.</p>
            <h3>The Philosophy Behind the Line</h3>
            <p>Every product in the Mirage Collection was formulated with a simple principle: treat the skin the way a physician would. That means gentle yet effective cleansing, targeted active ingredients for correction and rejuvenation, and robust collagen support for long-term structural health. The line works as a complete system — each product complements the others to create a synergistic routine.</p>
            <h3>The Complete System</h3>
            <p>The collection includes six carefully designed products:</p>
            <p>1. <strong>Mirage Silky Gentle Wash</strong> — For sensitive and reactive skin types that need thorough cleansing without irritation.<br/>
            2. <strong>Mirage Silky Facial Wash</strong> — A daily cleanser with micro-cleansing technology for refined pores and a balanced complexion.<br/>
            3. <strong>Mirage C Reti Cream</strong> — Our star treatment combining Vitamin C and Retinoid for peeling, brightening, and rejuvenation.<br/>
            4. <strong>Mirage Collagen Day Cream</strong> — Daytime hydration with marine collagen for elasticity and environmental defense.<br/>
            5. <strong>Mirage Collagen Night Cream</strong> — A restorative balm that works with your skin's natural overnight repair cycle.<br/>
            6. <strong>Mirage Collagen Eye Cream</strong> — Targeted peptide therapy for dark circles, puffiness, and fine lines around the eyes.</p>
            <p>I am proud to say that every product in this line represents the same standard of care I bring to my patients in the clinic. The Mirage Collection is not just skincare — it is the Miremadi System brought home.</p>
        `,
        date: 'Feb 05, 2026',
        readTime: '6 min read',
        image: '/images/promo/mirage_promo.webp',
        category: 'Mirage Collection'
    },
    {
        id: 6,
        title: 'Mirage Silky Gentle Wash: The Foundation of Sensitive Skin Care',
        excerpt: 'Why a gentle cleanser matters more than you think, and how this botanical-infused formula protects your skin barrier.',
        content: `
            <p>Cleansing is the most fundamental step in any skincare routine, yet it is also where most people inadvertently damage their skin. Harsh sulfates, aggressive foaming agents, and high-pH formulas strip away the natural oils and ceramides that form your skin's protective barrier. For patients with sensitive, reactive, or compromised skin, this can trigger a cycle of irritation, redness, and dehydration that no amount of serums or moisturizers can fully correct.</p>
            <h3>Designed for Sensitivity</h3>
            <p>The Mirage Silky Gentle Wash was formulated specifically for patients who have struggled to find a cleanser that does not aggravate their skin. Its ultra-gentle, sulfate-free formula uses botanical extracts to dissolve makeup, sunscreen, and environmental pollutants without disrupting the lipid barrier. The result is clean, calm skin that feels hydrated rather than tight.</p>
            <h3>Key Benefits</h3>
            <p><strong>Preserves the skin barrier:</strong> Unlike conventional cleansers that strip away protective oils, this formula maintains the delicate balance of your stratum corneum. A healthy barrier means less Trans-Epidermal Water Loss and better moisture retention throughout the day.</p>
            <p><strong>Botanical infusion:</strong> Plant-derived extracts provide natural anti-inflammatory and antioxidant benefits, soothing irritation while gently purifying the skin.</p>
            <p><strong>Silky, hydrated finish:</strong> Patients consistently report that their skin feels soft and nourished immediately after washing — not the "squeaky clean" feeling that actually signals damage.</p>
            <p><strong>Ideal for reactive conditions:</strong> Whether you are managing rosacea, post-procedure sensitivity, eczema-prone skin, or simply have a naturally reactive complexion, this cleanser provides thorough cleansing without triggering flare-ups.</p>
            <h3>How to Use</h3>
            <p>Apply a small amount to damp skin and massage gently in circular motions. Rinse with lukewarm water — never hot, as heat further compromises the barrier. Use morning and evening as the first step in your Mirage skincare routine. It pairs especially well with the Mirage Collagen Day Cream or Night Cream applied immediately after.</p>
        `,
        date: 'Feb 06, 2026',
        readTime: '5 min read',
        image: '/images/products/silky_gentle_wash.png',
        category: 'Mirage Collection'
    },
    {
        id: 7,
        title: 'Mirage Silky Facial Wash: Daily Clarity for Every Skin Type',
        excerpt: 'A sophisticated daily cleanser with micro-cleansing technology that refines pores and refreshes without over-stripping.',
        content: `
            <p>Finding the right daily facial cleanser is often a balancing act. You need something effective enough to clear pores and remove the day's buildup, yet gentle enough to use twice daily without causing dryness or irritation. The Mirage Silky Facial Wash was engineered to strike that perfect balance using advanced micro-cleansing technology.</p>
            <h3>Micro-Cleansing Technology</h3>
            <p>Unlike traditional cleansers that rely on harsh surfactants to strip away oils, micro-cleansing technology uses ultra-fine cleansing particles that penetrate into pores to lift out impurities, excess sebum, and dead skin cells. This targeted approach means the cleanser works where it is needed most without disturbing the healthy oils and microbiome on the rest of your face.</p>
            <h3>Key Benefits</h3>
            <p><strong>Pore refinement:</strong> With consistent daily use, patients notice visibly smaller, cleaner pores. The micro-cleansing particles prevent the buildup of debris that leads to blackheads and enlarged pores over time.</p>
            <p><strong>Balanced pH:</strong> The formula is calibrated to maintain your skin's natural slightly acidic pH, which is critical for barrier function and for keeping harmful bacteria in check. Many conventional cleansers are too alkaline, which disrupts this balance and leads to breakouts or dryness.</p>
            <p><strong>Suitable for all skin types:</strong> Whether your skin is oily, dry, combination, or normal, this cleanser adapts to your needs. It removes excess oil in the T-zone without drying out the cheeks — a common complaint with one-size-fits-all products.</p>
            <p><strong>Refreshed complexion:</strong> The cleanser leaves a clean, bright, and revitalized feel after every wash, creating the ideal canvas for your treatment products to penetrate effectively.</p>
            <h3>When to Choose This Over the Gentle Wash</h3>
            <p>If your skin is not particularly sensitive and you are looking for a cleanser with more active pore-cleansing benefits, the Silky Facial Wash is your ideal choice. For patients with sensitive or reactive skin, the Silky Gentle Wash is the better starting point. Some patients even alternate between the two — using the Facial Wash in the evening for a deeper clean and the Gentle Wash in the morning for a softer start to the day.</p>
        `,
        date: 'Feb 07, 2026',
        readTime: '5 min read',
        image: '/images/products/silky_facial_wash.png',
        category: 'Mirage Collection'
    },
    {
        id: 8,
        title: 'Mirage C Reti Cream: The Dual-Action Powerhouse',
        excerpt: 'Combining stabilized Vitamin C with Retinoid, this cream delivers peeling, brightening, and rejuvenation in a single treatment.',
        content: `
            <p>If there are two ingredients that have earned their place at the pinnacle of evidence-based dermatology, they are Vitamin C and Retinoids. Each is extraordinary on its own — but when combined correctly, they create a synergistic effect that addresses virtually every sign of aging and skin damage. The Mirage C Reti Cream brings these two powerhouse ingredients together in a single, carefully stabilized formulation.</p>
            <h3>The Science of the Combination</h3>
            <p><strong>Retinoid (Vitamin A derivative):</strong> Retinoids accelerate cellular turnover, effectively "peeling" away damaged, dull surface cells to reveal fresh, healthy skin underneath. They stimulate collagen and elastin production deep within the dermis, which thickens the skin and reduces the appearance of fine lines and wrinkles over time. Retinoids also regulate melanocyte activity, helping to fade dark spots and hyperpigmentation.</p>
            <p><strong>Stabilized Vitamin C (L-Ascorbic Acid):</strong> Vitamin C is one of the most potent antioxidants available in skincare. It neutralizes free radicals caused by UV exposure and pollution, preventing premature aging at the cellular level. Vitamin C also inhibits tyrosinase — the enzyme responsible for melanin production — resulting in a brighter, more even skin tone. Additionally, it is a critical cofactor in collagen synthesis, amplifying the collagen-boosting effects of the Retinoid.</p>
            <h3>Key Benefits</h3>
            <p><strong>Peeling and resurfacing:</strong> The Retinoid component promotes gentle exfoliation, smoothing rough texture, reducing acne scarring, and giving the skin a refined, polished appearance.</p>
            <p><strong>Brightening and tone correction:</strong> Vitamin C actively fades existing dark spots, sun damage, and post-inflammatory hyperpigmentation while preventing new discoloration from forming.</p>
            <p><strong>Anti-aging rejuvenation:</strong> The dual collagen-stimulating action of both ingredients works to firm sagging skin, fill in fine lines, and restore a youthful plumpness and elasticity.</p>
            <p><strong>Antioxidant defense:</strong> Daily environmental exposure causes oxidative stress that accelerates aging. The Vitamin C provides a protective shield, neutralizing damage before it can break down collagen and elastin fibers.</p>
            <h3>How to Use</h3>
            <p>Apply a pea-sized amount to clean, dry skin in the evening. If you are new to Retinoids, start by using the C Reti Cream every other night and gradually increase to nightly use as your skin acclimates. Always follow with the Mirage Collagen Night Cream to seal in the active ingredients and minimize any initial dryness. During the day, sunscreen is essential — Retinoids increase photosensitivity, and Vitamin C works best when paired with UV protection.</p>
        `,
        date: 'Feb 08, 2026',
        readTime: '7 min read',
        image: '/images/products/c_reti_cream.png',
        category: 'Mirage Collection'
    },
    {
        id: 9,
        title: 'Mirage Collagen Day Cream: Daytime Hydration and Defense',
        excerpt: 'Marine collagen meets environmental protection in this high-performance daily moisturizer for luminous, resilient skin.',
        content: `
            <p>Your skin faces its greatest environmental challenges during the day — UV radiation, pollution, wind, temperature changes, and blue light from screens. A daytime moisturizer needs to do more than just hydrate; it must actively protect and fortify the skin while creating a smooth, luminous base for the hours ahead. The Mirage Collagen Day Cream was designed with exactly this dual mandate in mind.</p>
            <h3>Marine Collagen: Nature's Structural Support</h3>
            <p>As we age, our natural collagen production declines by roughly 1% per year after the age of 25. This gradual loss is what leads to sagging, thinning skin, and the deepening of lines and wrinkles. The Mirage Collagen Day Cream is infused with marine-derived collagen peptides, which have a smaller molecular weight than bovine or porcine collagen, allowing for superior absorption into the skin.</p>
            <p>These peptides signal your fibroblasts — the cells responsible for producing collagen — to ramp up production. The result is improved skin elasticity, density, and firmness with consistent daily use.</p>
            <h3>Key Benefits</h3>
            <p><strong>Long-lasting hydration:</strong> The formula creates a moisture reservoir within the skin that releases hydration steadily throughout the day, preventing the mid-afternoon dryness that many patients experience.</p>
            <p><strong>Improved elasticity:</strong> Marine collagen peptides support the skin's structural matrix, helping to restore the bounce and resilience associated with youthful skin.</p>
            <p><strong>Environmental defense:</strong> Antioxidant-rich ingredients work alongside the collagen to neutralize free radical damage from UV exposure and urban pollutants before they can degrade your skin's collagen and elastin fibers.</p>
            <p><strong>Luminous finish:</strong> The cream creates a smooth, light-reflective base that gives the skin a healthy, radiant glow — ideal as a primer under makeup or worn on its own for a natural, polished look.</p>
            <h3>How to Use</h3>
            <p>After cleansing with the Mirage Silky Facial Wash or Gentle Wash, apply the Collagen Day Cream to your face and neck using gentle upward strokes. Allow it to absorb for a minute before applying sunscreen. For patients using the C Reti Cream at night, the Day Cream provides the perfect complementary daytime moisture — keeping your skin hydrated and protected while the active ingredients from the previous evening continue their work beneath the surface.</p>
        `,
        date: 'Feb 09, 2026',
        readTime: '5 min read',
        image: '/images/products/collagen_day_cream.png',
        category: 'Mirage Collection'
    },
    {
        id: 10,
        title: 'Mirage Collagen Night Cream: Restorative Repair While You Sleep',
        excerpt: 'This rich nightly balm works with your skin\'s natural repair cycle to firm, plump, and eliminate signs of fatigue by morning.',
        content: `
            <p>The science of skin repair is deeply tied to our circadian rhythm. Between the hours of 11 PM and 4 AM, your skin enters its peak regeneration phase — cell turnover accelerates, blood flow to the skin increases, and the production of growth factors and collagen reaches its highest levels. This is when your skin is most receptive to active ingredients and restorative formulations. The Mirage Collagen Night Cream was specifically designed to harness this nightly window of renewal.</p>
            <h3>Working With Your Skin's Natural Clock</h3>
            <p>During the day, your skin is in defense mode — protecting against UV, pollution, and dehydration. At night, it shifts into repair mode. The Night Cream's rich, lipid-dense formula provides the building blocks your skin needs during this critical phase. It mimics the skin's own natural lipid composition, allowing it to integrate seamlessly with your barrier and deliver active ingredients deep into the dermis where repair happens.</p>
            <h3>Key Benefits</h3>
            <p><strong>Firming and plumping:</strong> Collagen-boosting peptides work overnight to visibly improve skin firmness and density. Patients often notice a plumper, more lifted appearance after just the first few weeks of consistent use.</p>
            <p><strong>Mimics natural lipids:</strong> The cream's lipid profile closely mirrors the ceramides and fatty acids found naturally in the stratum corneum. This means it reinforces the skin barrier rather than sitting on top of it, providing deep nourishment without clogging pores.</p>
            <p><strong>Eliminates signs of fatigue:</strong> Dullness, fine dehydration lines, and sallow tone that develop over the course of the day are addressed overnight. The cream supports microcirculation and cellular energy production, so you wake up with refreshed, rested-looking skin.</p>
            <p><strong>Pairs with active treatments:</strong> The Night Cream is the ideal follow-up to the Mirage C Reti Cream. Applied over the C Reti, it acts as an occlusive seal that enhances ingredient penetration while buffering any potential irritation from the Retinoid — a technique we call the "Sandwich Method" at Miremadi Dermatology.</p>
            <h3>How to Use</h3>
            <p>Apply generously to cleansed skin as the final step in your evening routine. If you are using the C Reti Cream, wait two to three minutes after application, then layer the Night Cream on top. Extend the application to your neck and decolletage — areas that age just as quickly as the face but are often neglected. You will feel the rich, velvety texture melt into your skin, and by morning, the transformation speaks for itself.</p>
        `,
        date: 'Feb 10, 2026',
        readTime: '6 min read',
        image: '/images/products/collagen_night_cream.png',
        category: 'Mirage Collection'
    },
    {
        id: 11,
        title: 'Mirage Collagen Eye Cream: Targeted Care for the Most Delicate Skin',
        excerpt: 'Peptide complexes and collagen work together to visibly reduce dark circles, puffiness, and crow\'s feet around the eyes.',
        content: `
            <p>The skin around the eyes is unlike any other area on the body. It is approximately 0.5mm thick — up to ten times thinner than the skin on the rest of your face. It contains fewer oil glands, less collagen, and less elastin, which is why this area is often the first to show signs of aging, fatigue, and stress. Dark circles, puffiness, fine lines, and crow's feet are among the most common concerns patients bring to my clinic. The Mirage Collagen Eye Cream was formulated to address all of these with clinical precision.</p>
            <h3>Peptide Complexes: Smart Ingredients for Smart Skin</h3>
            <p>Peptides are short chains of amino acids that act as signaling molecules in the skin. The specific peptide complexes in the Mirage Eye Cream communicate with your cells to stimulate collagen and elastin production in the periocular area. Unlike generic moisturizers that simply hydrate the surface, these peptides work at a deeper level to rebuild the structural foundation that supports smooth, firm skin around the eyes.</p>
            <h3>Key Benefits</h3>
            <p><strong>Reduces dark circles:</strong> Dark under-eye circles can be caused by thinning skin that reveals the blood vessels beneath, by hyperpigmentation, or by vascular congestion. The Eye Cream addresses all three mechanisms — strengthening the skin's thickness with collagen support, brightening pigmentation with targeted actives, and improving microcirculation to reduce the bluish-purple discoloration.</p>
            <p><strong>Minimizes puffiness:</strong> Morning puffiness is often caused by fluid retention and impaired lymphatic drainage around the eyes. The cream's formulation includes ingredients that support lymphatic flow and reduce fluid accumulation, resulting in a smoother, more defined contour.</p>
            <p><strong>Softens crow's feet:</strong> The fine lines that radiate from the outer corners of the eyes — known as crow's feet — are among the earliest visible signs of aging. The peptide and collagen combination works to fill in these lines from within, smoothing the skin's surface without the need for injectables.</p>
            <p><strong>Gentle enough for daily use:</strong> The periocular area is highly sensitive and prone to allergic reactions and irritation. This formula was tested and refined to be free of common irritants, making it safe for twice-daily application even on the most sensitive skin.</p>
            <h3>How to Use</h3>
            <p>Using your ring finger — which applies the least pressure — gently dab a small amount of the Eye Cream along the orbital bone, from the inner corner beneath the eye to the outer corner and up toward the brow bone. Avoid applying directly on the eyelid or too close to the lash line. Use morning and evening, after cleansing and before your Day or Night Cream. Consistency is key — the peptide complexes build cumulative results over four to eight weeks of regular use.</p>
        `,
        date: 'Feb 11, 2026',
        readTime: '6 min read',
        image: '/images/products/collagen_eye_cream.png',
        category: 'Mirage Collection'
    }
];

export const Blog = () => {
    const [selectedPost, setSelectedPost] = useState<typeof POSTS[0] | null>(null);

    // Deep-linking: Open modal if post ID is in URL
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('post');
        if (postId) {
            const post = POSTS.find(p => p.id === parseInt(postId));
            if (post) setSelectedPost(post);
        }
    }, []);

    const handleShare = (post: typeof POSTS[0]) => {
        const shareUrl = `${window.location.origin}/blog?post=${post.id}`;

        if (navigator.share) {
            navigator.share({
                title: post.title,
                url: shareUrl,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-bold text-primary uppercase tracking-[0.4em] mb-4 block"
                    >
                        Clinical Insights
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-display font-medium mb-6 dark:text-white"
                    >
                        The <span className="italic font-light text-slate-400">Journal</span>
                    </motion.h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Expert perspectives on dermatology, pathology, and the latest in aesthetic science.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onClick={() => setSelectedPost(post)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] mb-6 bg-slate-100 dark:bg-slate-900 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-2 flex-grow">
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    <span className="text-primary bg-primary/5 px-2 py-1 rounded-md">{post.category}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-display font-medium mb-4 group-hover:text-primary transition-colors leading-tight dark:text-white">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white group-hover:gap-4 transition-all">
                                    Read Article <ChevronRight className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-6 right-6 z-30 p-2 bg-white/20 hover:bg-white/40 dark:bg-slate-800/50 dark:hover:bg-slate-700 text-white md:text-slate-900 dark:md:text-white transition-colors rounded-full backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Hero Image / Left Side */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent flex items-end p-8">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                                            {selectedPost.category}
                                        </span>
                                        <h2 className="text-3xl font-display font-medium text-white leading-tight">
                                            {selectedPost.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Content / Right Side */}
                            <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-12 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                                <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-400 pb-8 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> {selectedPost.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" /> {selectedPost.readTime}
                                    </div>
                                    <button
                                        onClick={() => handleShare(selectedPost)}
                                        className="flex items-center gap-2 hover:text-primary transition-colors ml-auto"
                                    >
                                        <Share2 className="w-3 h-3" /> Share
                                    </button>
                                </div>

                                <div
                                    className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none 
                                    prose-h3:text-xl prose-h3:font-display prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-4
                                    prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-4
                                    prose-strong:text-slate-900 dark:prose-strong:text-white"
                                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                />

                                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white transition-all"
                                    >
                                        Back to Journal
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
