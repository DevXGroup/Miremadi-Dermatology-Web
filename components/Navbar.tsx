
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
    { name: 'Shop', href: '#shop', id: 'shop' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
        <span className="font-semibold text-lg tracking-tight uppercase">Miremadi <span className="text-slate-500 font-light">Dermatology</span></span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              activeSection === link.id ? 'text-indigo-600' : 'text-slate-600'
            }`}
          >
            {link.name}
          </a>
        ))}
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95">
          Book Appointment
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-medium w-full">
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
