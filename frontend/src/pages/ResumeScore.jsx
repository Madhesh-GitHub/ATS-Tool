import React, { useState } from 'react';
const ResumeScore=()=>{
      const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
          <div className="min-h-screen p-0 bg-[#F9FAFB] ">


      {/* Main Section */}
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl p-6 font-medium text-start mb-4 text-[#456882] mt-4">
          Resume Analysis
        </h1>

        {/* Overall Score + New Div Side-by-Side */}
<div className="flex flex-col md:flex-row md:items-stretch gap-6 mb-8">
  {/* Overall Score */}
  <div className="flex-1 mb-1 bg-white p-6 rounded-xl shadow-lg border text-center shadow-lg">
    <h3 className="text-3xl pt-20 font-semibold text-gray-700 mb-2">Overall Score</h3>
    <div className="text-8xl p-5 font-bold text-blue-600 mb-1">78%</div>
    <p className="text-3xl pt-1 pb-4 text-green-600 font-medium ">Good</p>
    <p className="text-xl pb-4 text-gray-500 mt-2 mb-1">
      Resume is ATS-friendly with some improvements needed.
    </p>
    <button className="text-xl mt-4 mb-7 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 shadow transition">
      View More Suggestions
    </button>
  </div>


 {/* Right: Two Stacked Divs */}
  <div className="flex-1 flex flex-col gap-6">
  {/* First Right Div */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-white text-xl font-semibold mb-2">✨ Use AI to Enhance Your Resume</h3>
      <p className='text-white text-sm'>Leverage AI-powered enhancements to get a perfect resume and increase your chances of landing a high-paid job with impactful, targeted content and get personalized suggestions for your resume.</p>
      <button className="btn btn-center text-xl mt-4 mb-2 px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-700 shadow transition">
        🤖 Optimize resume with AI
      </button>
    </div>
  

 
    {/* second Right Div */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Resume Summary</h3>
      <p className="text-sm text-gray-700">
       Your resume has strong formatting and experience sections.<br></br><br></br>
        But your Computed match rate is below the recommended score of 80%. <br></br><br></br>
         There is a slight probability that your resume may be skipped.<br></br><br></br>
          To improve your chances please review your the below reports.<br></br><br></br>
          Add any relevant missing skills or keywords.<br></br> <br></br>
           Highlight more soft skills like leadership and collaboration. <br></br> <br></br>
      </p>
    </div>
    </div>
</div>
    


        {/* Score Cards in 2 Columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Formatting</h3>
              <p className="text-blue-600 text-2xl font-bold mb-2">82%</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Consistent header sizes</li>
                <li>Clean layout</li>
                <li>Margins can be improved</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
              <p className="text-blue-600 text-2xl font-bold mb-2">85%</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Achievements are listed</li>
                <li>Quantified metrics</li>
                <li>Chronological order followed</li>
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills Match</h3>
              <p className="text-blue-600 text-2xl font-bold mb-2">65%</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Core technical skills present</li>
                <li className="text-red-600">Missing 3 keywords</li>
                <li className="text-red-600">Add more soft skills</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ATS Readability</h3>
              <p className="text-blue-600 text-2xl font-bold mb-2">79%</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Standard fonts used</li>
                <li>No complex elements</li>
                <li>Readable by most ATS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Keyword Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Keyword Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-600 mb-1">✅ Found in Resume:</p>
              <p>HTML, CSS, JavaScript, React, Problem Solving</p>
            </div>
            <div>
              <p className="font-medium text-gray-600 mb-1">🔍 Suggested to Add:</p>
              <p>Teamwork, Communication, Leadership, Agile</p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Score Breakdown</h3>
          <div className="bg-gray-100 p-4 rounded">
            {[
              { label: 'Formatting', value: 82 },
              { label: 'Skills Match', value: 65 },
              { label: 'Experience', value: 85 },
              { label: 'ATS Readability', value: 79 },
              { label: 'Overall Score', value: 78 },
            ].map((item, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-sm text-gray-700 mb-1">{item.label}</p>
                <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-full bg-green-300"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div>
            <p className="text-lg font-bold text-indigo-700 mb-1">Ready to improve your resume?</p>
            <p className="text-sm text-indigo-600">
              Our AI-powered recommendations can help you increase your score by up to 35%
            </p>
          </div>
          <button className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition">
            View Detailed Recommendations
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-10">
          © 2025 ATS Resume Checker. All rights reserved.
        </div>
      </div>
      </div>
        </>
    )

}
export default ResumeScore