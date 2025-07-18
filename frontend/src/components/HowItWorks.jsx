import React from 'react';
import { FiUploadCloud, FiBarChart2, FiSettings } from 'react-icons/fi';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <p>Our simple three-step process helps you improve your resume's performance with applicant tracking systems.</p>
      
      <div className="steps">
        <div className="step">
          <div className="icon">
            <FiUploadCloud size={32} color="white" />
          </div>
          <h3>1. Upload</h3>
          <p>Upload your existing resume in PDF, DOCX, or TXT format. Our system will analyze its structure and content.</p>
        </div>
        
        <div className="step">
          <div className="icon">
            <FiBarChart2 size={32} color="white" />
          </div>
          <h3>2. Score</h3>
          <p>Receive a comprehensive ATS compatibility score with detailed feedback on keywords, formatting, and content gaps.</p>
        </div>
        
        <div className="step">
          <div className="icon">
            <FiSettings size={32} color="white" />
          </div>
          <h3>3. Improve</h3>
          <p>Follow our AI-powered suggestions to optimize your resume for specific job descriptions and increase your interview chances.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;