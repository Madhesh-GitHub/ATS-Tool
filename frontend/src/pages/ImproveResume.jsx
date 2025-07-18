import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Download,
  Save,
  Play,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Loader2,
} from "lucide-react";

const ResumeImprovementPage = () => {
  const [isAutoImproving, setIsAutoImproving] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set());
  const [ignoredSuggestions, setIgnoredSuggestions] = useState(new Set());

  const resumeData = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    summary: "Experienced software developer with 5 years of experience in full-stack development.",
    experience: [
      {
        title: "Senior Software Developer",
        company: "Tech Corp",
        duration: "2021 - Present",
        description: "Led development of web applications using React and Node.js",
      },
      {
        title: "Software Developer",
        company: "StartupXYZ",
        duration: "2019 - 2021",
        description: "Developed mobile applications and APIs",
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "University of Technology",
        year: "2019",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
  };

  const suggestions = [
    {
      id: 1,
      title: "Add Quantifiable Achievements",
      description:
        "Include specific numbers and metrics to demonstrate your impact (e.g., 'Increased user engagement by 25%')",
    },
    {
      id: 2,
      title: "Optimize Job Titles",
      description: "Use industry-standard job titles that match common ATS keywords",
    },
    {
      id: 3,
      title: "Include Action Verbs",
      description: "Start bullet points with strong action verbs like 'Implemented', 'Developed', 'Led'",
    },
    {
      id: 4,
      title: "Add Technical Certifications",
      description: "Include relevant certifications to boost your technical credibility",
    },
  ];

  const keywords = {
    found: ["JavaScript", "React", "Node.js", "Full-stack", "Web Development"],
    missing: ["AWS", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum"],
  };

  const handleApplySuggestion = (id) => {
    setAppliedSuggestions((prev) => new Set([...prev, id]));
  };

  const handleIgnoreSuggestion = (id) => {
    setIgnoredSuggestions((prev) => new Set([...prev, id]));
  };

  const handleAutoImprove = () => {
    setIsAutoImproving(true);
    setTimeout(() => {
      setIsAutoImproving(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Resume Improvement Suggestions</h1>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              <Download className="mr-2 h-4 w-4" />
              Download Improved Resume
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </button>
          </div>
        </div>
      </div>

      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Preview</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">ATS Score</span>
                  <span className="text-sm font-bold text-indigo-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{resumeData.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {resumeData.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {resumeData.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {resumeData.location}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                  <p className="text-sm text-gray-600">{resumeData.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Experience
                  </h4>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.title} className="mb-3">
                      <h5 className="font-medium text-sm text-gray-900">{exp.title}</h5>
                      <p className="text-xs text-gray-600">
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Education
                  </h4>
                  {resumeData.education.map((edu) => (
                    <div key={edu.degree}>
                      <h5 className="font-medium text-sm text-gray-900">{edu.degree}</h5>
                      <p className="text-xs text-gray-600">
                        {edu.school} • {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Code className="h-4 w-4 mr-1" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-2 space-y-6">
           
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h2>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`p-4 border rounded-lg transition-all ${
                      appliedSuggestions.has(suggestion.id)
                        ? "border-emerald-200 bg-emerald-50"
                        : ignoredSuggestions.has(suggestion.id)
                        ? "border-gray-200 bg-gray-50 opacity-50"
                        : "border-gray-200 hover:border-indigo-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      {!appliedSuggestions.has(suggestion.id) && !ignoredSuggestions.has(suggestion.id) && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleApplySuggestion(suggestion.id)}
                            className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 transition-colors"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => handleIgnoreSuggestion(suggestion.id)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-300 transition-colors"
                          >
                            Ignore
                          </button>
                        </div>
                      )}
                      {appliedSuggestions.has(suggestion.id) && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ATS Keyword Analysis</h2>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Keyword Match Score</span>
                  <span className="text-sm font-bold text-sky-600">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-sky-600 h-2 rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                    Found Keywords
                  </h3>
                  <div className="space-y-2">
                    {keywords.found.map((keyword) => (
                      <div key={keyword} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                        <span className="text-emerald-700">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    Missing Keywords
                  </h3>
                  <div className="space-y-2">
                    {keywords.missing.map((keyword) => (
                      <div key={keyword} className="flex items-center text-sm">
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-red-600">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Add Missing Keywords
              </button>
            </div>

            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Auto-Improve Resume</h2>
              <p className="text-sm text-gray-600 mb-4">
                Let our AI automatically optimize your resume with the following improvements:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Optimize for ATS compatibility
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Add quantifiable achievements
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Target specific job descriptions
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Enhance keyword density
                </li>
              </ul>
              <button
                onClick={handleAutoImprove}
                disabled={isAutoImproving}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAutoImproving ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Improving Resume...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Auto-Improve
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeImprovementPage;
