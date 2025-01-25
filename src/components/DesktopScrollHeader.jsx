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
    config: { tension: 240, friction: 20, duration: undefined }
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
  );
};

export default DesktopScrollHeader; 