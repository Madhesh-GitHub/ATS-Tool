import React from 'react'
import heroImage from '../../assets/hero-image.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  
  const handleUploadClick = () => {
    // Check sessionStorage instead of localStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/app');
    } else {
      // Pass redirect path to login page
      navigate('/login', { state: { redirectTo: '/app' } });
    }
  };

  const handleBuilderClick = () => {
    // Check sessionStorage instead of localStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/builder');
    } else {
      // Pass redirect path to login page
      navigate('/login', { state: { redirectTo: '/builder' } });
    }
  };
  
  return (
    <div className="flex justify-between items-center px-[80px] py-[60px] bg-[#F9FAFB] gap-[40px]">
      <div className="flex-1 max-w-[55%]">
        <div className="mb-[25px]">
          <h1 className="text-[38px] font-bold text-[#1F2937] mb-[15px]">
            Optimize Your Resume for ATS Success
          </h1>
          <p className="text-[16px] text-[#6B7280] leading-[1.6]">
            Get your resume past the Applicant Tracking Systems and into the hands of hiring managers. Our AI-powered tool analyzes and improves your resume for maximum visibility
          </p>
        </div>

        <div className="flex gap-[20px]">
          <button 
            className="bg-[#6366F1] text-white px-5 py-3 rounded-md hover:bg-[#4F46E5] transition-all duration-300" 
            onClick={handleUploadClick}
          > 
            Upload Your Resume 
          </button>
          <button 
            className="bg-[#0EA5E9] text-white px-5 py-3 rounded-md hover:bg-[#0284C7] transition-all duration-300"
            onClick={handleBuilderClick}
          > 
            Build ATS Ready Resume 
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 w-full flex justify-center items-center">
        <img
          src='hero.png'
          alt="ATS Optimization Visual"
          className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default Hero