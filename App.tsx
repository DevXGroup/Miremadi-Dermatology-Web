
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ShopPreview from './components/ShopPreview';
import SkinAssistant from './components/SkinAssistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 500) setActiveSection('home');
      else if (scrollPos < 1200) setActiveSection('services');
      else if (scrollPos < 2000) setActiveSection('about');
      else if (scrollPos < 2800) setActiveSection('shop');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar activeSection={activeSection} />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="py-24 bg-white">
          <Services />
        </section>

        <section id="about" className="py-24 bg-slate-50">
          <About />
        </section>

        <section id="shop" className="py-24 bg-white">
          <ShopPreview />
        </section>
      </main>

      <SkinAssistant />
      <Footer />
    </div>
  );
};

export default App;
