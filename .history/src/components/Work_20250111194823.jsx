import React, { useEffect, useState } from 'react';

const Work = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tiles = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    class: i < 8 ? 'small-tile' : 'large-tile'
  }));

  return (
    <div className="relative bg-white">
      {isMobile ? (
        <div className="mobile-container">
          <div className="mobile-content">
            {tiles.map((tile, index) => (
              <div
                key={tile.id}
                className={`mobile-tile ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          
          {/* Simple dots for navigation */}
          <div className="mobile-controls">
            {tiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="gallery-grid">
          {tiles.map(tile => (
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