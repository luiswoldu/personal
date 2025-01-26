import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TabBar = () => {
  const [activeSection, setActiveSection] = useState('none');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 250) {
        setActiveSection('none');
      } else if (scrollY >= 250 && scrollY < 800) {
        setActiveSection('about');
      } else if (scrollY >= 800 && scrollY < 1760) {
        setActiveSection('work');
      } else if (scrollY >= 1760) {
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
    padding: '15px 20px',
    paddingTop: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '10.27px',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: activeSection === buttonName.toLowerCase() ? '#000' : '#999',
    border: 'none',
  });

  return (
    <div 
      className="tab-bar" 
      style={{ 
        backgroundColor: '#f1f1f1',
        minHeight: isMobile ? '70px' : '118px',
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
        <button style={getButtonStyle('about')}>
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 50, delay: 0.2 }}
          >
            ABOUT
          </motion.span>
        </button>
        <button style={getButtonStyle('work')}>
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 50, delay: 0.4 }}
          >
            WORK
          </motion.span>
        </button>
        <button style={getButtonStyle('contact')}>
          <motion.span
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 50, delay: 0.6 }}
          >
            CONTACT
          </motion.span>
        </button>
      </div>
    </div>
  );
};

export default TabBar;