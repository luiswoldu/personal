import React, { useState, useEffect } from 'react';

const Work = () => {
  const [visibleTiles, setVisibleTiles] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 800) {
        for (let i = 1; i <= 11; i++) {
          setTimeout(() => {
            setVisibleTiles(prev => new Set([...prev, i]));
          }, i * 200);
        }
      } else {
        setVisibleTiles(new Set());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTileClassName = (number) => {
    const baseClass = number <= 8 ? 'gallery-item small-tile' : 'gallery-item large-tile';
    const specificClass = number <= 8 ? `small${number}` : `large${number - 8}`;
    const animationClass = visibleTiles.has(number) ? 'animate-tile' : '';
    return `${baseClass} ${specificClass} ${animationClass}`;
  };

  return (
    <div className="work-container">
      <div className="gallery-grid">
        {/* Small Tiles */}
        {[...Array(8)].map((_, index) => (
          <div 
            key={index + 1}
            className={getTileClassName(index + 1)}
            data-number={index + 1}
          />
        ))}
        
        {/* Large Tiles */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index + 9}
            className={getTileClassName(index + 9)}
            data-number={index + 9}
          />
        ))}
      </div>

      <style jsx>{`
        .work-container {
          min-height: auto;
          height: 747px;
          background-color: white;
          position: relative;
          z-index: 0;
          padding: 0;
          margin: 0;
          width: auto;
          overflow: hidden;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 270px 270px 270px 575px;
          grid-template-rows: 168px 168px 168px 350px;
          gap: 8px;
          margin: 0 auto;
          width: 1499px;
          height: 747px;
          grid-template-areas:
            "small1 small2 small3 large1"
            "small4 small5 small6 large1"
            "large2 large2 small7 large3"
            "large2 large2 small8 large3";
        }

        .gallery-item {
          background-color: #f5f5f7;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
        }

        .small-tile {
          width: 270px;
          height: 168px;
        }

        .large-tile {
          width: 575px;
          height: 350px;
        }

        .small1 { grid-area: small1; }
        .small2 { grid-area: small2; }
        .small3 { grid-area: small3; }
        .small4 { grid-area: small4; }
        .small5 { grid-area: small5; }
        .small6 { grid-area: small6; }
        .small7 { grid-area: small7; }
        .small8 { grid-area: small8; }

        .large1 { grid-area: large1; }
        .large2 { grid-area: large2; }
        .large3 { grid-area: large3; }

        .animate-tile {
          animation: fadeInScale 0.5s ease forwards;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Work;