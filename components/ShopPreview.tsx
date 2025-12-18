
import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 'p1',
    name: 'Retinol Recovery Complex',
    price: 85,
    description: 'Physician-grade retinol for night-time rejuvenation from our Mirage line.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p2',
    name: 'La Jolla Sun Shield SPF 50',
    price: 45,
    description: 'High-protection mineral sunscreen for sensitive skin, formulated for Dr. Miremadi.',
    imageUrl: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p3',
    name: 'Hydra-Silk Serum',
    price: 65,
    description: 'Deep hydration using medical-grade hyaluronic acid from the Mirage collection.',
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400',
  },
];

const ShopPreview: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em]">Mirage Skin Care Line</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 leading-tight">
            Curated by <br/> <span className="italic font-light text-slate-400">Dr. Miremadi</span>
          </h2>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 text-amber-700 rounded-2xl font-bold text-xs uppercase tracking-widest border border-amber-100 animate-pulse">
           E-Commerce Coming Soon
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-8 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors"></div>
              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <button className="w-full bg-white/95 backdrop-blur py-4 rounded-2xl font-bold text-slate-900 shadow-2xl text-xs uppercase tracking-widest border border-slate-100">
                  Notify me on launch
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-serif text-slate-900">{product.name}</h4>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPreview;
