import React, { useState, useEffect } from 'react';

const Work = () => {
  const [visibleTiles, setVisibleTiles] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 800) {
        // Animate tiles sequentially
        for (let i = 1; i <= 11; i++) {
          setTimeout(() => {
            setVisibleTiles(prev => new Set([...prev, i]));
          }, i * 200); // 200ms delay between each tile
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
    <div
      style={{
        minHeight: 'auto',
        height: '747px',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 0,
        padding: 0,
        margin: 0,
        width: 'auto',
        overflow: 'hidden',
        left: 0,
        right: 0
      }}
    >
      <div 
        className="gallery-grid" 
        style={{ 
          left: 0,
          margin: 0,
          padding: 0
        }}
      >
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
    </div>
  );
};

export default Work;