import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // You can fetch project details based on the ID
  const getProjectDetails = (projectId) => {
    // This would typically come from an API or data store
    const tiles = [
      { id: 1, title: 'Project 1', description: 'Description for Project 1', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/260e3c213434705.674655b409657.png' },
      { id: 2, title: 'Project 2', description: 'Description for Project 2', image: 'https://i.imgur.com/kR7uP9R.jpeg' },
      // ... add more projects
    ];
    return tiles.find(project => project.id === parseInt(projectId));
  };

  const project = getProjectDetails(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-8 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      
      <div className="max-w-4xl mx-auto">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-auto rounded-lg shadow-lg mb-8"
        />
        
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;