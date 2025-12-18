
import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Dr. Miremadi', href: '#about', id: 'about' },
    { name: 'Mirage Shop', href: '#shop', id: 'shop' },
    { name: 'Locations', href: '#locations', id: 'locations' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] glass px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-12 h-10 overflow-hidden rounded-md">
          {/* Recreated Skin Layer Logo SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full transform group-hover:scale-110 transition-transform">
            <rect width="100" height="25" y="75" fill="#FCA5A5" /> {/* Pink Base */}
            <path d="M10 75 Q 30 40 100 75 L 100 50 Q 30 15 10 50 Z" fill="#FDBA74" /> {/* Peach */}
            <path d="M30 50 Q 50 15 100 50 L 100 25 Q 50 -10 30 25 Z" fill="#92400E" /> {/* Med Brown */}
            <path d="M55 25 Q 75 -10 100 25 L 100 0 Q 75 -35 55 0 Z" fill="#451A03" /> {/* Dark Brown */}
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none tracking-tight uppercase text-slate-900">Miremadi</span>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Dermatology</span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-indigo-600 ${
              activeSection === link.id ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-400'
            }`}
          >
            {link.name}
          </a>
        ))}
        <div className="h-6 w-px bg-slate-200"></div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 shadow-lg active:translate-y-0">
          Book Appointment
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 p-8 flex flex-col gap-6 lg:hidden animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-serif text-slate-900 border-b border-slate-50 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-slate-900 text-white px-5 py-4 rounded-2xl font-bold uppercase tracking-widest w-full">
            Book Appointment
          </button>
          <p className="text-center text-xs text-slate-400 font-medium italic">Hablamos Español</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
