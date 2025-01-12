import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Work = () => {
  const observerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const tiles = [
    { id: 1, class: 'small-tile small1' },
    { id: 2, class: 'small-tile small2' },
    { id: 3, class: 'small-tile small3' },
    { id: 4, class: 'small-tile small4' },
    { id: 5, class: 'small-tile small5' },
    { id: 6, class: 'small-tile small6' },
    { id: 7, class: 'small-tile small7' },
    { id: 8, class: 'small-tile small8' },
    { id: 9, class: 'large-tile large1' },
    { id: 10, class: 'large-tile large2' },
    { id: 11, class: 'large-tile large3' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              observerRef.current.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach((item) => {
        observerRef.current.observe(item);
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [isMobile]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === tiles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? tiles.length - 1 : prev - 1));
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {isMobile ? (
        <div className="mobile-container">
          <div className="mobile-content w-[328px] h-[246px] mx-auto relative">
            {tiles.map((tile, index) => (
              <div
                key={tile.id}
                className={`mobile-tile absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={currentSlide !== index}
              >
                <div
                  className="mobile-tile-inner w-full h-full flex items-center justify-center text-white"
                  style={{ backgroundColor: `hsl(${index * 36}, 70%, 50%)` }}
                />
              </div>
            ))}
          </div>

          <div className="mobile-controls flex items-center justify-between p-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="gallery-grid">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`gallery-item ${tile.class}`}
              data-number={tile.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Work;