import { useSpring, animated } from 'react-spring';

const DesktopScrollHeader = ({ scrollProgress }) => {
  const initialDesktopWidth = 805;
  const initialDesktopHeight = 330;
  const expandedDesktopHeight = 124;

  const getAnimatedDimensions = (progress) => {
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
  };

  const dimensions = getAnimatedDimensions(scrollProgress);

  const fadeStyle = useSpring({
    opacity: scrollProgress < 0.7 ? 1 : 1 - (scrollProgress - 0.7) * 3.33,
    config: { tension: 140, friction: 20, duration: undefined }
  });

  return (
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
        src="https://i.imgur.com/cRutwR9.jpeg"
        alt=""
        style={{
          width: `${initialDesktopWidth * 1.79}px`,
          height: `${initialDesktopHeight * 1.79}px`,
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -47%)'
        }}
      />
    </div>
  );
};

export default DesktopScrollHeader; 