
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ShopPreview from './components/ShopPreview';
import Locations from './components/Locations';
import SkinAssistant from './components/SkinAssistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 700) setActiveSection('home');
      else if (scrollPos < 1800) setActiveSection('services');
      else if (scrollPos < 2600) setActiveSection('about');
      else if (scrollPos < 3400) setActiveSection('shop');
      else setActiveSection('locations');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900 bg-[#fafafa]">
      <Navbar activeSection={activeSection} />
      
      <main>
        <section id="home" className="relative">
          <Hero />
        </section>

        <section id="services" className="py-32 bg-white">
          <Services />
        </section>

        <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
          <About />
        </section>

        <section id="shop" className="py-32 bg-white">
          <ShopPreview />
        </section>

        <section id="locations">
          <Locations />
        </section>
      </main>

      <SkinAssistant />
      <Footer />
    </div>
  );
};

export default App;
