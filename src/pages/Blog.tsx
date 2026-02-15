import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, ChevronRight, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const POSTS = [
    // ... (rest of the constants remain unchanged)
    {
        id: 1,
        title: 'The Science of Hydration',
        excerpt: 'Understanding how moisture retention works at a cellular level is key to glowing skin.',
        content: `
            <p>Hydration is the foundation of healthy, resilient skin. While we often think and speak of hydration in terms of drinking water, the science of dermal hydration involves a complex interplay between water intake, the skin barrier, and hygroscopic molecules like Hyaluronic Acid.</p>
            <h3>The Role of the Skin Barrier</h3>
            <p>The stratum corneum, our outermost skin layer, acts as a critical seal. When this barrier is compromised by harsh cleansers or environmental stressors, we experience Trans-Epidermal Water Loss (TEWL). This leads to the tightness and flaking we associate with dehydration.</p>
            <h3>Humectants vs. Occlusives</h3>
            <p>In the Miremadi System, we emphasize the two-step approach: 
            1. <strong>Humectants:</strong> Molecules like Hyaluronic Acid and Glycerin that draw water into the skin.
            2. <strong>Occlusives:</strong> Ceramides and oils that seal that moisture in.</p>
            <p>Understanding your skin type is essential for choosing the right balance between these two components.</p>
        `,
        date: 'Oct 12, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        category: 'Science'
    },
    {
        id: 2,
        title: 'Autumn Skincare Routine',
        excerpt: 'As the seasons change, so should your routine. Here are our top tips for the cooler months.',
        content: `
            <p>As the air turns crisp and humidity levels drop, your skin's needs transform. The transitions of autumn are the perfect time to audit your skincare cabinet.</p>
            <h3>Swap to Creamier Cleansers</h3>
            <p>During summer, foaming cleansers help manage increased oil and sweat. However, in autumn, these can be too stripping. Switching to a milk or cream-based cleanser helps preserve your natural lipid barrier.</p>
            <h3>Introduce Gentle Retinoids</h3>
            <p>Post-summer is the "Golden Season" for corrective treatments. Since UV exposure is lower, it's safer to introduce Vitamin A derivatives to repair summer sun damage.</p>
            <h3>Focus on Barrier Repair</h3>
            <p>Incorporate products rich in Niacinamide and fatty acids to fortify the skin against the upcoming winter wind.</p>
        `,
        date: 'Nov 03, 2023',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
        category: 'Lifestyle'
    },
    {
        id: 3,
        title: 'Understanding Retinoids',
        excerpt: 'Everything you need to know about the gold standard of anti-aging ingredients.',
        content: `
            <p>Retinoids are arguably the most studied and proven ingredients in dermatology. Often referred to as the "Gold Standard," they offer benefits ranging from acne reduction to significant anti-aging effects.</p>
            <h3>How Ret.   ojsidhsuiahdiuashidinoids Work</h3>
            <p>Retinoids work by communicating with skin cells to increase turnover and stimulate collagen production. This process helps to thicken the deeper layers of the skin while smoothing the surface texture.</p>
            <h3>The Transition Period</h3>
            <p>Known as "retinization," the first few weeks of use can involve redness and peeling. At Miremadi Dermatology, we recommend the "Sandwich Method" to minimize irritation while maintaining efficacy.</p>
            <h3>Choosing the Right Strength</h3>
            <p>From over-the-counter Retinol to prescription-strength Tretinoin, the right choice depends on your skin's sensitivity and your specific goals. Consultation with a specialist is key to avoiding unnecessary inflammation.</p>
        `,
        date: 'Dec 15, 2023',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
        category: 'Education'
    },
    {
        id: 4,
        title: 'Melanoma Prevention: Caring for Your Skin',
        excerpt: 'Learn essential dermatology-backed strategies to protect your skin and reduce your risk of melanoma.',
        content: `
            <p>Melanoma is the most serious form of skin cancer, but it is also one of the most preventable. At Miremadi Dermatology, we believe that proactive skin care and regular monitoring are the cornerstones of melanoma prevention.</p>
            <h3>Understanding Melanoma</h3>
            <p>Melanoma develops in the melanocytes, the cells responsible for producing pigment in our skin. While it accounts for only about 1% of skin cancers, it causes the majority of skin cancer deaths. Early detection dramatically improves outcomes, with a 5-year survival rate exceeding 99% when caught in its earliest stages.</p>
            <h3>The ABCDEs of Mole Monitoring</h3>
            <p>Regularly examining your skin is one of the most effective prevention tools. Look for the warning signs known as the ABCDEs:</p>
            <p><strong>A — Asymmetry:</strong> One half of the mole does not match the other.<br/>
            <strong>B — Border:</strong> Irregular, ragged, or blurred edges.<br/>
            <strong>C — Color:</strong> Uneven shades of brown, black, tan, red, white, or blue.<br/>
            <strong>D — Diameter:</strong> Larger than 6mm (the size of a pencil eraser), though melanomas can be smaller.<br/>
            <strong>E — Evolving:</strong> Any change in size, shape, color, or symptoms like itching or bleeding.</p>
            <h3>Daily Sun Protection</h3>
            <p>UV radiation is the leading modifiable risk factor for melanoma. Incorporate these habits into your daily routine:</p>
            <p>1. <strong>Broad-spectrum sunscreen:</strong> Apply SPF 30 or higher every morning, and reapply every two hours when outdoors.<br/>
            2. <strong>Protective clothing:</strong> Wear wide-brimmed hats, UV-blocking sunglasses, and long sleeves when possible.<br/>
            3. <strong>Seek shade:</strong> Avoid direct sun exposure between 10 AM and 4 PM when UV rays are strongest.<br/>
            4. <strong>Avoid tanning beds:</strong> Indoor tanning increases melanoma risk by up to 75%, especially when used before age 35.</p>
            <h3>The Role of Annual Skin Exams</h3>
            <p>Self-exams are essential, but they are not a substitute for professional evaluation. A board-certified dermatologist can identify suspicious lesions that may be invisible to the untrained eye, using tools like dermoscopy for magnified analysis. At Miremadi Dermatology, we recommend annual full-body skin exams for all patients, and more frequent checks for those with a personal or family history of skin cancer.</p>
            <h3>Lifestyle Factors That Support Skin Health</h3>
            <p>Beyond sun protection, a holistic approach to skin health can further reduce risk. Antioxidant-rich foods such as berries, leafy greens, and fish high in omega-3 fatty acids help combat oxidative stress. Avoiding smoking and managing chronic inflammation also contribute to healthier skin over time.</p>
            <p>Prevention starts with awareness. If you notice any changes in your skin, schedule a consultation promptly. Early intervention is always the best medicine.</p>
        `,
        date: 'Feb 14, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?auto=format&fit=crop&q=80&w=800',
        category: 'Prevention'
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
