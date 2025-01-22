import { useState, useEffect } from 'react';
import { useSpring, animated, to } from 'react-spring';

const ScrollTransformHeader = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileView, setMobileView] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 480);
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initialMobileHeight = 200;
  const expandedMobileHeight = initialMobileHeight + (167 * 2); // 534px total

  const initialDesktopWidth = 805;
  const initialDesktopHeight = 330;
  const expandedDesktopHeight = 124;

  const getAnimatedDimensions = (progress) => {
    if (mobileView) {
      const currentHeight = initialMobileHeight + (expandedMobileHeight - initialMobileHeight) * progress;
      return {
        width: deviceWidth,
        height: currentHeight,
        opacity: progress >= 1 ? 0 : 1
      };
    } else {
      if (progress <= 0.5) {
        const normalizedProgress = progress * 2;
        return {
          width: initialDesktopWidth + (window.innerWidth - initialDesktopWidth) * normalizedProgress,
          height: initialDesktopHeight + (expandedDesktopHeight - initialDesktopHeight) * normalizedProgress,
        };
      } else {
        const normalizedProgress = (progress - 0.5) * 4;
        return {
          width: window.innerWidth,
          height: Math.max(0, Math.floor(expandedDesktopHeight * (1 - normalizedProgress))),
        };
      }
    }
  };
  
  const dimensions = getAnimatedDimensions(scrollProgress);

  const fadeStyle = useSpring({
    opacity: !mobileView ? (scrollProgress < 0.7 ? 1 : 1 - (scrollProgress - 0.7) * 3.33) : 1,
    config: { tension: 170, friction: 20 }
  });

  useEffect(() => {
    const event = new CustomEvent('headerExpansionComplete', {
      detail: { 
        isFullyExpanded: mobileView ? dimensions.opacity === 0 : scrollProgress >= 0.7
      }
    });
    window.dispatchEvent(event);
  }, [dimensions.opacity, scrollProgress, mobileView]);

  return (
    <div className="w-full min-h-[200vh] bg-white relative">
      {mobileView ? (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            backgroundColor: '#fff',
            opacity: dimensions.opacity,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src="https://media.gq-magazine.co.uk/photos/652673153243b9cc5d9af451/master/w_1600%2Cc_limit/GQ1123_Chalamet_D_14.jpg"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'none',
                transition: 'none'
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="fixed left-1/2 top-[40%] bg-black transition-transform duration-300 ease-in-out"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transform: 'translate(-50%)',
            overflow: 'hidden'
          }}
        >
          <img
            src="https://media.gq.com/photos/652083f621c53954bf68f703/master/w_1600,c_limit/GQ1123_Chalamet_03.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.3s ease',
              transform: 'scale(1)'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollTransformHeader;
