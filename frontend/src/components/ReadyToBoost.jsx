import { useNavigate } from "react-router";

const ReadyToBoost = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[60vh] bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2937] text-center mt-5 mb-10">
          Ready To Boost Your Job Search?
        </h1>
        <p className="text-[#6B7280] text-sm sm:text-base md:text-lg text-center">
          Don't let your resume get lost in the ATS black hole. Optimize it today and start getting the interviews you deserve.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-10 py-5 mt-10">
          <button 
            className="bg-[#6366F1] text-white px-5 py-3 rounded-md hover:bg-[#4F46E5] transition-all duration-300" 
            onClick={() => navigate('/app')}
          > 
            Upload Your Resume 
          </button>
          <button 
            className="bg-[#0EA5E9] text-white px-5 py-3 rounded-md hover:bg-[#0284C7] transition-all duration-300" 
            onClick={() => navigate('/builder')}
          > 
            Build ATS Ready Resume 
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button 
            className="text-[#6366F1] underline hover:text-[#4F46E5] transition-all duration-300" 
            onClick={() => navigate('/signup')}
          >
            New user? Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToBoost;