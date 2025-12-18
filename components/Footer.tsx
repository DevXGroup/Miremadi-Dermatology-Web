
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="20" y="80" fill="#FCA5A5" /> 
                  <path d="M10 80 Q 30 40 100 80 L 100 55 Q 30 15 10 55 Z" fill="#FDBA74" /> 
                  <path d="M30 55 Q 50 15 100 55 L 100 30 Q 50 -10 30 30 Z" fill="#92400E" /> 
                  <path d="M55 30 Q 75 -10 100 30 L 100 0 Q 75 -35 55 5 Z" fill="#451A03" /> 
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight uppercase text-slate-900">Miremadi</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Dermatology</span>
              </div>
            </div>
            <p className="text-slate-500 font-light leading-relaxed text-lg max-w-sm">
              World-class clinical and cosmetic dermatology. Leading the way with microscopic pathological precision for over 55 years.
            </p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/miremadi___dermatology/?hl=en" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-slate-400">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.583 0-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
               </a>
               <a href="https://www.facebook.com/miremadidermatology/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.2c0-1.035.484-1.6 1.471-1.6h1.174v-3.737c-.799-.107-1.77-.163-2.724-.163-2.707 0-4.921 2.214-4.921 4.921v2.779h-3.351v4h3.351v12h5v-12h3.642l.358-4h-4v-2.2z"/></svg>
               </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">The Practice</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li><a href="#services" className="hover:text-indigo-600 transition-colors">Specialized Services</a></li>
                <li><a href="#about" className="hover:text-indigo-600 transition-colors">Dr. Arjang Miremadi</a></li>
                <li><a href="#shop" className="hover:text-indigo-600 transition-colors">Mirage Skin Care</a></li>
                <li><a href="#locations" className="hover:text-indigo-600 transition-colors">Patient Locations</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">La Jolla Clinic</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li>7702 Ivanhoe Ave<br/>La Jolla, CA 92037</li>
                <li className="font-bold text-slate-900">(858) 456-1840</li>
                <li className="italic text-indigo-500">Bilingual Support Available</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">El Centro Clinic</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li>646 W. Main St<br/>El Centro, CA 92243</li>
                <li className="font-bold text-slate-900">(760) 370-3233</li>
                <li className="italic text-indigo-500">Hablamos Español</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Arjang K. Miremadi Medical Inc. 55+ years of patient dedication.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy & Terms</a>
            <a href="#" className="hover:text-slate-900">Medical Notice</a>
            <a href="#" className="hover:text-slate-900">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
