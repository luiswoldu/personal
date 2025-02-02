import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Work = () => {
  const observerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const tiles = [
    { id: 1, class: 'small-tile small1', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/260e3c213434705.674655b409657.png' },
    { id: 2, class: 'small-tile small2', image: 'https://i.imgur.com/kR7uP9R.jpeg' },
    { id: 3, class: 'small-tile small3', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/1e480d205313101.66b9054f93adc.jpg' },
    { id: 4, class: 'small-tile small4', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e03117213434705.674655b40ab2d.png' },
    { id: 5, class: 'small-tile small5', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/e71891218263627.679e7cd4ee0cc.jpg' },
    { id: 6, class: 'small-tile small6', image: 'https://i.imgur.com/xCxOyXP.jpeg' },
    { id: 7, class: 'small-tile small7', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ec9c49202323657.6686bc03f0c5d.png' },
    { id: 8, class: 'small-tile small8', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/c7ab1d218261391.679e7210b6cb5.jpg' },
    { id: 9, class: 'large-tile large1', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/5df4a6213434705.674655b409e49.png' },
    { id: 10, class: 'large-tile large2', image: 'https://i.imgur.com/9es4qWJ.jpeg' },
    { id: 11, class: 'large-tile large3', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/597ad3202323657.66842511822b6.png' },
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
                style={{
                  backgroundImage: `url(${tile.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>

          <div className="mobile-controls flex items-center justify-between px-12 py-4">
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
              style={{
                backgroundImage: `url(${tile.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Work;
