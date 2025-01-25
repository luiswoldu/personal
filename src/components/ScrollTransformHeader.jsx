import { useState, useEffect } from 'react';
import MobileScrollHeader from './MobileScrollHeader';
import DesktopScrollHeader from './DesktopScrollHeader';

const ScrollTransformHeader = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerWidth <= 480 ? 100 : 700; // Different values for mobile/desktop
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const event = new CustomEvent('headerExpansionComplete', {
      detail: { 
        isFullyExpanded: window.innerWidth <= 480 
          ? scrollProgress >= 0.7 // mobile, adjusts what we need too
          : scrollProgress >= 0.7 // desktop, decides when the intro text is visible
      }
    });
    window.dispatchEvent(event);
  }, [scrollProgress]);

  return (
    <div 
      className={`w-full bg-red relative ${
        mobileView ? 'min-h-[154vh]' : 'min-h-[200vh]'
      }`}
      // min-h-[126vh] controls the height of the animation
    >
      {mobileView ? (
        <MobileScrollHeader scrollProgress={scrollProgress} />
      ) : (
        <DesktopScrollHeader scrollProgress={scrollProgress} />
      )}
    </div>
  );
};

export default ScrollTransformHeader;
