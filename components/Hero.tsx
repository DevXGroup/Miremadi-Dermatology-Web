
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-white">
      {/* Background patterns inspired by skin layers */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-m-blue-DEFAULT"></div>
            <span className="text-sm font-bold text-m-blue-dark uppercase tracking-[0.3em]">55+ Years of Medical Leadership • La Jolla</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-serif text-slate-800 leading-[1.1] tracking-tight">
            Meticulous <span className="italic font-light text-m-pink-300">Care</span> <br />
            for Your Skin.
          </h1>

          <div className="max-w-xl">
            <blockquote className="text-2xl lg:text-3xl font-serif italic text-slate-600 leading-snug border-l-4 border-m-pink-200 pl-6 mb-8">
              "Skin is the largest organ of the body which needs a meticulous care"
              <footer className="text-sm font-bold uppercase tracking-widest text-slate-400 mt-4">— Arjang K. Miremadi, M.D.</footer>
            </blockquote>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-m-blue-dark text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-m-pink-300 transition-all shadow-2xl hover:shadow-m-pink-100 transform hover:-translate-y-1">
              Start Your Beauty Journey
            </button>
            <a href="#services" className="inline-flex items-center gap-3 px-8 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
              Explore Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-10 pt-8">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">5 Star Patient Rating</p>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted globally for over 55 years</p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white group">
            {/* Provided Portrait Image */}
            <img
              src="https://drmiremadi.com/wp-content/uploads/2015/06/Dr-Arjang-Miremadi-Dermatopathologist.jpg"
              alt="Dr. Arjang K. Miremadi"
              className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-medium text-sm">Triple-certified specialist in Dermatology & Pathology.</p>
            </div>
          </div>

          {/* Accent decoration */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-m-pink-100 rounded-full -z-10 blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-m-blue-50 rounded-full -z-10 blur-3xl"></div>

          {/* Floating badge */}
          <div className="absolute bottom-10 -right-8 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-50 max-w-[180px] animate-bounce-slow">
            <div className="w-10 h-10 bg-m-pink-50 rounded-xl flex items-center justify-center mb-3">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <rect width="100" height="25" y="75" className="fill-m-pink-200" />
                <path d="M10 75 Q 30 40 100 75 L 100 50 Q 30 15 10 50 Z" className="fill-m-pink-300" />
                <path d="M30 50 Q 50 15 100 50 L 100 25 Q 50 -10 30 25 Z" className="fill-m-blue-DEFAULT" />
                <path d="M55 25 Q 75 -10 100 25 L 100 0 Q 75 -35 55 0 Z" className="fill-m-blue-dark" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dermatopathology</p>
            <p className="text-sm font-bold text-slate-900 leading-tight">55+ Years of Mastery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
