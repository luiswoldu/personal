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
        title: 'Chef+',
        projectTitle: 'A Platform Connecting Chefs with Food Enthusiasts',
        description: 'Chef+ is a platform that connects chefs with customers, allowing them to find and book chefs for their events. It is a web application that allows chefs to create a profile, upload their work, and search for customers.',
        description2: 'Chef+ was developed as a comprehensive solution to bridge the gap between professional chefs and customers seeking personalized culinary experiences.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/260e3c213434705.674655b409657.png',
        gridImages: [
          '/path-to-grid-image-1.jpg',
          '/path-to-grid-image-2.jpg',
          '/path-to-logo.png'
        ],
        logo: '/path-to-logo.png'
      },
      { 
        id: 2, 
        title: 'Perival', 
        description: 'Climate change is the greatest challenge humanity has collectively faced. We can only solve it with the government and industry taking action. However, individuals and businesses also play a critical role in driving change. Our SaaS climate tracker empowers organizations to measure, manage, and reduce their carbon footprint with real-time data insights, actionable recommendations, and automated reporting. By making sustainability efforts transparent and data-driven, we help companies align with global climate goals, comply with evolving regulations, and contribute to a greener future.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/597ad3202323657.66842511822b6.png' 
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
    <div className="relative">
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
        <div className="absolute bottom-0 left-0 w-full md:w-[75%] lg:w-[60%] pb-12" style={{ paddingLeft: '148px' }}>
          <h1 className="text-5xl md:text-[64px] font-light text-white mb-4 leading-tight text-left">
            {project.title}
          </h1>
          
          {/* Expandable Description */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative"
          >
            <div className={`text-white text-2xl md:text-[19px] font-light cursor-pointer transition-all duration-300 text-left ${
              isExpanded 
                ? 'white-space-normal' 
                : 'overflow-hidden text-ellipsis h-[3.9rem]'
            }`}
            >
              <p className="leading-relaxed md:leading-normal pr-8">
                {project.description}
              </p>
            </div>
            {/* The wrapper for icon */}
            <div className="absolute right-0 bottom-5">
                <span className="text-[#FE3D00]">
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

      {/* New Image Grid Section */}
      <div className="min-h-screen pt-12" style={{ paddingLeft: '148px' }}>
        <div className="grid grid-cols-12 gap-8">
          {/* Left column with stacked images */}
          <div className="col-span-4" style={{ height: '100%' }}>
            {/* We use inline styles for dynamic height calculation */}
            <div className="relative" style={{ height: '100%' }}>
              <div
                className="absolute top-0 left-0 w-full"
                style={{
                  height: 'calc((100% - 1.25rem) / 2)', /* 1.25rem is equivalent to space-y-5 */
                }}
              >
                <img
                  src={project.gridImages?.[0] || project.image}
                  alt="Project view 1"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 w-full"
                style={{ height: 'calc((100% - 1.25rem) / 2)' }}
              >
                <img
                  src={project.gridImages?.[1] || project.image}
                  alt="Project view 2"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column with larger image */}
          <div className="col-span-7">
            <div className="space-y-5">
              <div className="relative w-full" style={{ aspectRatio: '1.5/1' }}>
                <img
                  src={project.gridImages?.[2] || project.logo || project.image}
                  alt="Project main view"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>  
          </div>
        </div>

        {/* New Description Section */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-light mb-6">About the Project</h2>
          <p className="text-lg leading-relaxed text-gray-800">
            {project.longDescription || project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;