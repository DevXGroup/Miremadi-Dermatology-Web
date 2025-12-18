
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2 relative">
        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
          <img 
            src="https://drmiremadi.com/wp-content/uploads/2015/06/Dr-Arjang-Miremadi-Dermatopathologist.jpg" 
            alt="Dr. Miremadi Portrait" 
            className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        {/* Floating badge */}
        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl z-20 border border-slate-50 max-w-[240px]">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">5-Star Rated Specialist</span>
           </div>
           <p className="text-lg font-serif text-slate-900 leading-tight">American Board of Dermatopathology</p>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      </div>

      <div className="lg:w-1/2 space-y-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em]">Expert profile</span>
          </div>
          <h3 className="text-4xl lg:text-6xl font-serif text-slate-900 leading-tight">Arjang K. <br/> <span className="italic font-light text-slate-400">Miremadi, M.D.</span></h3>
          <p className="text-indigo-500 font-bold uppercase tracking-widest text-xs">Veteran Dermatopathologist • 55+ Years Experience</p>
        </div>

        <div className="space-y-6 text-slate-600 text-lg font-light leading-relaxed">
          <p>
            Dr. Arjang Miremadi, MD is a distinguished veteran in dermatopathology with over <strong>55 years of experience</strong> in the medical field. His career is defined by meticulous pathological precision and compassionate clinical excellence.
          </p>
          <p>
            A prestigious graduate of the <strong>George Washington University School of Medicine & Health Sciences (Class of 1968)</strong>, Dr. Miremadi has dedicated over half a century to the mastery of skin science. He is triple-certified and remains affiliated with <strong>El Centro Regional Medical Center</strong>, providing elite care across Southern California.
          </p>
          <p className="italic font-serif text-xl border-l-4 border-slate-100 pl-6 text-slate-500">
            "Skin is the largest organ of the body which needs a meticulous care. My goal is to combine clinical intuition with pathological evidence to provide the absolute best outcome for my patients."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-6">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Education</h5>
            <p className="text-sm text-slate-500 font-light">George Washington University, 1968</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Board Experience</h5>
            <p className="text-sm text-slate-500 font-light">Triple Certified Professional</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Affiliation</h5>
            <p className="text-sm text-slate-500 font-light">El Centro Regional Medical Center</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Location Mastery</h5>
            <p className="text-sm text-slate-500 font-light underline underline-offset-4 decoration-indigo-200 uppercase tracking-tighter">La Jolla & El Centro</p>
          </div>
        </div>

        <button className="bg-slate-900 text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl hover:-translate-y-1">
          View Medical Credentials
        </button>
      </div>
    </div>
  );
};

export default About;
