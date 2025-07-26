import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeBuilderService } from '../services/resumeBuilderService';

export default function Achievements() {
  const navigate = useNavigate();
  const resumeService = new ResumeBuilderService();
  
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
    organization: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAchievement = () => {
    if (!newAchievement.title.trim()) {
      alert("Please enter an achievement title.");
      return;
    }

    setAchievements([...achievements, { ...newAchievement }]);
    setNewAchievement({
      title: "",
      description: "",
      date: "",
      organization: ""
    });
  };

  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const editAchievement = (index) => {
    setNewAchievement(achievements[index]);
    removeAchievement(index);
  };

  const handleSave = async () => {
    try {
      await resumeService.saveResumeData('achievements', { achievements });
      alert("Achievements saved successfully!");
    } catch (error) {
      console.error("Error saving achievements:", error);
      alert("Error saving achievements");
    }
  };

  const handleContinue = async () => {
    try {
      await resumeService.saveResumeData('achievements', { achievements });
      alert("Achievements saved successfully!");
      navigate("/builder/CertificatePage");
    } catch (error) {
      console.error("Error saving achievements:", error);
      alert("Error saving achievements");
    }
  };

  return (
    <div className="p-20 w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1f4882] mb-6">Achievements & Awards</h1>
      
      {/* Add Achievement Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Add Achievement</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievement Title *
            </label>
            <input
              type="text"
              name="title"
              value={newAchievement.title}
              onChange={handleInputChange}
              placeholder="e.g., Employee of the Month, Best Project Award"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization/Company
              </label>
              <input
                type="text"
                name="organization"
                value={newAchievement.organization}
                onChange={handleInputChange}
                placeholder="e.g., ABC Corp, XYZ University"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Received
              </label>
              <input
                type="date"
                name="date"
                value={newAchievement.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={newAchievement.description}
              onChange={handleInputChange}
              placeholder="Brief description of the achievement and its significance"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          onClick={addAchievement}
          className="mt-4 bg-[#1f4882] text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Achievement
        </button>
      </div>

      {/* Achievements List */}
      {achievements.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Your Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    {achievement.organization && (
                      <p className="text-gray-600">{achievement.organization}</p>
                    )}
                    {achievement.date && (
                      <p className="text-sm text-gray-500">{achievement.date}</p>
                    )}
                    {achievement.description && (
                      <p className="mt-2 text-gray-700">{achievement.description}</p>
                    )}
                  </div>
                  <div className="ml-4 space-x-2">
                    <button
                      onClick={() => editAchievement(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button 
          onClick={() => navigate('/builder/languages')}
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Languages
        </button>
        
        <div className="space-x-4">
          <button
            onClick={handleSave}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Save Progress
          </button>
          <button
            onClick={handleContinue}
            className="bg-[#1f4882] text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue to Certificates →
          </button>
        </div>
      </div>
    </div>
  );
}