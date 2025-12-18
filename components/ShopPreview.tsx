
import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 'p1',
    name: 'Retinol Recovery Complex',
    price: 85,
    description: 'Physician-grade retinol for night-time rejuvenation.',
    imageUrl: 'https://picsum.photos/id/111/400/400',
  },
  {
    id: 'p2',
    name: 'La Jolla Sun Shield SPF 50',
    price: 45,
    description: 'High-protection mineral sunscreen for sensitive skin.',
    imageUrl: 'https://picsum.photos/id/222/400/400',
  },
  {
    id: 'p3',
    name: 'Hydra-Silk Serum',
    price: 65,
    description: 'Deep hydration using medical-grade hyaluronic acid.',
    imageUrl: 'https://picsum.photos/id/333/400/400',
  },
];

const ShopPreview: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4">
          <h2 className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">Aesthetic Boutique</h2>
          <h3 className="text-4xl font-serif text-slate-900">Curated Skincare</h3>
          <p className="text-slate-500 max-w-lg">
            Dr. Miremadi's hand-selected medical-grade products, designed to maintain clinic results at home.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full font-bold text-xs uppercase animate-pulse">
          E-Commerce Coming Soon
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 mb-6 border border-slate-100">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              <button className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur py-3 rounded-xl font-bold text-slate-900 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                Waitlist Me
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h4>
            <div className="flex justify-between items-center">
              <p className="text-slate-500 text-sm">{product.description}</p>
              <p className="text-indigo-600 font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPreview;
