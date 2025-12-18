
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2 relative reveal-item">
        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
          <img 
            src="https://drmiremadi.com/wp-content/uploads/2015/06/Dr-Arjang-Miremadi-Dermatopathologist.jpg" 
            alt="Dr. Arjang K. Miremadi" 
            className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-transparent transition-colors"></div>
        </div>
        
        {/* Certification Badges */}
        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-slate-50 max-w-[280px]">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                 <svg viewBox="0 0 113 85" className="w-6 h-6">
                    <rect width="113" height="14" y="71" fill="#FCA5A5" /> 
                    <path d="M6 64 C 20 40 40 60 113 64 L 113 48 C 40 44 20 24 6 48 Z" fill="#FDBA74" /> 
                    <path d="M34 40 C 50 16 70 36 113 40 L 113 24 C 70 20 50 0 34 24 Z" fill="#92400E" /> 
                    <path d="M66 16 C 80 -8 100 12 113 16 L 113 0 C 100 -4 80 -28 66 0 Z" fill="#451A03" /> 
                 </svg>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Board Certified Specialist</span>
           </div>
           <p className="text-base font-serif text-slate-900 leading-tight">Dermatology & Pathology (AP-CP)</p>
           <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-2">Dermatopathologist</p>
        </div>

        {/* Navy Mention */}
        <div className="absolute top-10 -left-10 bg-indigo-900 text-white p-6 rounded-3xl shadow-2xl z-20 max-w-[200px] border border-white/20">
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Service History</p>
           <p className="text-sm font-bold leading-tight uppercase tracking-tighter italic">Retired Captain, United States Navy Medical Corp</p>
        </div>

        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      </div>

      <div className="lg:w-1/2 space-y-10 reveal-item stagger-1">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em]">Physician Profile</span>
          </div>
          <h3 className="text-4xl lg:text-6xl font-serif text-slate-900 leading-tight tracking-tighter">Arjang K. <br/> <span className="italic font-light text-slate-400">Miremadi, M.D.</span></h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200">Board Certified Dermatologist</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200">Board Certified Pathologist (AP-CP)</span>
          </div>
        </div>

        <div className="space-y-6 text-slate-600 text-lg font-light leading-relaxed">
          <p>
            Dr. Arjang K. Miremadi is a board certified <strong>Dermatologist and Pathologist (AP-CP)</strong> and a certified dermatopathalogist whom obtains an active practice as well as a teaching status in both Dermatology and Pathology. 
          </p>
          <p>
            With <strong>over 55 years</strong> of experience in the medical field, he brings patients the finest in skin treatment, correction, and care. Dr. Miremadi serves both adults and children in his La Jolla and El Centro practices. He is the creator of the <strong>Miremadi System</strong>, a rejuvenation technology that literally "peels" away years, wrinkles, and unwanted spots with dramatic results for all skin types.
          </p>
          <p>
            An advocate for prevention, Dr. Miremadi is the <strong>only provider of free skin cancer screening</strong> for the American Cancer Society in San Diego County. He completed his residency in Pathology at the University of Maryland Hospital and his residency in Dermatology at the National Naval Hospital in Bethesda.
          </p>
          <p>
            As a retired <strong>Captain of the United States Navy Medical Corp</strong>, Dr. Miremadi shares his extensive knowledge with Dermatology residents at the Naval Medical Center in San Diego, CA.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Education</h5>
            <p className="text-sm text-slate-500 font-medium">GWU School of Medicine, 1968</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Teaching</h5>
            <p className="text-sm text-slate-500 font-medium">Naval Medical Center, San Diego</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Residency</h5>
            <p className="text-sm text-slate-500 font-medium">Univ. of Maryland / National Naval Hospital</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Public Service</h5>
            <p className="text-sm text-slate-500 font-medium italic">American Cancer Society Provider</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-slate-900 text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1">
            Book Consultation
          </button>
          <div className="flex items-center gap-4 px-6 py-5 rounded-full border border-slate-200">
             <a href="https://www.instagram.com/miremadi___dermatology/?hl=en" target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.583 0-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </a>
             <a href="https://www.facebook.com/miremadidermatology/" target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.2c0-1.035.484-1.6 1.471-1.6h1.174v-3.737c-.799-.107-1.77-.163-2.724-.163-2.707 0-4.921 2.214-4.921 4.921v2.779h-3.351v4h3.351v12h5v-12h3.642l.358-4h-4v-2.2z"/></svg>
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
