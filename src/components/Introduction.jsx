import React, { useState, useEffect } from 'react';
import './Introduction.css';

const Introduction = () => {
  const [isVisible, setIsVisible] = useState(false); // Set to true by default for testing

  useEffect(() => {
    const handleHeaderExpansion = (event) => {
      setIsVisible(event.detail.isFullyExpanded);
    };

    window.addEventListener('headerExpansionComplete', handleHeaderExpansion);
    return () => window.removeEventListener('headerExpansionComplete', handleHeaderExpansion);
  }, []);

  return (
    <div className={`introduction-container ${isVisible ? 'visible' : 'hidden'}`}>
      <p className="introduction-text">
        Hey, I'm Luis, a product designer and artist based in Toronto.
        <br /><br />
        I've led product and interface design for my startups, Chef+ and Perival, with the goal of merging sustainability with design. Currently, I'm creating a new tool to help people plan their time while learning the latest AI tools.
        <br /><br />
        Outside of design, I'm a passionate filmmaker and chef.</p>
    </div>
  );
};

export default Introduction;
