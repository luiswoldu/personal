import { useState, useEffect } from 'react';

const ScrollTransformHeader = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initial dimensions
  const initialWidth = 805;
  const initialHeight = 330;
  
  // Final dimensions
  const finalWidth = 1440;
  const finalHeight = 124;
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) over the first 200px of scroll
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Interpolate dimensions based on scroll progress
  const currentWidth = initialWidth + (finalWidth - initialWidth) * scrollProgress;
  const currentHeight = initialHeight + (finalHeight - initialHeight) * scrollProgress;
  
  // Calculate position
  const translateY = -150 * scrollProgress; // Move up by 150px when fully scrolled
  
  return (
    <div className="w-full min-h-[200vh] relative">
      <div 
        className="fixed left-1/2 top-1/2 bg-gray-400 transition-transform duration-75 ease-out"
        style={{
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
          transform: `translate(-50%, ${translateY}px)`,
        }}
      />
    </div>
  );
};

export default ScrollTransformHeader;