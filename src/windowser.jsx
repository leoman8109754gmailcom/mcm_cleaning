import React, { useState, useEffect } from 'react';
import windowIMG from './assets/window.png';
import cleanIMG from './assets/clean.png';
import commercialIMG from './assets/com.jpg';
import residentialIMG from './assets/res.jpg';

function WindowCleaningPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // responsive visible count: 1 on small screens, 3 on md and up
  const [visibleCount, setVisibleCount] = useState(() => (typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1));

  React.useEffect(() => {
    function onResize() {
      const desired = window.innerWidth >= 768 ? 3 : 1;
      setVisibleCount(prev => (prev === desired ? prev : desired));
    }
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // touch swipe support
  const containerRef = React.useRef(null);
  const startXRef = React.useRef(0);
  const isDragging = React.useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Use local project assets for the carousel
  const images = [
    windowIMG,
    cleanIMG,
    commercialIMG,
    residentialIMG,
    windowIMG,
  ];

  const onTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    isDragging.current = true;
    startXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current || !e.touches || e.touches.length === 0) return;
    const delta = e.touches[0].clientX - startXRef.current;
    setDragOffset(delta);
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    const delta = dragOffset;
    const threshold = 50; // px required to trigger swipe
    if (delta > threshold) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (delta < -threshold) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    isDragging.current = false;
    setDragOffset(0);
  };

  // mouse drag (desktop)
  React.useEffect(() => {
    function onMouseMove(e) {
      if (!isDragging.current) return;
      const delta = e.clientX - startXRef.current;
      setDragOffset(delta);
    }

    function onMouseUp() {
      if (!isDragging.current) return;
      const delta = dragOffset;
      const threshold = 50;
      if (delta > threshold) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (delta < -threshold) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
      isDragging.current = false;
      setDragOffset(0);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragOffset, images.length]);

  // auto-rotate removed - carousel now supports manual navigation and live dragging

  return (
    <section className="w-full min-h-screen bg-[#FFEBD0] relative overflow-hidden">
  {/* Top Section with Title - add extra top padding so fixed nav doesn't overlap */}
  <div className="font-bayon relative pt-24 md:pt-28 pb-8">
        <h1 className="text-3xl md:text-6xl font-bold text-center text-[#2B6B6B] uppercase tracking-wide">
          WINDOW CLEANING
        </h1>
      </div>

      {/* Wavy Divider Top */}
      <div className="relative w-full">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-24 md:h-32"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,0 L0,0 Z" 
            fill="#2B6B6B"
          />
        </svg>
      </div>

      {/* Description Box with wavy background */}
      <div className="font-bayon bg-[#FFEBD0] relative py-16">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#F39237] mb-4">
            Description of the job
          </h2>
          <p className="text-base md:text-xl text-[#F39237] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur<br className="hidden md:block" /> adipiscing elit.
          </p>
        </div>
      </div>

      {/* Wavy Divider Bottom */}
      <div className="relative w-full pb-8">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-24 md:h-32"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60 L1200,120 L0,120 Z" 
            fill="#2B6B6B"
          />
        </svg>
      </div>

      {/* Image Carousel Section */}
      <div className="py-17 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="relative mb-16">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#2B6B6B] text-white p-3 rounded-full hover:bg-[#1A5A5A] transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Images Container */}
            <div
              className="overflow-hidden px-4 md:px-12"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={(e) => { e.preventDefault(); isDragging.current = true; startXRef.current = e.clientX; setDragOffset(0); }}
            >
              <div 
                className="flex gap-6 md:gap-8 transition-transform duration-1000 ease-out"
                style={{ transform: (() => {
                  const cw = containerRef.current ? containerRef.current.clientWidth : 0;

                  if (visibleCount === 1 && containerRef.current) {
                    // Find the slide DOM node for the current image index (uses data-orig-index attr set on slides)
                    const slides = Array.from(containerRef.current.querySelectorAll('[data-orig-index]'));
                    const target = slides.find(el => Number(el.dataset.origIndex) === currentImageIndex);
                    if (target) {
                      const slideLeft = target.offsetLeft; // position relative to container
                      const slideW = target.clientWidth;
                      const centeredOffset = (cw - slideW) / 2;
                      // small correction to counter visual left-shift on some devices (half the gap)
                      const gapPx = visibleCount >= 3 ? 32 : 24;
                      const correction = gapPx / 2;
                      const tx = -slideLeft + centeredOffset + correction + (dragOffset || 0);
                      return `translateX(${tx}px)`;
                    }
                  }

                  const slideW = visibleCount ? cw / visibleCount : 0;
                  const base = currentImageIndex * slideW;
                  const tx = -base + (dragOffset || 0);
                  return `translateX(${tx}px)`;
                })() }}
              >
                {images.concat(images.slice(0, visibleCount - 1)).map((image, index) => {
                  const origIndex = index % images.length;
                  // position of this item relative to currentImageIndex (0..images.length-1)
                  const rel = (origIndex - currentImageIndex + images.length) % images.length;
                  const centerOffset = Math.floor(visibleCount / 2); // 1 when visibleCount=3
                  const isCenter = rel === centerOffset;

                  const itemWidthPercent = visibleCount === 1 ? 90 : 100 / visibleCount;

                  return (
                    <div
                      key={`${image}-${index}`}
                      className={`flex-shrink-0 transition-all duration-700 ${isCenter ? 'z-30' : 'opacity-80'}`}
                      data-orig-index={origIndex}
                      style={{ flex: `0 0 ${itemWidthPercent}%`, overflow: 'visible' }}
                    >
                      {/* Keep a rounded container that clips the image itself, but allow the slide to scale/overflow so the center can overlap neighbors */}
                      <div
                        className="rounded-xl overflow-hidden shadow-xl transition-transform duration-700 ease-out mx-2"
                        style={{
                          transform: `scale(${isCenter ? (visibleCount >= 3 ? 2.1 : 1.25) : 1})`,
                          transitionProperty: 'transform',
                        }}
                      >
                        <img
                          src={image}
                          alt={`Window cleaning ${origIndex + 1}`}
                          className="w-full h-64 md:h-72 object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2B6B6B] text-white p-3 rounded-full hover:bg-[#1A5A5A] transition-colors shadow-lg"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-2 mb-16">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${index === currentImageIndex ? 'bg-[#2B6B6B] w-8' : 'bg-gray-400'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Book Your Cleaning Section */}
          <div className="font-bayon text-center space-y-8 p-8 ">
            <h2 className="text-2xl md:text-5xl font-bold text-[#2B6B6B] uppercase leading-tight">
              BOOK YOUR<br />CLEANING
            </h2>
            <a
              href="#contact"
              className="inline-block bg-[#2B6B6B] text-[#F39237] px-10 md:px-16 py-3 md:py-4 rounded-md text-lg md:text-2xl font-bold hover:bg-[#1A5A5A] transition-colors uppercase tracking-wide shadow-lg"
            >
              HERE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WindowCleaningPage;