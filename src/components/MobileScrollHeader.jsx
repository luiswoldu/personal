import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const MobileScrollHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const maxScroll = 200; // Scroll distance for the animation

  // Update scrollY state based on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll > maxScroll ? maxScroll : currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define animation styles based on scrollY
  const animationStyles = useSpring({
    height: 201 + (356 * (scrollY / maxScroll)) /* 282px initial height + 420px expansion */,
    opacity: scrollY >= maxScroll ? 0 : 1,
    config: {
      tension: 220,  // Fade out adjustment
      friction: 24,  // Fade out adjustment
      duration: scrollY >= maxScroll ? 400 : 10, // Fade out adjustment
    },
  });

  return (
    <animated.div
      style={{
        ...animationStyles,
        position: 'fixed',
        top: '50%', // sets the red rectangle starting point vertically
        left: '50%', // sets the red rectangle starting point horizontally
        transform: 'translate(-50%, -47%)', 
        width: '100%',
        maxWidth: '100%', // Ensures edge-to-edge width
        backgroundColor: 'transparent',
        zIndex: -1, // bug fix! work section no longer covered by the ScrollHead
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <img 
        src="https://i.imgur.com/UK6l5Ck.jpeg"
        alt="Mobile Header"
        style={{
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          position: 'relative',
          top: '65px'
        }}
      />
    </animated.div>
  );
};

export default MobileScrollHeader; 