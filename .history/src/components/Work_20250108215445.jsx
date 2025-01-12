import React, { useEffect, useRef } from 'react';

const Work = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Unobserve after animation is triggered so it won't repeat
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    );

    // Observe all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      observerRef.current.observe(item);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      style={{
        minHeight: 'auto',
        height: '747px',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 0,
        padding: 0,
        margin: 0,
        width: 'auto',
        overflow: 'hidden',
        left: 0,
        right: 0
      }}
    >
      <div 
        className="gallery-grid" 
        style={{ 
          left: 0,
          margin: 0,
          padding: 0
        }}
      >
        {/* Small Tiles */}
        <div className="gallery-item small-tile small1" data-number="1" />
        <div className="gallery-item small-tile small2" data-number="2" />
        <div className="gallery-item small-tile small3" data-number="3" />
        <div className="gallery-item small-tile small4" data-number="4" />
        <div className="gallery-item small-tile small5" data-number="5" />
        <div className="gallery-item small-tile small6" data-number="6" />
        <div className="gallery-item small-tile small7" data-number="7" />
        <div className="gallery-item small-tile small8" data-number="8" />
        
        {/* Large Tiles */}
        <div className="gallery-item large-tile large1" data-number="9" />
        <div className="gallery-item large-tile large2" data-number="10" />
        <div className="gallery-item large-tile large3" data-number="11" />
      </div>
    </div>
  );
};

export default Work;