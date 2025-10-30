import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from './TopNav';
// GSAP is not used here anymore (menu animation moved to TopNav/StaggeredMenu)
import Logo from './assets/brand-logo.png'
import HeroIMG from './assets/clean.png'
import HeroIMG2 from './assets/com.jpg'
import HeroIMG3 from './assets/res.jpg'
// StaggeredMenu is provided by TopNav; remove local duplicate


const HeroSection = () => {
  const images = [HeroIMG, HeroIMG2, HeroIMG3];
  const [active, setActive] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined; // don't autoplay
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(id);
  }, [images.length]);

  // Mark mounted so we can avoid animating the initial paint.
  React.useEffect(() => {
    // setMounted on next tick so initial render shows the active image without transition
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  return (
  <div id="hero" className="min-h-screen bg-[#FFEBD0] pt-24 px-4 pb-12 md:pt-28 md:px-8 lg:pb-16 lg:px-10 xl:pb-20">
      <TopNav />

      {/* Mobile menu is provided by `TopNav`; avoid rendering a duplicate here */}

      {/* Hero Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 max-w-7xl mx-auto items-center h-full">
  {/* Left Column - Text Content */}
  <div className="space-y-6 text-left self-center select-none no-select max-w-xl lg:pr-8 xl:pr-16">
    <h1 className="font-bayon text-[clamp(2rem,6.5vw,5.5rem)] font-medium text-teal-800 leading-tight">
            MCKENNA'S CLEANING
            <br />
            <span className="block mt-2">SERVICES</span>
          </h1>
        <div className="space-y-6 bg-[#17616E] rounded-lg shadow-lg p-4">
          <p className="font-bayon text-[clamp(1rem,2.5vw,1.5rem)] text-orange-500 font-light text-left">
            We are a cleaning buisness<br />
            serving the Medina County area<br />
            prepared to tackle all your cleaning needs.<br /> 
          </p>

          <p className="font-bayon text-[clamp(1rem,2.5vw,1.5rem)] text-orange-500 font-light text-left">
            Check out our multiple services down below
          </p>
        
          <a 
            href="#contact" 
            className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 sm:px-5 sm:py-2 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg sm:text-xl"
          >
            CONTACT
          </a>
        </div>
        </div>

        {/* Right Column - Crossfade Carousel */}
  <div className="relative w-full overflow-hidden rounded-lg shadow-2xl h-64 sm:h-80 md:h-96 lg:h-[60vh] xl:h-[70vh] lg:pl-8 xl:pl-16 lg:border-l lg:border-white/10">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Hero ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center ${i === active ? 'opacity-100' : 'opacity-0'} ${mounted ? 'transition-opacity duration-1000 ease-linear' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;