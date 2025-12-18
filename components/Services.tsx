
import React from 'react';

const serviceData = [
  {
    title: 'Medical Services',
    desc: 'Comprehensive adult and pediatric dermatology for general and complex conditions.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    type: 'Medical'
  },
  {
    title: 'Ultherapy',
    desc: 'Non-invasive procedure to tighten, firm, and lift lax skin without surgery.',
    img: 'https://images.unsplash.com/photo-1616391182219-a060c32945b6?auto=format&fit=crop&q=80&w=400',
    type: 'Lifting'
  },
  {
    title: 'ReFirme',
    desc: 'Uses Bipolar radiofrequency for skin tightening and sag reduction, primarily for face and neck.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=400',
    type: 'Tightening'
  },
  {
    title: 'IPL Photofacial',
    desc: 'Intense Pulsed Light breakthrough for age spots and various skin conditions without injury.',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400',
    type: 'Rejuvenation'
  },
  {
    title: 'Venus Freeze',
    desc: 'FDA-approved treatment for cellulite and loose skin using magnetic pulses to stimulate collagen.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
    type: 'Body'
  },
  {
    title: 'Laser Hair Removal',
    desc: 'Fast, permanent reduction with LightSheer™ DUET technology for face and body.',
    img: 'https://images.unsplash.com/photo-1600428791234-1b1b1120021b?auto=format&fit=crop&q=80&w=400',
    type: 'Hair'
  },
  {
    title: 'Collagenizer',
    desc: 'Advanced ionic transport delivering Collagen, Hyaluronic Acid, and Vitamin C deep into skin.',
    img: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=400',
    type: 'Clinical'
  },
  {
    title: 'Restylane',
    desc: 'Dermal fillers for lip enhancement, nasolabial folds, and smoothing facial wrinkles.',
    img: 'https://images.unsplash.com/photo-1519415510236-8557bada8b0a?auto=format&fit=crop&q=80&w=400',
    type: 'Injectables'
  },
  {
    title: 'Botox Cosmetic',
    desc: 'Prescription medicine injected to temporarily improve moderate to severe facial lines.',
    img: 'https://images.unsplash.com/photo-1620331713541-7f1912448896?auto=format&fit=crop&q=80&w=400',
    type: 'Injectables'
  },
  {
    title: 'Chemical Peel',
    desc: 'Exfoliation technique to improve skin appearance on face, neck, or hands.',
    img: 'https://images.unsplash.com/photo-1512290901882-d42436d19f8d?auto=format&fit=crop&q=80&w=400',
    type: 'Peels'
  },
  {
    title: 'Vein Therapy',
    desc: 'Fast disappearnce of noticeable veins through specialized laser and clinical techniques.',
    img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400',
    type: 'Vascular'
  }
];

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em]">Clinical Excellence</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 leading-tight">
            Our Medical & <br/> <span className="italic font-light text-slate-400">Cosmetic Services</span>
          </h2>
        </div>
        <p className="text-slate-500 max-w-sm text-lg font-light leading-relaxed mb-2">
          Hablamos Español. Our boutique practice combines 40 years of pathology and dermatology expertise for precision results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {serviceData.map((service, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 mb-6 transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.2)]">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  {service.type}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 font-light">{service.desc}</p>
            <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
              Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
