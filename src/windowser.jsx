import React, { useState, useEffect } from 'react';
import { useWindowService } from './lib/cms/helpers';
import windowIMG from './assets/window.png';
import cleanIMG from './assets/clean.png';
import commercialIMG from './assets/com.jpg';
import residentialIMG from './assets/res.jpg';

function WindowCleaningPage() {
  // Fetch CMS data
  const { data: serviceData, isLoading, isError } = useWindowService();

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
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Use CMS gallery images if available, otherwise fallback to local assets
  const fallbackImages = [windowIMG, cleanIMG, commercialIMG, residentialIMG];
  const images = serviceData?.gallery?.length > 0
    ? serviceData.gallery.map(img => img.url).filter(Boolean)
    : fallbackImages;

  // Use CMS carousel interval if available, otherwise fallback to 4000ms
  const carouselInterval = serviceData?.carouselInterval
    ? serviceData.carouselInterval * 1000
    : 4000;

  const onTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    isDragging.current = true;
    setIsDraggingState(true);
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
    setIsDraggingState(false);
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
      setIsDraggingState(false);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragOffset, images.length]);

  // auto-rotate removed - carousel now supports manual navigation and live dragging

  // autoplay for the static carousel (copied from AboutUs)
  React.useEffect(() => {
    if (isPaused) return undefined;
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, carouselInterval);
    return () => clearInterval(id);
  }, [isPaused, images.length, carouselInterval]);

  // Lightbox / Modal for enlarged images with zoom and pan
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const panStartRef = React.useRef({ x: 0, y: 0 });
  const isPanningRef = React.useRef(false);
  const swipeStartRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const lastPinchDistanceRef = React.useRef(null);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const nextLightbox = () => {
    setLightboxIndex((i) => (i + 1) % images.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const prevLightbox = () => {
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(2)));

  // prevent body scroll while lightbox open
  React.useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return undefined;
  }, [lightboxOpen]);

  // keyboard navigation inside lightbox
  React.useEffect(() => {
    if (!lightboxOpen) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === '+') zoomIn();
      if (e.key === '-') zoomOut();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  // panning handlers for lightbox (mouse & touch)
  const onLightboxPointerDown = (clientX, clientY) => {
    isPanningRef.current = true;
    panStartRef.current = { x: clientX - offset.x, y: clientY - offset.y };
  };

  const onLightboxPointerMove = (clientX, clientY) => {
    if (!isPanningRef.current) return;
    const nx = clientX - panStartRef.current.x;
    const ny = clientY - panStartRef.current.y;
    setOffset({ x: nx, y: ny });
  };

  const onLightboxPointerUp = () => {
    isPanningRef.current = false;
  };

  const onOverlayPointerDown = (e) => {
    const touches = e.touches;
    if (touches && touches.length === 2) {
      // start pinch
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      lastPinchDistanceRef.current = Math.hypot(dx, dy);
      // prevent native pinch-zoom
      e.preventDefault?.();
      return;
    }

    const clientX = touches ? touches[0].clientX : e.clientX;
    const clientY = touches ? touches[0].clientY : e.clientY;
    swipeStartRef.current = { x: clientX, y: clientY, t: Date.now() };
    if (zoom > 1) onLightboxPointerDown(clientX, clientY);
  };

  const onOverlayPointerMove = (e) => {
    const touches = e.touches;
    if (touches && touches.length === 2) {
      // pinch handling
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const last = lastPinchDistanceRef.current || dist;
      const ratio = dist / last;
      // apply ratio to zoom, clamp between 1 and 3
      setZoom((z) => {
        const nz = Math.min(3, Math.max(1, +(z * ratio).toFixed(3)));
        return nz;
      });
      lastPinchDistanceRef.current = dist;
      // prevent native pinch-zoom while interacting
      e.preventDefault?.();
      return;
    }

    const clientX = touches ? touches[0].clientX : e.clientX;
    const clientY = touches ? touches[0].clientY : e.clientY;
    if (zoom > 1) onLightboxPointerMove(clientX, clientY);
  };

  const onOverlayPointerUp = (e) => {
    const touches = e.changedTouches || e.touches || null;
    // end pinch
    if (lastPinchDistanceRef.current && (!touches || touches.length < 2)) {
      lastPinchDistanceRef.current = null;
    }

    const start = swipeStartRef.current;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (zoom > 1) {
      onLightboxPointerUp();
    } else if (start) {
      const dx = clientX - start.x;
      if (Math.abs(dx) > 60) {
        if (dx < 0) nextLightbox(); else prevLightbox();
      }
    }
    swipeStartRef.current = null;
  };

  const onOverlayWheel = (e) => {
    // scroll to zoom on desktop inside lightbox
    if (!lightboxOpen) return;
    e.preventDefault();
    const delta = -e.deltaY; // wheel up -> positive
    const factor = 1 + (delta * 0.0015);
    setZoom((z) => Math.min(3, Math.max(1, +(z * factor).toFixed(3))));
  };

  return (
    <section className="w-full min-h-screen bg-[#FFEBD0] relative overflow-hidden">
  {/* Top Section with Title - add extra top padding so fixed nav doesn't overlap */}
  <div className="font-bayon relative pt-24 md:pt-28 pb-8">
        <h1 className=" text-3xl md:text-6xl font-bold text-center text-[#2B6B6B] uppercase tracking-wide">
          {serviceData?.pageTitle || 'Window CLEANING'}
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
          <p className="text-base md:text-xl text-[#F39237] leading-relaxed whitespace-pre-line">
            {serviceData?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
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

      {/* Bottom Image Carousel (copied from AboutUs) */}
      <div className="py-17 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl bg-[#FFEBD0]"
              ref={containerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={(e) => { e.preventDefault(); isDragging.current = true; setIsDraggingState(true); startXRef.current = e.clientX; setDragOffset(0); }}
              style={{ touchAction: 'pan-y', userSelect: 'none' }}
            >
              <div
                className="flex w-full"
                style={{
                  transform: (() => {
                    const container = containerRef.current;
                    const cw = container ? container.clientWidth : 1;
                    const dragPercent = (dragOffset / cw) * 100;
                    const base = currentImageIndex * 100;
                    const translate = -base + dragPercent;
                    return `translateX(${translate}%)`;
                  })(),
                  transition: isDraggingState ? 'none' : 'transform 600ms cubic-bezier(.22,.9,.31,1)'
                }}
              >
                  {images.map((src, idx) => {
                    const altText = serviceData?.gallery?.[idx]?.alt || `Gallery image ${idx + 1}`;
                    return (
                      <div key={idx} className="flex-shrink-0 w-full flex items-center justify-center min-h-[350px] overflow-hidden p-4">
                          <div className="inline-block rounded-xl overflow-hidden">
                            <img
                              src={src}
                              alt={altText}
                              onClick={() => openLightbox(idx)}
                              className="block max-w-full h-[350px] md:h-[420px] object-contain cursor-zoom-in"
                            />
                          </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => { setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 2000); }}
                className="p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => { setCurrentImageIndex((prev) => (prev + 1) % images.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 2000); }}
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

          {/* Book Your Cleaning Section */}
          <div className=" font-bayon text-center space-y-8 p-8 ">
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

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onMouseDown={(e) => { if (e.target === overlayRef.current) closeLightbox(); }}
          onTouchStart={onOverlayPointerDown}
          onTouchMove={onOverlayPointerMove}
          onTouchEnd={onOverlayPointerUp}
        >
          <div className="relative w-full max-w-5xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-50 p-2 rounded bg-white/90 hover:bg-white"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev/Next buttons */}
            <button onClick={prevLightbox} className="absolute left-3 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 rounded-full">‹</button>
            <button onClick={nextLightbox} className="absolute right-3 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 rounded-full">›</button>

            {/* Zoom controls */}
            <div className="absolute left-3 top-3 z-50 flex flex-col gap-2">
              <button onClick={zoomIn} className="p-2 bg-white/90 rounded">+</button>
              <button onClick={zoomOut} className="p-2 bg-white/90 rounded">-</button>
            </div>

            {/* Image viewport */}
            <div
              className="w-full h-[70vh] md:h-[80vh] bg-[#111] rounded-lg overflow-hidden flex items-center justify-center touch-pan-y: none"
              onMouseDown={(e) => { e.preventDefault(); onOverlayPointerDown(e); }}
              onMouseMove={(e) => { onOverlayPointerMove(e); }}
              onMouseUp={(e) => { onOverlayPointerUp(e); }}
              onWheel={onOverlayWheel}
              onDoubleClick={() => { setZoom((z) => (z === 1 ? 2 : 1)); setOffset({ x: 0, y: 0 }); }}
            >
              <img
                src={images[lightboxIndex]}
                alt={serviceData?.gallery?.[lightboxIndex]?.alt || `Lightbox ${lightboxIndex + 1}`}
                draggable={false}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transition: isPanningRef.current ? 'none' : 'transform 200ms',
                  touchAction: 'none',
                  maxWidth: 'none'
                }}
                className="max-h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WindowCleaningPage;