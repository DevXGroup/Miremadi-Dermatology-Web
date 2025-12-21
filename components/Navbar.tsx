
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
    <nav className="fixed top-0 left-0 right-0 z-[70] glass px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="relative w-14 h-10 transition-transform group-hover:scale-105">
          {/* Logo Recreation based on user's specific skin layer image proportions */}
          <svg viewBox="0 0 113 85" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Bottom Layer: Pink */}
            <rect width="113" height="14" y="71" className="fill-m-pink-200" />
            {/* Layer 2: Light Pink/Peach */}
            <path d="M6 64 C 20 40 40 60 113 64 L 113 48 C 40 44 20 24 6 48 Z" className="fill-m-pink-300" />
            {/* Layer 3: Turquoise */}
            <path d="M34 40 C 50 16 70 36 113 40 L 113 24 C 70 20 50 0 34 24 Z" className="fill-m-blue-DEFAULT" />
            {/* Top Layer: Dark Turquoise */}
            <path d="M66 16 C 80 -8 100 12 113 16 L 113 0 C 100 -4 80 -28 66 0 Z" className="fill-m-blue-dark" />
          </svg>
        </div>
        <div className="flex flex-col border-l border-slate-200 pl-4">
          <span className="font-bold text-lg leading-none tracking-tighter uppercase text-slate-900">Miremadi</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Dermatology</span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-m-blue-dark relative py-1 ${activeSection === link.id ? 'text-m-blue-dark' : 'text-slate-500'
              }`}
          >
            {link.name}
            {activeSection === link.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-m-blue-DEFAULT"></span>
            )}
          </a>
        ))}
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/miremadi___dermatology/?hl=en" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-m-pink-300 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.583 0-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://www.facebook.com/miremadidermatology/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-m-blue-DEFAULT transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.2c0-1.035.484-1.6 1.471-1.6h1.174v-3.737c-.799-.107-1.77-.163-2.724-.163-2.707 0-4.921 2.214-4.921 4.921v2.779h-3.351v4h3.351v12h5v-12h3.642l.358-4h-4v-2.2z" /></svg>
          </a>
        </div>
        <button className="bg-m-blue-dark text-white px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-m-pink-300 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-m-blue-100 active:translate-y-0 ml-4">
          Appointment
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
        <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-slate-100 p-10 flex flex-col gap-8 lg:hidden animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-serif text-slate-900 border-b border-slate-50 pb-3"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex justify-between items-center py-4">
            <div className="flex gap-6">
              <a href="https://www.instagram.com/miremadi___dermatology/?hl=en" className="text-slate-400">Instagram</a>
              <a href="https://www.facebook.com/miremadidermatology/" className="text-slate-400">Facebook</a>
            </div>
            <p className="text-xs text-m-blue-dark font-bold">Hablamos Español</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
