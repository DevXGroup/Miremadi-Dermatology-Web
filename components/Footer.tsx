
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
                  <path d="M20 80 C 20 20, 80 20, 80 80 L 70 80 C 70 40, 30 40, 30 80 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight uppercase text-slate-900">Miremadi</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Dermatology</span>
              </div>
            </div>
            <p className="text-slate-500 font-light leading-relaxed text-lg max-w-sm">
              Providing meticulous clinical and cosmetic dermatology services in La Jolla and El Centro with over 55 years of medical expertise.
            </p>
            <div className="flex gap-4">
               {['fb', 'ig', 'tw'].map(s => (
                 <a key={s} href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all text-slate-400">
                   <div className="text-xs font-bold uppercase">{s}</div>
                 </a>
               ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">The Practice</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li><a href="#services" className="hover:text-indigo-600 transition-colors">Treatments</a></li>
                <li><a href="#about" className="hover:text-indigo-600 transition-colors">Dr. Miremadi</a></li>
                <li><a href="#shop" className="hover:text-indigo-600 transition-colors">Mirage Products</a></li>
                <li><a href="#locations" className="hover:text-indigo-600 transition-colors">Patient Portal</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Contact La Jolla</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li>7702 Ivanhoe Ave<br/>La Jolla, CA 92037</li>
                <li className="font-bold text-slate-900">(858) 456-1840</li>
                <li className="italic">Hablamos Español</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Contact El Centro</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-light">
                <li>646 W. Main St<br/>El Centro, CA 92243</li>
                <li className="font-bold text-slate-900">(760) 370-3233</li>
                <li className="italic">Hablamos Español</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Arjang K. Miremadi Inc. Over 55 years of meticulous care.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Medical Disclaimer</a>
            <a href="#" className="hover:text-slate-900">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
