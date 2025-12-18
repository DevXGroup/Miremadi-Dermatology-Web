
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#fafafa]">
      {/* Abstract Background Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            Established 1984 • La Jolla, CA
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1]">
            Experience the <span className="italic">Science</span> of Beautiful Skin.
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            With over 40 years of expertise in dermatology and pathology, Dr. Miremadi provides world-class skin care using state-of-the-art technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
              Schedule Consultation
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-50 transition-all">
              Our Services
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
            <div>
              <p className="text-2xl font-bold text-slate-900">40+</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Years Practice</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">10k+</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Happy Patients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">4.9/5</p>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Client Rating</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in delay-200">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white">
            <img 
              src="https://picsum.photos/id/445/800/1000" 
              alt="Medical Clinic Interior" 
              className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px] hidden lg:block border border-slate-50">
            <p className="text-indigo-600 font-bold mb-1 italic">"Precision in every diagnosis."</p>
            <p className="text-slate-500 text-xs">Dr. Miremadi is one of few specialists triple-certified in Dermatology & Pathology.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
