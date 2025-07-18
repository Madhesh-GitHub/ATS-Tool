import React, { useState } from "react";

const Education = () => {
  const [educationData, setEducationData] = useState([]);

  const [newEdu, setNewEdu] = useState({
    degree: "",
    institution: "",
    location: "",
    gpa: "",
    startDate: "",
    endDate: "",
    coursework: "",
    honors: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEdu({ ...newEdu, [name]: value });
  };

  const handleSave = () => {
    if (!newEdu.degree || !newEdu.institution || !newEdu.startDate || !newEdu.endDate) {
      alert("Please fill all required fields");
      return;
    }

    setEducationData([...educationData, newEdu]);

    setNewEdu({
      degree: "",
      institution: "",
      location: "",
      gpa: "",
      startDate: "",
      endDate: "",
      coursework: "",
      honors: "",
    });
  };

  const handleCancel = () => {
    setNewEdu({
      degree: "",
      institution: "",
      location: "",
      gpa: "",
      startDate: "",
      endDate: "",
      coursework: "",
      honors: "",
    });
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-10 text-[#1f4882]">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-2 mt-8">Education</h2>
        <p className="mb-6 text-[#6B7280]">Add your academic qualifications to strengthen your resume</p>

        {/* Existing Education */}
        {educationData.length > 0 && (
          <div className="space-y-4 mb-8">
            {educationData.map((edu, idx) => (
              <div key={idx} className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                <p className="text-sm mt-2">Relevant Coursework: {edu.coursework}</p>
                <p className="text-sm">GPA: {edu.gpa}</p>
                <p className="text-sm text-blue-600">{edu.honors}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add New Education */}
        <h3 className="text-lg font-bold mb-4 text-[#1f4882]">Add New Education</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-[#1F2937]">Degree/Certificate*</label>
            <input
              type="text"
              name="degree"
              value={newEdu.degree}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science in Computer Science"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1F2937]">Institution Name*</label>
            <input
              type="text"
              name="institution"
              value={newEdu.institution}
              onChange={handleChange}
              placeholder="e.g., University of California, Berkeley"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1F2937]">Location</label>
            <input
              type="text"
              name="location"
              value={newEdu.location}
              onChange={handleChange}
              placeholder="e.g., Berkeley, CA, USA"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1F2937]">GPA (Optional)</label>
            <input
              type="number"
              name="gpa"
              value={newEdu.gpa}
              onChange={handleChange}
              placeholder="e.g., 9.8/10.0"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1F2937]">Start Date*</label>
            <input
              type="text"
              name="startDate"
              value={newEdu.startDate}
              onChange={handleChange}
              placeholder="MM/YYYY"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1F2937]">End Date*</label>
            <input
              type="text"
              name="endDate"
              value={newEdu.endDate}
              onChange={handleChange}
              placeholder="MM/YYYY or Present"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-[#1F2937]">Relevant Coursework</label>
          <textarea
            name="coursework"
            value={newEdu.coursework}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
            placeholder="List key courses relevant to the job you're applying for"
          />
        </div>
        <div className="mb-6">
          <label className="text-sm font-medium text-[#1F2937]">Honors & Achievements</label>
          <input
            type="text"
            name="honors"
            value={newEdu.honors}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]"
            placeholder="e.g., Dean's List, Scholarships, Academic Awards"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={handleCancel} className="px-4 py-2 border border-gray-400 rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#9181f4] text-white rounded-md">Save Education</button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-5xl mx-auto mt-6 bg-blue-50 p-4 rounded-md shadow">
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-blue-700">
          ATS Optimization Tips for Education
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Use standard degree terminology (e.g., “Bachelor of Science” instead of “B.S.” or “Bachelor's”)</li>
          <li>Include the full, official name of your institution (e.g., “University of California, Berkeley” not “UC Berkeley”)</li>
          <li>List relevant coursework that matches keywords from the job description</li>
          <li>Format dates consistently throughout your resume (MM/YYYY is recommended)</li>
          <li>For recent graduates, education should appear before work experience; for experienced professionals, place it after</li>
        </ul>
      </div>
    </div>
  );
};

export default Education;