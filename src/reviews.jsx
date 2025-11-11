import React, { useState } from 'react';
import { useTestimonials } from './lib/cms/helpers';

// Inline chevron icons to avoid adding an external dependency (fixes build errors when
// 'lucide-react' isn't installed on the deployment environment).
function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TestimonialCarousel() {
  // Fetch CMS testimonials data
  const { data: cmsTestimonials, isLoading, isError } = useTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  // responsive items per view (1 on small, 2 on medium, 3 on large)
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w < 640) return 1; // mobile
    if (w < 1024) return 2; // tablet
    return 3; // desktop
  });

  React.useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      const desired = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setItemsPerView(prev => (prev === desired ? prev : desired));
    }
    // run once to ensure correct value
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const testimonials = cmsTestimonials || [0];

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);
  const itemWidthPercent = 100 / itemsPerView;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFEBD0] via-orange-50 to-[#FFEBD0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bayon text-5xl md:text-6xl font-medium text-center mb-16 text-[#EA892C] tracking-tight">
          WHAT OUR CUSTOMERS
          <br />
          <span className="font-bayon text-[#EA892C]">SAY</span>
        </h1>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials && testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-4"
                  style={{ flex: `0 0 ${itemWidthPercent}%` }}
                >
                  <div className="bg-gradient-to-br from-[#043B62] to-[#17616E] rounded-3xl p-6 sm:p-8 h-64 sm:h-72 md:h-80 lg:h-96 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div>
                      {/* Star rating */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-[#EA892C] text-base sm:text-lg leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#EA892C] text-lg sm:text-xl font-medium">
                        - {testimonial.customerName}
                      </p>
                      {testimonial.role && (
                        <p className="text-teal-200 text-sm mt-1">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full hover:bg-orange-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-8 h-8 text-teal-700" />
            </button>

            <div className="flex gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-teal-700 w-8' 
                      : 'bg-teal-700 opacity-30 hover:opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="p-3 rounded-full hover:bg-orange-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-8 h-8 text-teal-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}