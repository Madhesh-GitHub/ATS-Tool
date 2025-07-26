import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeBuilderService } from '../services/resumeBuilderService';

export default function Language() {
  const navigate = useNavigate();
  const resumeService = new ResumeBuilderService();
  
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({
    language: "",
    proficiency: "Beginner"
  });

  const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Native/Fluent"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLanguage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addLanguage = () => {
    if (newLanguage.language.trim() === "") {
      alert("Please enter a language name.");
      return;
    }

    // Check if language already exists
    const exists = languages.some(lang => 
      lang.language.toLowerCase() === newLanguage.language.toLowerCase()
    );

    if (exists) {
      alert("This language is already added.");
      return;
    }

    setLanguages([...languages, { ...newLanguage }]);
    setNewLanguage({ language: "", proficiency: "Beginner" });
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const editLanguage = (index) => {
    setNewLanguage(languages[index]);
    removeLanguage(index);
  };

  const handleSave = async () => {
    if (languages.length === 0) {
      alert("Please add at least one language before saving.");
      return;
    }

    try {
      await resumeService.saveResumeData('languages', { languages });
      alert("Languages saved successfully!");
    } catch (error) {
      console.error("Error saving languages:", error);
      alert("Error saving languages");
    }
  };

  const handleContinue = async () => {
    if (languages.length === 0) {
      alert("Please add at least one language before continuing.");
      return;
    }

    try {
      await resumeService.saveResumeData('languages', { languages });
      alert("Languages saved successfully!");
      navigate("/builder/achievements");
    } catch (error) {
      console.error("Error saving languages:", error);
      alert("Error saving languages");
    }
  };

  return (
    <div className="p-20 w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1f4882] mb-6">Languages</h1>
      
      {/* Add Language Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Add Language</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language *
            </label>
            <input
              type="text"
              name="language"
              value={newLanguage.language}
              onChange={handleInputChange}
              placeholder="e.g., English, Spanish, French"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level *
            </label>
            <select
              name="proficiency"
              value={newLanguage.proficiency}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={addLanguage}
          className="bg-[#1f4882] text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Language
        </button>
      </div>

      {/* Languages List */}
      {languages.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Your Languages</h2>
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-600 ml-2">({lang.proficiency})</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => editLanguage(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeLanguage(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button 
          onClick={() => navigate('/builder/skills')}
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Skills
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
            Continue to Achievements →
          </button>
        </div>
      </div>
    </div>
  );
}