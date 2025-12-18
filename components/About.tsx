
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2 relative">
        <div className="absolute -inset-4 bg-indigo-600 rounded-2xl transform rotate-3 -z-10 opacity-10"></div>
        <img 
          src="https://picsum.photos/id/64/800/1000" 
          alt="Dr. Miremadi Portrait" 
          className="rounded-2xl shadow-2xl w-full"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg">
          <p className="text-slate-900 font-bold text-sm">Board Certified</p>
          <p className="text-slate-500 text-xs">American Board of Dermatology</p>
        </div>
      </div>

      <div className="lg:w-1/2 space-y-8">
        <div className="space-y-4">
          <h2 className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">Meet the Doctor</h2>
          <h3 className="text-4xl lg:text-5xl font-serif text-slate-900">Dr. Miremadi, MD</h3>
          <p className="text-indigo-500 font-medium italic">Veteran Dermatologist & Pathologist</p>
        </div>

        <p className="text-slate-600 leading-relaxed text-lg">
          For over four decades, Dr. Miremadi has been a fixture of the La Jolla medical community. His dual expertise in clinical dermatology and laboratory pathology allows him to provide a depth of insight rarely found in modern practices.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Academic Excellence</h5>
              <p className="text-slate-500 text-sm">Former clinical professor and regular contributor to dermatological journals.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-1.311 1.413 9.035 9.035 0 01-5.186 0 2 2 0 01-1.311-1.413l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-2.261 2.26a2 2 0 01-2.829 0l-1.414-1.414a2 2 0 010-2.828l2.26-2.26a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96L2.903 9.17a2 2 0 01-1.413-1.311 9.035 9.035 0 010-5.186 2 2 0 011.413-1.311l2.903-.727a2 2 0 001.414-1.96l.477-2.387a2 2 0 001.022-.547l2.261-2.261a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-2.26 2.26a2 2 0 00-.547 1.022l-.477 2.387a2 2 0 001.414 1.96l2.903.727a2 2 0 011.413 1.311 9.035 9.035 0 010 5.186 2 2 0 01-1.413 1.311l-2.903.727a2 2 0 00-1.414 1.96l-.477 2.387a2 2 0 00-1.022.547l-2.26 2.26a2 2 0 01-2.829 0l-1.414-1.414a2 2 0 010-2.828l2.26-2.26a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96l-2.903-.727a2 2 0 01-1.413-1.311 9.035 9.035 0 010-5.186 2 2 0 011.413-1.311l2.903.727a2 2 0 001.414 1.96l.477 2.387z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Modern Technology</h5>
              <p className="text-slate-500 text-sm">Investing in cutting-edge laser and diagnostic tools for the best results.</p>
            </div>
          </div>
        </div>

        <button className="bg-slate-100 text-slate-800 px-8 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
          View Full Credentials
        </button>
      </div>
    </div>
  );
};

export default About;
