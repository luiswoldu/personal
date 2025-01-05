import React from 'react';

const TabBar = () => {
  return (
    <div 
      className="tab-bar" 
      style={{ 
        backgroundColor: '#f1f1f1',
        minHeight: '60px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #ddd'
      }}
    >
      <button 
        className="tab-button" 
        style={{ 
          backgroundColor: 'inherit',
          border: 'none',
          padding: '15px 20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => console.log('Home clicked')}
      >
        Home
      </button>
      <button 
        className="tab-button" 
        style={{ 
          backgroundColor: 'inherit',
          border: 'none',
          padding: '15px 20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => console.log('About clicked')}
      >
        About
      </button>
      <button 
        className="tab-button" 
        style={{ 
          backgroundColor: 'inherit',
          border: 'none',
          padding: '15px 20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => console.log('Projects clicked')}
      >
        Projects
      </button>
      <button 
        className="tab-button" 
        style={{ 
          backgroundColor: 'inherit',
          border: 'none',
          padding: '15px 20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => console.log('Contact clicked')}
      >
        Contact
      </button>
    </div>
  );
};

export default TabBar; 