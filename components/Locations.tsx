
import React from 'react';

const Locations: React.FC = () => {
  return (
    <div id="locations" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/10 -skew-x-12 transform translate-x-1/4"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-indigo-400 font-bold uppercase tracking-[0.4em] text-[10px]">Office Locations</span>
          <h2 className="text-4xl lg:text-6xl font-serif">Visit Our Clinics</h2>
          <p className="text-slate-400 font-light">Two convenient Southern California locations to serve your skin care needs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* La Jolla Office */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[3rem] hover:border-indigo-500/50 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-serif mb-2">La Jolla Office</h3>
                <p className="text-indigo-400 font-medium tracking-wide">Main Practice</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Address</div>
                <div className="text-slate-200">7702-4 Ivanhoe Ave,<br/>La Jolla, CA 92037</div>
              </div>
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Phone</div>
                <div className="text-slate-200">(858) 456-1840</div>
              </div>
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Schedule</div>
                <div className="text-slate-200 space-y-1">
                  <p>Mon, Wed, Fri: <span className="text-indigo-300 font-bold">9:00 AM - 5:00 PM</span></p>
                  <p>Every Other Thu: <span className="text-indigo-300 font-bold">9:00 AM - 5:00 PM</span></p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-3">
              Get Directions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          {/* El Centro Office */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[3rem] hover:border-indigo-500/50 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-serif mb-2">El Centro Office</h3>
                <p className="text-indigo-400 font-medium tracking-wide">Regional Clinic</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Address</div>
                <div className="text-slate-200">646 W. Main St,<br/>El Centro, CA 92243</div>
              </div>
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Phone</div>
                <div className="text-slate-200">(760) 370-3233</div>
              </div>
              <div className="flex gap-4">
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest w-24">Schedule</div>
                <div className="text-slate-200 space-y-1">
                  <p>Tuesday: <span className="text-indigo-300 font-bold">9:00 AM - 5:00 PM</span></p>
                  <p>Every Other Thu: <span className="text-indigo-300 font-bold">9:00 AM - 5:00 PM</span></p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center gap-3">
              Get Directions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-slate-500 font-serif italic text-xl">"Hablamous Español at both locations"</p>
        </div>
      </div>
    </div>
  );
};

export default Locations;
