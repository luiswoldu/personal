import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  // Update useEffect to depend on id
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);  // Add id as a dependency

  useEffect(() => {
    const handleScroll = () => {
      // --- Calculate the breakpoint ---
      const breakpoint = document.getElementById('next-project-section')?.offsetTop - window.innerHeight + 100; // Adjust 100 as needed

      if (window.scrollY > breakpoint) {
        setAnimateButton(true);
      } else {
        setAnimateButton(false); // Important: Reset the animation state
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []); // Empty dependency array: run only on mount/unmount

  // You can fetch project details based on the ID
  const getProjectDetails = (projectId) => {
    // This would typically come from an API or data store
    const tiles = [
      { 
        id: 1, 
        title: 'Chef+',
        year: '2022',
        projectTitle: 'A Platform Connecting Chefs with Food Enthusiasts',
        description: 'The ultimate platform to discover and cook recipes that perfectly match your taste. With a variety of amazing content creators, Chef+ offers a better way to find recipes. With Shows, you can watch creative and unique content without browsing on food blogs. As you cook, Chef+ learns your preferences and intelligently curates a rich catalog of cookbook-quality recipes. It even helps you eat healthier by adding more plants to your diet.',
        description2: 'Health forward.\nAll elements of the brand embrace bold typography, fluid gradients, and gentle curves. Playful, yet confident, the goal was to educate people about the science behind the food we eat.',
        image: 'https://i.imgur.com/GDcbWdh.jpeg',
        gridImages: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e03117213434705.674655b40ab2d.png',
          'https://i.imgur.com/xCxOyXP.jpeg',
          'https://mir-s3-cdn-cf.behance.net/project_modules/1400/5df4a6213434705.674655b409e49.png'
        ],
        secondGridImages: [
          'https://i.imgur.com/BiRnBoY.jpeg',
          'https://i.imgur.com/3kGzukq.jpeg',
          'https://i.imgur.com/eqvv80y.jpeg'
        ],
        logo: '/path-to-logo.png'
      },
      { 
        id: 2, 
        title: 'Perival', 
        year: '2021',
        description: 'Climate change is the greatest challenge humanity has collectively faced. Introducing Perival. A web service that provides cities, businesses and employees with information on their environmental performance. By showing progress and providing frequent feedback, we improve communication between the general public and companies, sparking motivation and building a more sustainable economy.',
        description2: 'All-in-one platform.\nPerival empowers employees to showcase their sustainability efforts, turning everyday actions into measurable impact. By leading with transparency, they inspire peers and set a new standard for companies to follow.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/597ad3202323657.66842511822b6.png',
        gridImages: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/c7ab1d218261391.679e7210b6cb5.jpg',
          'https://i.imgur.com/BaPEMx3.jpeg',
          'https://i.imgur.com/qCcAhpW.jpeg'
        ],
        secondGridImages: [
          'https://i.imgur.com/hLUPb0T.jpeg',
          'https://i.imgur.com/vKPXmC2.jpeg',
          'https://i.imgur.com/WQrEidd.jpeg'
        ],
        logo: '/path-to-logo.png'

      },
      { 
        id: 3, 
        title: 'Chef\'s Kiss', 
        year: '2019',
        description: 'Make food you\'ll love. A new cooking app for the world\'s most delicious recipes. Plant-based ingredients. Beautiful step-by-step directions. New recipes every month.',
        description2: 'Early stages.\nDuring COVID-19, I began coding with Swift to create my first iOS app. I worked tirelessly to develop original recipes and create vivid food photography, aiming to inspire a healthier lifestyle.',
        image: 'https://i.imgur.com/ZmraZam.jpeg', 
        gridImages: [
          'https://i.imgur.com/rvzqPUb.jpeg',
          'https://i.imgur.com/4alaKZJ.jpeg',
          'https://i.imgur.com/PvIu1pR.jpeg'
        ],
        secondGridImages: [
          'https://i.imgur.com/VwXS0Py.jpeg',
          'https://i.imgur.com/GVjlFW9.jpeg',
          'https://i.imgur.com/Y8g9sFR.jpeg'
        ],
        logo: '/path-to-logo.png'
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
        onClick={() => navigate('/#work')}
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-200 transition-colors project-detail-clickable"
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
        
        {/* Subtle gradient overlay for non-expanded state - half height */}
        <div 
          className={`absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Dark Overlay - only appears when description is expanded */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isExpanded ? 'opacity-70' : 'opacity-0'
          }`}
        />

        {/* Text Container */}
        <div className="absolute bottom-0 left-0 w-full md:w-[75%] lg:w-[60%] pb-12 pl-[148px] max-sm:pb-8 max-sm:pl-5">
          <h1 className="text-5xl md:text-[64px] font-light text-white mb-4 leading-tight text-left max-sm:text-[42px]">
            {project.title}
          </h1>
          
          {/* Expandable Description */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative project-detail-clickable"
          >
            <div className={`text-white text-2xl md:text-[19px] max-sm:text-[18px] font-light cursor-pointer transition-all duration-300 text-left ${
              isExpanded 
                ? 'white-space-normal' 
                : 'overflow-hidden text-ellipsis h-[3.9rem]'
            }`}
            >
              {isExpanded && (
                <motion.p 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-[#999] mb-6"
                >
                  {project.year}
                </motion.p>
              )}
              <p className="leading-relaxed md:leading-normal pr-8 max-sm:pr-12">
                {project.description}
              </p>
            </div>
            {/* The wrapper for icon */}
            <div className="absolute right-0 bottom-5 max-sm:right-5">
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
      <div className="min-h-screen px-[148px] max-sm:px-5 pt-[86px]">
        <div className="grid grid-cols-10 gap-8 justify-center max-sm:grid-cols-1 max-sm:gap-6">
          {/* Left column with stacked images */}
          <div className="col-span-4 flex flex-col gap-8 justify-between h-full max-sm:gap-6 max-sm:col-span-1">
            {/* Calculate height based on aspect ratio and gap */}
            <div className="relative w-full max-sm:h-auto" style={{ aspectRatio: '16/9', height: 'calc((100% - 0.5rem) / 2)' }}>
              <img
                src={project.gridImages?.[0] || project.image}
                alt="Project view 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full max-sm:h-auto" style={{ aspectRatio: '16/9', height: 'calc((100% - 0.5rem) / 2)' }}>
              <img
                src={project.gridImages?.[1] || project.image}
                alt="Project view 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right column with larger image */}
          <div className="col-span-6 max-sm:col-span-1">
            <div className="relative w-full" style={{ aspectRatio: '4/3.5' }}>
              <img
                src={project.gridImages?.[2] || project.logo || project.image}
                alt="Project main view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="my-16 max-w-3xl text-left max-sm:my-12">
          <p className="text-lg leading-relaxed text-gray-800 max-sm:text-base">
            {project.description2 ? (
              <>
                <span className="font-bold">{project.description2.split('\n')[0]}</span>
                {project.description2.split('\n').slice(1).map((line, index) => (
                  <React.Fragment key={index}>
                    <br />{line}
                  </React.Fragment>
                ))}
              </>
            ) : (
              project.description
            )}
          </p>
        </div>

        {/* Second Image Grid Section - Reversed Layout */}
        <div className="grid grid-cols-10 gap-8 justify-center mb-16 max-sm:grid-cols-1 max-sm:gap-6">
          {/* Left column with larger image */}
          <div className="col-span-6 max-sm:col-span-1">
            <div className="relative w-full" style={{ aspectRatio: '4/3.5' }}>
              <img
                src={project.secondGridImages?.[0] || project.image}
                alt="Project second main view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right column with stacked images */}
          <div className="col-span-4 flex flex-col gap-8 justify-between h-full max-sm:gap-6 max-sm:col-span-1">
            <div className="relative w-full max-sm:h-auto" style={{ aspectRatio: '16/9', height: 'calc((100% - 0.5rem) / 2)' }}>
              <img
                src={project.secondGridImages?.[1] || project.image}
                alt="Project second view 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full max-sm:h-auto" style={{ aspectRatio: '16/9', height: 'calc((100% - 0.5rem) / 2)' }}>
              <img
                src={project.secondGridImages?.[2] || project.image}
                alt="Project second view 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Next Project Button Section */}
        <div id="next-project-section" className="flex justify-center mb-24">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={animateButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Conditional animation
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: "easeOut"
            }}
            onClick={() => navigate(`/project/${parseInt(id) % 3 + 1}`)}
            className="flex items-center justify-between w-[252px] h-[56px] rounded-full bg-[#f1f1f1] text-[#999] group text-[10.27px] font-bold pl-6 pr-4 transition-colors project-detail-clickable"
          >
            <span className="uppercase text-[#999] group-hover:text-black transition-colors duration-300">Next Project</span>
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-white">
              <ChevronRight className="w-6 h-6 text-[#FE3D00] group-hover:text-[#FE3D00] transition-colors duration-300" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;