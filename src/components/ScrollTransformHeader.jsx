import { useState, useEffect } from 'react';

const ScrollTransformHeader = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initial dimensions
  const initialWidth = 805;
  const initialHeight = 330;
  
  // We'll set up two phases of animation
  // Phase 1 (0 to 0.5): Transform to rectangle
  // Phase 2 (0.5 to 1): Shrink height to 0
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) over the first 400px of scroll
      // Increased scroll range to make animation smoother
      const progress = Math.min(window.scrollY / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dimensions based on two-phase animation
  const getAnimatedDimensions = (progress) => {
    // First phase: 0 to 0.5 progress
    if (progress <= 0.5) {
      // Normalize progress to 0-1 range for first phase
      const normalizedProgress = progress * 2;
      return {
        width: initialWidth + (window.innerWidth - initialWidth) * normalizedProgress,
        height: initialHeight + (124 - initialHeight) * normalizedProgress
      };
    } 
    // Second phase: 0.5 to 1 progress
    else {
      // Normalize progress to 0-1 range for second phase
      const normalizedProgress = (progress - 0.5) * 2;
      return {
        width: window.innerWidth, // Stay at full width
        height: 124 * (1 - normalizedProgress) // Shrink height to 0
      };
    }
  };

  const dimensions = getAnimatedDimensions(scrollProgress);
  const translateY = -150 * scrollProgress; // Keep the vertical movement

  return (
    <div className="w-full min-h-[200vh] relative">
      <div
        className="fixed left-1/2 top-1/2 bg-gray-400 transition-transform duration-75 ease-out"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `translate(-50%, ${translateY}px)`,
        }}
      />
    </div>
  );
};

export default ScrollTransformHeader;