import React, { useState } from "react";

const WorkExperience = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    responsibilities: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    // Add backend or localStorage save logic here
  };

  const handleDelete = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      responsibilities: "",
    });
  };

  return (
    <div className="p-6 bg-[#f9f9fb] min-h-screen text-[#333]">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#4338ca]">Work Experience</h1>
          <div className="space-x-2">
            <button className="bg-[#ede9fe] text-[#6d28d9] px-4 py-2 rounded-md font-medium">
              Previous: Personal Info
            </button>
            <button className="bg-[#ede9fe] text-[#6d28d9] px-4 py-2 rounded-md font-medium">
              Next: Education
            </button>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#4b5563] mb-1">Your Work History</h2>
          <p className="text-sm text-gray-600">Add your most recent positions first.</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "33%" }}></div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Project Manager"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Acme Corporation"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date*</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={formData.isCurrent}
            />
            <label className="inline-flex items-center mt-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="mr-2"
              />
              Current Job
            </label>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Key Responsibilities & Achievements*
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Describe your key responsibilities, achievements, and projects..."
            rows="5"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">
            Tip: Use bullet points and action verbs to highlight your achievements
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-md font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700"
          >
            Save Position
          </button>
        </div>

        {/* ATS Tips Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            ATS Optimization Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">
                Use Keywords from Job Description
              </h4>
              <p className="text-sm mt-1">
                Include relevant keywords to increase chances of passing ATS filters.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">Use Standard Job Titles</h4>
              <p className="text-sm mt-1">
                Use industry-standard titles so ATS systems recognize your role.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">Quantify Your Achievements</h4>
              <p className="text-sm mt-1">
                Use numbers and metrics to highlight the impact of your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
