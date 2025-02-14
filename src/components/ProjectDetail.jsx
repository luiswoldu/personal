import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // You can fetch project details based on the ID
  const getProjectDetails = (projectId) => {
    // This would typically come from an API or data store
    const tiles = [
      { 
        id: 1, 
        title: 'Chef++++', 
        description: 'Chef+ is a platform that connects chefs with customers, allowing them to find and book chefs for their events. It is a web application that allows chefs to create a profile, upload their work, and search for customers.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/260e3c213434705.674655b409657.png' 
      },
      { 
        id: 2, 
        title: 'Perival', 
        description: 'Climate change is the greatest challenge humanity has collectively faced. We can only solve it with the government and industry taking action. However, individuals and businesses also play a critical role in driving change. Our SaaS climate tracker empowers organizations to measure, manage, and reduce their carbon footprint with real-time data insights, actionable recommendations, and automated reporting. By making sustainability efforts transparent and data-driven, we help companies align with global climate goals, comply with evolving regulations, and contribute to a greener future.',
        image: 'https://i.imgur.com/kR7uP9R.jpeg' 
      },
      { 
        id: 3, 
        title: 'Chef Kiss', 
        description: 'Another detailed project description here. This one also contains multiple lines of text to show how the expansion works. The dark overlay becomes more prominent when the description is expanded, helping to maintain text readability against the background image.',
        image: 'https://i.imgur.com/kR7uP9R.jpeg' 
      },

      // ... add more projects
    ];
    return tiles.find(project => project.id === parseInt(projectId));
  };

  const project = getProjectDetails(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-200 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: -1 }}
        />
        
        {/* Dark Overlay - becomes darker when description is expanded */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isExpanded ? 'opacity-70' : 'opacity-10'
          }`}
        />

        {/* Text Container */}
        <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2" style={{ paddingLeft: '148px' }}>
          <h1 className="text-5xl md:text-[64px] font-light text-white mb-4 leading-tight text-left">
            {project.title}
          </h1>
          
          {/* Expandable Description */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-white text-2xl md:text-[19px] cursor-pointer transition-all duration-300 text-left ${
              isExpanded 
                ? 'white-space-normal' 
                : 'overflow-hidden text-ellipsis whitespace-nowrap'
            }`}
          >
            <p className="leading-relaxed">
              {project.description}
            </p>
            <span className="text-gray-300 block mt-2">
              {isExpanded ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;