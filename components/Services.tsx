
import React from 'react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Medical Dermatology',
    description: 'Expert diagnosis and treatment of conditions like acne, psoriasis, and eczema.',
    category: 'Medical',
    imageUrl: 'https://picsum.photos/id/20/400/300',
  },
  {
    id: '2',
    title: 'Mohs Surgery',
    description: 'Specialized surgical treatment for skin cancer with the highest cure rates.',
    category: 'Surgical',
    imageUrl: 'https://picsum.photos/id/21/400/300',
  },
  {
    id: '3',
    title: 'Derm-Pathology',
    description: 'In-house laboratory analysis of skin samples for rapid, accurate results.',
    category: 'Medical',
    imageUrl: 'https://picsum.photos/id/160/400/300',
  },
  {
    id: '4',
    title: 'Cosmetic Injectables',
    description: 'Botox, fillers, and advanced rejuvenation to enhance your natural beauty.',
    category: 'Cosmetic',
    imageUrl: 'https://picsum.photos/id/351/400/300',
  },
];

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">Comprehensive Care</h2>
        <h3 className="text-4xl lg:text-5xl font-serif text-slate-900">Our Specializations</h3>
        <p className="text-slate-500 text-lg">
          We combine decades of pathological insight with the latest dermatological technology to offer unmatched clinical outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="group bg-white border border-slate-100 rounded-3xl p-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="px-4 pb-6 space-y-3">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                {service.category}
              </span>
              <h4 className="text-xl font-semibold text-slate-900">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all pt-2">
                Learn More 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
