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
    height: 283 + (420 * (scrollY / maxScroll)) /* 282px initial height + 420px expansion */,
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
        transform: 'translate(-50%, -42%)', 
        width: '100%',
        maxWidth: '100%', // Ensures edge-to-edge width
        backgroundColor: 'red',
        zIndex: -1, // bug fix! work section no longer covered by the ScrollHead
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '1.5rem',
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <img 
        src="https://media.gq.com/photos/6520818feb9535ffe59d663a/master/w_1600,c_limit/GQ1123_Chalamet_D_14.jpg"
        alt="Mobile Header"
        style={{
          width: '100%',
          height: '200%',
          objectFit: 'contain'
        }}
      />
    </animated.div>
  );
};

export default MobileScrollHeader; 