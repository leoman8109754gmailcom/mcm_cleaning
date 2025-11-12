import React from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useAllServices } from './lib/cms/helpers';
import LoadingSpinner from './components/LoadingSpinner';

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const animationDefaults = { duration: 0.6, ease: 'expo' };
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
  };

  // detect touch / mobile devices so we can make the marquee visible by default
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(Boolean(touch));
  }, []);

  const isInternal = typeof link === 'string' && link.startsWith('/');

  const repeatedMarqueeContent = Array.from({ length: 10 }).map((_, idx) => {
    const content = (
      <div key={`c-${idx}`} className="flex items-center gap-4 px-3">
        <span className="text-[#EA892C] uppercase font-normal text-[4vh] leading-[1.2]">{text}</span>
        <div className="w-20 md:w-[200px] h-12 md:h-[7vh] rounded-[10px] overflow-hidden bg-gray-200">
          <img src={image} alt={text} className="w-full h-full object-cover block" />
        </div>
      </div>
    );

    // On touch devices make items tappable; on pointer devices keep them decorative to avoid hover/mouseleave jitter
    if (isTouchDevice) {
      return isInternal ? (
        <Link key={`m-${idx}`} to={link} className="inline-block pointer-events-auto">
          {content}
        </Link>
      ) : (
        <a key={`m-${idx}`} href={link} className="inline-block pointer-events-auto">
          {content}
        </a>
      );
    }

    return (
      <div key={`m-${idx}`} className="inline-block pointer-events-none">
        {content}
      </div>
    );
  });

  return (
    <div className="flex-1 relative overflow-hidden text-center border-t-[0px] border-[#2B5F5F]" ref={itemRef}>
      {typeof link === 'string' && link.startsWith('/') ? (
        <Link
          className="font-bayon flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-[#EA892C] text-[4vh] tracking-wider hover:text-[#060010] focus:text-[#E8D4B8] focus-visible:text-[#060010] transition-colors"
          to={link}
          {...(!isTouchDevice ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } : {})}
        >
          {text}
        </Link>
      ) : (
        <a
          className="font-bayon flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-[#EA892C] text-[4vh] tracking-wider hover:text-[#060010] focus:text-[#E8D4B8] focus-visible:text-[#060010] transition-colors"
          href={link}
          {...(!isTouchDevice ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } : {})}
        >
          {text}
        </a>
      )}
      <div
        className={`absolute top-0 left-0 w-full h-full overflow-hidden ${isTouchDevice ? 'pointer-events-auto translate-y-0' : 'pointer-events-none translate-y-[101%]'} bg-white`}
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div
            className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee"
            ref={marqueeInnerRef}
            onTouchStart={() => {
              try {
                if (marqueeInnerRef.current) marqueeInnerRef.current.style.animationPlayState = 'paused';
              } catch (e) {}
            }}
            onTouchEnd={() => {
              try {
                if (marqueeInnerRef.current) marqueeInnerRef.current.style.animationPlayState = 'running';
              } catch (e) {}
            }}
          >
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const { services: cmsServices, isLoading, isError } = useAllServices();

  // Use CMS data directly
  const services = cmsServices || [];

  return (
    <section className="w-full min-h-screen bg-[#2B6B6B] py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <h2 className="font-bayon text-5xl md:text-6xl font-medium text-center text-[#E8D4B8] mb-16 tracking-wide uppercase">
          MULTIPLE CLEANING SERVICES
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State - still show services with fallback data */}
        {isError && !isLoading && (
          <div className="w-full h-[400px] md:h-[600px] lg:h-[700px]">
            <nav className="flex flex-col h-full m-0 p-0">
              {services.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
            </nav>
          </div>
        )}

        {/* Normal State */}
        {!isLoading && !isError && (
          <div className="w-full h-[400px] md:h-[600px] lg:h-[700px]">
            <nav className="flex flex-col h-full m-0 p-0">
              {services.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesSection;
