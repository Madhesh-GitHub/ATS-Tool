import React from 'react';
import { FiExternalLink, FiBookOpen, FiTrendingUp, FiUsers } from 'react-icons/fi';
import './Blog.css';

const Blog = () => {
  const handleVisitBlog = () => {
    window.open('http://localhost:3000', '_blank');
  };

  const blogFeatures = [
    {
      icon: <FiBookOpen size={24} />,
      title: "Resume Tips & Guides",
      description: "Expert advice on crafting ATS-friendly resumes and cover letters"
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Industry Insights",
      description: "Latest trends in recruitment and job market analysis"
    },
    {
      icon: <FiUsers size={24} />,
      title: "Success Stories",
      description: "Real experiences from job seekers who landed their dream jobs"
    }
  ];

  return (
    <div className="blog-section">
      <h2>Stay Updated with Our Blog</h2>
      <p>Get the latest insights, tips, and strategies to boost your job search success</p>
      
      <div className="blog-features">
        {blogFeatures.map((feature, index) => (
          <div key={index} className="blog-feature-card">
            <div className="blog-feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="blog-cta">
        <button onClick={handleVisitBlog} className="blog-visit-btn">
          <FiExternalLink size={20} />
          Visit Our Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;