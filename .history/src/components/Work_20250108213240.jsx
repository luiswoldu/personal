import React from 'react';

const Work = () => {
  return (
    <div className="work-container">
      <div className="gallery-grid">
        {/* Small Tiles */}
        {[...Array(8)].map((_, index) => (
          <div 
            key={index + 1}
            className={`gallery-item small-tile small${index + 1}`}
          />
        ))}
        
        {/* Large Tiles */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index + 9}
            className={`gallery-item large-tile large${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;