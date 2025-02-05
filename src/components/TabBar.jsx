import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TabBar = () => {
  const [activeSection, setActiveSection] = useState('none');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Add scroll breakpoints configuration
  const scrollBreakpoints = {
    desktop: {
      about: { start: 490, end: 800 },
      work: { start: 800, end: 1760 },
      contact: { start: 1760, end: Infinity }
    },
    mobile: {
      about: { start: 120, end: 740 },
      work: { start: 740, end: 1220 },
      contact: { start: 1221, end: Infinity }
    }
  };

  // Add new configuration for scroll-to positions
  const scrollToPositions = {
    desktop: {
      about: 700,
      work: 1350,
      contact: 2100
    },
    mobile: {
      about: 570,
      work: 1150,
      contact: 1480
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const breakpoints = isMobile ? scrollBreakpoints.mobile : scrollBreakpoints.desktop;

      if (scrollY < breakpoints.about.start) {
        setActiveSection('none');
      } else if (scrollY >= breakpoints.about.start && scrollY < breakpoints.about.end) {
        setActiveSection('about');
      } else if (scrollY >= breakpoints.work.start && scrollY < breakpoints.work.end) {
        setActiveSection('work');
      } else if (scrollY >= breakpoints.contact.start) {
        setActiveSection('contact');
      }
    };

    const handleResize = () => {
      const currentIsMobile = window.innerWidth <= 480;
      if (currentIsMobile !== isMobile) {
        setIsMobile(currentIsMobile);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial check in case the window size has changed before the event listeners were added
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const getButtonStyle = (buttonName) => ({
    backgroundColor: '#f1f1f1',
    margin: '0 8px',
    padding: isMobile ? '41px 20px' : '20px 40px',
    paddingTop: isMobile ? '40px' : '38px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '10.27px',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: activeSection === buttonName.toLowerCase() ? '#000' : '#999',
    border: 'none',
  });

  const handleTabClick = (section) => {
    const positions = isMobile ? scrollToPositions.mobile : scrollToPositions.desktop;
    window.scrollTo({
      top: positions[section],
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="tab-bar" 
      style={{ 
        backgroundColor: '#f1f1f1',
        minHeight: isMobile ? '70px' : '116px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          style={getButtonStyle('about')}
          onClick={() => handleTabClick('about')}
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 120, damping: 100, delay: 0.3 }}
          >
            ABOUT
          </motion.span>
        </button>
        <button 
          style={getButtonStyle('work')}
          onClick={() => handleTabClick('work')}
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 120, damping: 100, delay: 0.6 }}
          >
            WORK
          </motion.span>
        </button>
        <button 
          style={getButtonStyle('contact')}
          onClick={() => handleTabClick('contact')}
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 120, damping: 100, delay: 0.9 }}
          >
            CONTACT
          </motion.span>
        </button>
      </div>
    </div>
  );
};

export default TabBar;