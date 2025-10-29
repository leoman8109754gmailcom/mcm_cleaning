import React, { useState } from 'react';
import windowIMG from './assets/window.png';
import cleanIMG from './assets/clean.png';
import commercialIMG from './assets/com.jpg';
import residentialIMG from './assets/res.jpg';
import staticIMG from './assets/static.jpg';

function AboutUsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images - replace with your actual images
  const images = [
    windowIMG,
    cleanIMG,
    commercialIMG,
    residentialIMG,
    windowIMG,
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const [isPaused, setIsPaused] = useState(false);

  // autoplay when not paused
  React.useEffect(() => {
    if (isPaused) return undefined;
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, images.length]);

  return (
    // add extra top padding to account for the fixed nav and reduce overlap
    <section className="w-full min-h-screen bg-[#FFEBD0] pt-28 md:pt-32 pb-12 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <h1 className="font-bayon text-5xl md:text-6xl font-bold text-[#2B6B6B] mb-12 scroll-mt-28">
          ABOUT US.
        </h1>

        {/* Main Image */}
          <div className="bg-[#D1D1D1] rounded-3xl mb-8 overflow-hidden min-h-[300px]">
            <img
              src={staticIMG}
              alt="About McKenna's Cleaning"
              className="w-full h-[300px] md:h-[420px] object-cover block"
            />
          </div>

        {/* Company Description - left box + right text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-start pt-4 pb-14">
          {/* Left boxed paragraph */}
            <div className="md:col-span-2 text-2xl md:text-3xl text-[#2B6B6B] leading-relaxed font-bayon">
            <p className="text-2xl md:text-3xl font-bold leading-relaxed">
              McKenna's Cleaning is a company with the clear purpose of leaving your windows, houses, and offices SPOTLESS.
            </p>
          </div>

          {/* Right paragraph (aligned right on desktop) */}
            <div className="md:col-span-1 flex items-center">
            <p className="text-xl md:text-xl text-[#2B6B6B] font-extralight leading-relaxed font-bayon">
              With years of experience that guarantees we can offer you the best service.
            </p>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* What We Do Column */}
          <div>
            <h2 className="font-bayon text-3xl md:text-4xl font-bold text-[#2B6B6B] mb-6">
              What We Do?
            </h2>
            <p className="font-bayon text-lg md:text-xl text-[#F39237] leading-relaxed">
              We are a cleaning company established in _____ prepared to tackle your cleaning needs
            </p>
          </div>

          {/* Our Services Column */}
          <div className="font-bayon">
            <h2 className="font-bayon text-3xl md:text-4xl font-bold text-[#2B6B6B] mb-6">
              Our Services?
            </h2>
            <p className="text-lg md:text-xl text-[#F39237] leading-relaxed">
              We offer Resdential, Commercial, and Window Cleaning plus Electrostatic Disinfectant Spraying
            </p>
          </div>

        </div>

        {/* Bottom Image Carousel - sliding with autoplay & indicators */}
        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl bg-[#D1D1D1]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex w-full"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
                transition: 'transform 600ms cubic-bezier(.22,.9,.31,1)'
              }}
            >
              {images.map((src, idx) => (
                <div key={idx} className="flex-shrink-0 w-full flex items-center justify-center min-h-[350px] overflow-hidden">
                  <img
                    src={src}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-[350px] md:h-[420px] object-cover block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => { prevImage(); setIsPaused(true); setTimeout(() => setIsPaused(false), 2000); }}
              className="p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => { nextImage(); setIsPaused(true); setTimeout(() => setIsPaused(false), 2000); }}
              className="p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${i === currentImageIndex ? 'bg-[#17616E] w-8' : 'bg-white/60'}`}
              />
            ))}
          </div>

        </div>

  </div>
    </section>
  );
}

export default AboutUsPage;