import React from 'react';
import { gsap } from 'gsap';
import Logo from './assets/brand-logo.png'
import HeroIMG from './assets/clean.png'
import HeroIMG2 from './assets/com.jpg'
import HeroIMG3 from './assets/res.jpg'


const HeroSection = () => {
  const images = [HeroIMG, HeroIMG2, HeroIMG3];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined; // don't autoplay
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(id);
  }, [images.length]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleMobile = () => setMobileOpen(v => !v);

  const closeMobile = () => setMobileOpen(false);
 const navRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const menuTlRef = React.useRef(null);
  const masterTlRef = React.useRef(null);
  const burgerLinesRef = React.useRef(null);
  const closeIconRef = React.useRef(null);  
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // click-outside handler
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (!mobileOpen) return;
      const target = e.target;
      if (navRef.current && navRef.current.contains(target)) return; // inside nav (toggle)
      if (menuRef.current && menuRef.current.contains(target)) return; // inside menu
      setMobileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // lock body scroll and handle Escape to close when menu is open
  React.useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    if (mobileOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
    return undefined;
  }, [mobileOpen]);

  // GSAP staggered animation for menu links (slide+fade)
  React.useEffect(() => {
    if (!menuRef.current) return undefined;
    const links = menuRef.current.querySelectorAll('a');
    if (!links || links.length === 0) return undefined;

    if (prefersReduced) {
      // for reduced motion just toggle visibility immediately when mobileOpen changes
      if (mobileOpen) {
        gsap.set(menuRef.current, { autoAlpha: 1 });
        gsap.set(burgerLinesRef.current, { autoAlpha: 0 });
        gsap.set(closeIconRef.current, { autoAlpha: 1 });
        gsap.set(links, { y: 0, autoAlpha: 1 });
      } else {
        gsap.set(menuRef.current, { autoAlpha: 0 });
        gsap.set(burgerLinesRef.current, { autoAlpha: 1 });
        gsap.set(closeIconRef.current, { autoAlpha: 0 });
        gsap.set(links, { y: 20, autoAlpha: 0 });
      }
      return undefined;
    }

    if (!masterTlRef.current) {
      masterTlRef.current = gsap.timeline({ paused: true });
      // icon swap
      masterTlRef.current.to(burgerLinesRef.current, { autoAlpha: 0, duration: 0.18 }, 0);
      masterTlRef.current.to(closeIconRef.current, { autoAlpha: 1, duration: 0.18 }, 0);
  // menu fade in
      masterTlRef.current.fromTo(menuRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 }, 0);
      // links stagger
      masterTlRef.current.fromTo(
        links,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out' },
        0.06
      );
    }

    if (mobileOpen) masterTlRef.current.play(0); else masterTlRef.current.reverse();

    return () => {
      // keep timeline alive for reuse
    };
  }, [mobileOpen, prefersReduced]);

  return (
    <div className="min-h-screen bg-[#FFEBD0] py-0 px-0 md:px-8 lg:px-10">
      {/* Navigation */}
  <nav ref={navRef} className="relative z-50 flex items-center justify-between px-0 py-5 ">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="McKenna's Cleaning Logo"
            className="h-16"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">
              About
            </a>
            <a href="#electrostatic" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">
              Electrostatic Spraying
            </a>
            <a href="#residential" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">
              Residential Cleaning
            </a>
            <a href="#commercial" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">
              Commercial Cleaning
            </a>
            <a href="#window" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">
              Window Cleaning
            </a>
            <a 
              href="#contact" 
              className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg"
            >
              CONTACT
            </a>
          </div>

          {/* mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md bg-transparent text-gray-800"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {/* grouped burger lines */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g ref={burgerLinesRef} style={{ transformOrigin: '14px 14px' }}>
                <rect x="5" y="8" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="5" y="13" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="5" y="18" width="18" height="2" rx="1" fill="currentColor" />
              </g>
              <g ref={closeIconRef} style={{ opacity: 0 }}>
                <path d="M7 7L21 21M7 21L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {/* Mobile menu panel (renders always but toggles classes for slide/opacity) */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 right-0 bg-[#E1D9C6] z-40 transform transition-transform duration-400 ease-out ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ height: 'calc(70vh - 4rem)' }}
        aria-hidden={!mobileOpen}
      >
        <div className="w-full h-full flex flex-col p-6 rounded-b-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div />
            <button onClick={closeMobile} aria-label="Close menu" className="p-2 rounded-md text-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center items-center gap-6 text-center">
            <a onClick={closeMobile} href="#about" className="border-width: 10px; rounded-lg text-gray-800 hover:text-teal-700 transition-colors text-2xl font-medium">About</a>
            <a onClick={closeMobile} href="#electrostatic" className="text-gray-800 hover:text-teal-700 transition-colors text-2xl font-medium">Electrostatic Spraying</a>
            <a onClick={closeMobile} href="#residential" className="text-gray-800 hover:text-teal-700 transition-colors text-2xl font-medium">Residential Cleaning</a>
            <a onClick={closeMobile} href="#commercial" className="text-gray-800 hover:text-teal-700 transition-colors text-2xl font-medium">Commercial Cleaning</a>
            <a onClick={closeMobile} href="#window" className="text-gray-800 hover:text-teal-700 transition-colors text-2xl font-medium">Window Cleaning</a>
          </nav>

          <div className="pb-8 text-center">
            <a onClick={closeMobile} href="#contact" className="bg-teal-700 text-[#EA892C] px-8 py-3 rounded-md hover:bg-teal-800 transition-colors font-bold tracking-wide">CONTACT</a>
          </div>
        </div>
      </div>

      {/* Hero Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-center">
  {/* Left Column - Text Content */}
  <div className="space-y-8 text-left">
          <h1 className="font-bayon text-4xl lg:text-6xl font-medium text-teal-800 leading-tight">
            MCKENNA'S CLEANING
            <br />
            <span className="block mt-2">SERVICES</span>
          </h1>
          
          <p className="font-bayon text-2xl text-orange-500 font-light text-left">
            We are a cleaning buisness<br />
            serving the Medina County area<br />
            prepared to tackle all your cleaning needs.<br /> 
            Give us a call today!
          </p>

          <a 
            href="#contact" 
            className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg"
          >
            CONTACT
          </a>
        </div>

        {/* Right Column - Crossfade Carousel */}
        <div className="relative h-96 lg:h-[30rem] overflow-hidden rounded-lg shadow-2xl">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Hero ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-linear ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;