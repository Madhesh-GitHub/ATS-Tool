import React, { useState } from "react";
import { useNavigate } from "react-router";

const Skills =()=>{

const skillSuggestions = ["JavaScript", "React.js", "Node.js", "MongoDB", "TypeScript", "GraphQL", "AWS", "Docker"];
const softSkillSuggestions = ["Team Leadership", "Problem Solving", "Communication", "Project Management", "Time Management", "Critical Thinking"];
const industrySkillSuggestions = ["Agile Development", "CI/CD", "Microservices", "REST API Design"];

const proficiencyLabels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [industrySkills, setIndustrySkills] = useState([]);
  const [proficiencies, setProficiencies] = useState({});
  const [inputSkill, setInputSkill] = useState("");
  const [inputSoftSkill, setInputSoftSkill] = useState("");
  const [inputIndustrySkill, setInputIndustrySkill] = useState("");
  const navigate=useNavigate();

  const addSkill = (skill, setSkillList, skillList) => {
    if (skill && !skillList.includes(skill)) {
      setSkillList([...skillList, skill]);
    }
  };

  const removeSkill = (skill, setSkillList, skillList) => {
    setSkillList(skillList.filter((s) => s !== skill));
  };

  const handleSlider = (skill, value) => {
    setProficiencies({ ...proficiencies, [skill]: value });
  };

  return (
    <>
    <div className="p-20 w-full mx-auto space-y-8">
      {/* Technical Skills */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-[#1f4882]"> Technical Skills</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Add a technical skill..."
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSkill(inputSkill, setTechnicalSkills, technicalSkills);
              setInputSkill("");
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((skill) => (
            <div
              key={skill}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              {skill}
              <button onClick={() => removeSkill(skill, setTechnicalSkills, technicalSkills)}>
                ×
              </button>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500 ">Suggested skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {skillSuggestions.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill, setTechnicalSkills, technicalSkills)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
        </div>
      </section>

      {/* Proficiency Level */}
      {technicalSkills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-[#1f4882]"> Proficiency Level</h2>
          {technicalSkills.map((skill) => (
            <div key={skill} className="mb-4">
              <label className="block font-medium mb-1">{skill}</label>
              <input
                type="range"
                min="1"
                max="4"
                value={proficiencies[skill] || 1}
                onChange={(e) => handleSlider(skill, e.target.value)}
                className="w-full accent-blue-600"
              />
              <p className="text-sm text-gray-600 mt-1">
                Level: {proficiencyLabels[(proficiencies[skill] || 1) - 1]}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Soft Skills */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-[#1f4882]"> Soft Skills</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Add a soft skill..."
          value={inputSoftSkill}
          onChange={(e) => setInputSoftSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSkill(inputSoftSkill, setSoftSkills, softSkills);
              setInputSoftSkill("");
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <div
              key={skill}
              className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              {skill}
              <button onClick={() => removeSkill(skill, setSoftSkills, softSkills)}>
                ×
              </button>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500 text-[#1f4882]">Suggested soft skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {softSkillSuggestions.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill, setSoftSkills, softSkills)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
        </div>
      </section>

      {/* Industry-Specific Skills */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-[#1f4882]"> Industry-Specific Skills</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Add an industry-specific skill..."
          value={inputIndustrySkill}
          onChange={(e) => setInputIndustrySkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSkill(inputIndustrySkill, setIndustrySkills, industrySkills);
              setInputIndustrySkill("");
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {industrySkills.map((skill) => (
            <div
              key={skill}
              className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              {skill}
              <button onClick={() => removeSkill(skill, setIndustrySkills, industrySkills)}>
                ×
              </button>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500">Suggested industry-specific skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {industrySkillSuggestions.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill, setIndustrySkills, industrySkills)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
        </div>
      </section>

      <div className="flex justify-between pt-6">
        <button className="text-blue-600 underline" onClick={()=>navigate('/builder/education')}>← Back to Education</button>
        <button className="bg-[#1f4882] text-white px-6 py-2 rounded hover:bg-blue-700" onClick={()=>navigate('/builder/achievements')}>
          Continue to Achievements →
        </button>
      </div>
    </div>
    </>
    );

}
export default Skills;