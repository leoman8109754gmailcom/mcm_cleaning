import React from 'react';
import { gsap } from 'gsap';
import Logo from './assets/brand-logo.png'
import HeroIMG from './assets/clean.png'
import HeroIMG2 from './assets/com.jpg'
import HeroIMG3 from './assets/res.jpg'
import StaggeredMenu from './components/StaggeredMenu';


const HeroSection = () => {
  const images = [HeroIMG, HeroIMG2, HeroIMG3];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined; // don't autoplay
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(id);
  }, [images.length]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  const toggleMobile = () => setMobileOpen(v => !v);

  const closeMobile = () => setMobileOpen(false);

  // show nav on scroll up, hide on scroll down (but keep visible when mobile menu open)
  React.useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY || window.pageYOffset;
      const isUp = currentY < lastScrollY.current;
      // if mobile menu open, always show nav
      if (mobileOpen) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(isUp || currentY < 10);
      }
      lastScrollY.current = Math.max(0, currentY);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);
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
  <div id="hero" className="min-h-screen lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-3rem)] bg-[#FFEBD0] pt-24 px-4 pb-12 md:pt-28 md:px-8 lg:pb-16 lg:px-10 xl:pb-20">
      {/* Navigation (fixed) */}
  <nav
    ref={navRef}
    className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-5 transition-transform duration-300 bg-transparent ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
  >
        {/* Logo */}
        <div className="flex items-center xl:px-10">
          <a href="#hero" aria-label="Go to top">
            <img
              src={Logo}
              alt="McKenna's Cleaning Logo"
              className="h-16"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 xl:pr-10">
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

          {/* mobile menu is handled by the StaggeredMenu component (visible only on mobile) */}
        </div>
  </nav>

      {/* Mobile menu replaced with StaggeredMenu (mobile-only) */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={[
            { label: 'About', ariaLabel: 'About', link: '#about' },
            { label: 'Electrostatic Spraying', ariaLabel: 'Electrostatic Spraying', link: '#electrostatic' },
            { label: 'Residential Cleaning', ariaLabel: 'Residential Cleaning', link: '#residential' },
            { label: 'Commercial Cleaning', ariaLabel: 'Commercial Cleaning', link: '#commercial' },
            { label: 'Window Cleaning', ariaLabel: 'Window Cleaning', link: '#window' },
            { label: 'CONTACT', ariaLabel: 'Contact', link: '#contact' }
          ]}
          socialItems={[
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'GitHub', link: 'https://github.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl={Logo}
          accentColor="#ff6b6b"
          onMenuOpen={() => setMobileOpen(true)}
          onMenuClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Hero Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-center h-full">
  {/* Left Column - Text Content */}
  <div className="space-y-8 text-left self-start lg:self-center select-none no-select xl:-ml-60">
    <h1 className="font-bayon text-4xl lg:text-7xl xl:text-8xl font-medium text-teal-800 leading-tight">
            MCKENNA'S CLEANING
            <br />
            <span className="block mt-2">SERVICES</span>
          </h1>
          
          <p className="font-bayon text-2xl lg:text-3xl xl:text-4xl text-orange-500 font-light text-left">
            We are a cleaning buisness<br />
            serving the Medina County area<br />
            prepared to tackle all your cleaning needs.<br /> 
            Give us a call today!
          </p>

          <a 
            href="#contact" 
            className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg lg:text-xl xl:text-2xl"
          >
            CONTACT
          </a>
        </div>

        {/* Right Column - Crossfade Carousel */}
  <div className="relative h-96 lg:h-full xl:h-[calc(100vh-8rem)] overflow-hidden rounded-lg shadow-2xl xl:-mr-60">
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