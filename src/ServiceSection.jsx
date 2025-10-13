import React from 'react';
import { gsap } from 'gsap';
import windowImg from './assets/window.png';

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const animationDefaults = { duration: 0.6, ease: 'expo' };

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

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx} className="bg-[#FFEBD0]">
      <span className="text-[#EA892C] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">{text}</span>
      <div
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div className="flex-1 relative overflow-hidden text-center border-t border-[#FFEBD0] " ref={itemRef}>
      <a
        className="font-bayon flex items-center justify-center h-full relative cursor-pointer uppercase no-underline text-[#EA892C] text-[4vh] tracking-wider hover:text-[#060010] focus:text-[#E8D4B8] focus-visible:text-[#060010] transition-colors"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    {
      link: '#windows',
      text: 'WINDOWS.',
      image: windowImg,
    },
    {
      link: '#commercial',
      text: 'COMMERCIAL.',
      image: windowImg, // placeholder until you add a commercial image
    },
    {
      link: '#residential',
      text: 'RESIDENTIAL.',
      image: windowImg, // placeholder until you add a residential image
    },
    {
      link: '#electrostatic',
      text: 'ELECTROSTATIC.',
      image: windowImg, // placeholder until you add an electrostatic image
    }
  ];

  return (
    <section className="w-full min-h-screen bg-[#17616E] py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <h2 className=" font-bayon text-5xl md:text-6xl font-bold text-center text-[#E8D4B8] mb-16 tracking-wide uppercase">
          MULTIPLE CLEANING SERVICES
        </h2>

        {/* Flowing Menu */}
        <div className="w-full h-[600px] md:h-[700px]">
          <nav className="flex flex-col h-full m-0 p-0">
            {services.map((item, idx) => (
              <MenuItem key={idx} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
