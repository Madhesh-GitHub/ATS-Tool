import React, { useState, useEffect, useRef } from 'react';
import { Search, User, FileText, GraduationCap, Edit3, Award, Languages, Star, Download, Mail, Phone, MapPin, Calendar, CheckCircle, Globe, Briefcase } from 'lucide-react';




export default function ResumePreview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState('professional');

  const resumeData = {
    name: "Michael Anderson",
    title: "Senior Software Engineer",
    email: "michael.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "www.michaelanderson.dev",
    summary: "Passionate and Senior Software Engineer with 8+ years of experience developing scalable web applications and leading high-performing teams. Proven track record of delivering complex projects on time and within budget. Expertise in full-stack development, cloud technologies, and agile methodologies. Strong problem-solving skills and experience mentoring junior developers.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechFlow Inc.",
        location: "San Francisco, CA",
        period: "Jan 2020 - Present",
        responsibilities: [
          "Lead a team of 5 engineers in developing a microservices architecture that improved system scalability by 40%",
          "Implemented CI/CD pipelines reducing deployment time by 60% and increasing release frequency",
          "Collaborated with product managers and designers to deliver 15+ user-facing features",
          "Mentored junior developers and conducted technical interviews for engineering candidates"
        ]
      },
      {
        title: "Software Engineer",
        company: "DataSolutions LLC",
        location: "San Jose, CA",
        period: "May 2018 - Dec 2019",
        responsibilities: [
          "Developed RESTful APIs serving 20M+ requests per day using Node.js and Express",
          "Optimized database queries resulting in 35% performance improvement",
          "Collaborated with product and design teams to implement Machine based on user feedback"
        ]
      },
      {
        title: "Junior Developer",
        company: "WebSolutions LLC",
        location: "San Jose, CA",
        period: "Jun 2017 - Apr 2018",
        responsibilities: [
          "Built responsive web applications using JavaScript, HTML5, and CSS3",
          "Implemented user authentication and authorization systems",
          "Contributed to open-source projects and improved code quality and documentation"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Stanford University",
        location: "Stanford, CA",
        period: "2015 - 2017",
        details: "Specialization in Artificial Intelligence and Machine Learning"
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        period: "2011 - 2015",
        details: "Summa Cum Laude, GPA: 3.8/4.0"
      }
    ],
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 78 },
      { name: 'Python', level: 70 },
      { name: 'SQL', level: 88 },
      { name: 'Git', level: 80 }
    ],
    languages: [
      { name: 'English', level: 95 },
      { name: 'Spanish', level: 60 },
      { name: 'French', level: 40 }
    ],
    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
      { name: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
      { name: "MongoDB Certified Developer", issuer: "MongoDB", year: "2021" }
    ]
  };

  const templates = [
    { id: 'professional', name: 'Professional', selected: activeTemplate === 'professional' },
    { id: 'creative', name: 'Creative', selected: activeTemplate === 'creative' },
    { id: 'modern', name: 'Modern', selected: activeTemplate === 'modern' },
    { id: 'executive', name: 'Executive', selected: activeTemplate === 'executive' }
  ];

  // Calculate resume completion percentage
  const calculateCompletion = () => {
    const totalSections = 7; // Profile, Work, Education, Skills, etc.
    const completedSections = 6; // Example value - should come from state/store
    return Math.round((completedSections / totalSections) * 100);
  };

  // Calculate ATS score
  const calculateAtsScore = () => {
    const keywords = ['javascript', 'react', 'node.js', 'python', 'sql'];
    const foundKeywords = resumeData.skills.filter(skill => 
      keywords.includes(skill.name.toLowerCase())
    ).length;
    
    return Math.round((foundKeywords / keywords.length) * 100);
  };

  const completionPercentage = calculateCompletion();
  const atsScore = calculateAtsScore();

  // Refs for animations
  const completionBarRef = useRef(null);
  const atsCircleRef = useRef(null);

  useEffect(() => {
    // Animate completion bar after component mounts
    if (completionBarRef.current) {
      completionBarRef.current.style.width = `${completionPercentage}%`;
    }
    
    // Animate ATS circle
    if (atsCircleRef.current) {
      const radius = 28;
      const circumference = 2 * Math.PI * radius;
      const dashValue = (atsScore / 100) * circumference;
      
      // Set initial stroke properties
      atsCircleRef.current.setAttribute('stroke-dasharray', `${dashValue} ${circumference}`);
      atsCircleRef.current.setAttribute('stroke-dashoffset', '0');
    }
  }, [completionPercentage, atsScore]);

  const ProfessionalTemplate = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
            <p className="text-xl text-blue-100 mb-4">{resumeData.title}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {resumeData.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {resumeData.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {resumeData.location}
              </div>
            </div>
          </div>
          <div className="ml-8">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">Work Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-blue-600 font-medium mb-3">{exp.company}, {exp.location}</p>
                <ul className="text-gray-700 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>• {resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{edu.school}, {edu.location}</p>
                <p className="text-gray-700">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const CreativeTemplate = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-6 bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-shadow">{resumeData.name}</h1>
            <p className="text-xl text-pink-100 mb-4">{resumeData.title}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4 mr-2" />
                {resumeData.email}
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Phone className="w-4 h-4 mr-2" />
                {resumeData.phone}
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                {resumeData.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">About Me</h2>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed italic">{resumeData.summary}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{exp.period}</span>
                </div>
                <p className="text-purple-600 font-semibold mb-3">{exp.company} • {exp.location}</p>
                <ul className="text-gray-700 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-pink-500 mr-2">✦</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                  <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">{edu.period}</span>
                </div>
                <p className="text-purple-600 font-semibold mb-2">{edu.school}, {edu.location}</p>
                <p className="text-gray-700">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const ModernTemplate = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-8">
        <div className="flex items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-2">{resumeData.name}</h1>
            <p className="text-xl text-gray-300 mb-6">{resumeData.title}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                {resumeData.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                {resumeData.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                {resumeData.location}
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3 text-blue-400" />
                {resumeData.website}
              </div>
            </div>
          </div>
          <div className="ml-8">
            <div className="w-24 h-24 rounded-lg border-2 border-blue-400 shadow-lg bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{resumeData.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-400 rounded-full"></div>
                <div className="absolute left-2 top-4 w-px h-full bg-gray-200"></div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">{exp.period}</span>
                </div>
                <p className="text-blue-600 font-medium mb-3">{exp.company} • {exp.location}</p>
                <ul className="text-gray-600 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">▸</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-4 pb-2 border-b border-gray-200">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-4 h-4 bg-green-400 rounded-full"></div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">{edu.period}</span>
                </div>
                <p className="text-green-600 font-medium mb-2">{edu.school}, {edu.location}</p>
                <p className="text-gray-600">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const ExecutiveTemplate = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
          <p className="text-xl text-gray-300 mb-4">{resumeData.title}</p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {resumeData.email}
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {resumeData.phone}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {resumeData.location}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg">{resumeData.summary}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.company} • {exp.location}</p>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                </div>
                <ul className="text-gray-700 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <Briefcase className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                <p className="text-gray-600 font-medium mb-1">{edu.school}, {edu.location}</p>
                <p className="text-gray-500 text-sm mb-2">{edu.period}</p>
                <p className="text-gray-700">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'professional':
        return <ProfessionalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'modern':
        return <ModernTemplate />;
      case 'executive':
        return <ExecutiveTemplate />;
      default:
        return <ProfessionalTemplate />;
    }
  };

  return (
  <div className="flex min-h-screen bg-beige pt-16">
   

    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-sm border-b px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Resume Preview</h2>
            <p className="text-gray-600 text-sm mt-1">Review your completed resume and download in your preferred format</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Print
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {renderTemplate()}
            </div>
          </div>

          <div className="w-80 bg-white border-l border-gray-200 p-6 relative z-10">
            <div className="space-y-6">
              {/* Resume Completion */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Resume Completion</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall</span>
                  <span className="text-sm font-medium text-green-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    ref={completionBarRef}
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {completionPercentage === 100 
                    ? "Your resume is complete! Great work!" 
                    : "Complete all sections for better results"}
                </p>
              </div>

              {/* ATS Score */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">ATS Score</h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="relative w-16 h-16 z-0">
                    <svg className="w-16 h-16" viewBox="0 0 64 64">
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        stroke="#e5e7eb" 
                        strokeWidth="4" 
                        fill="none"
                      />
                      <circle 
                        ref={atsCircleRef}
                        cx="32" 
                        cy="32" 
                        r="28" 
                        stroke="#3b82f6" 
                        strokeWidth="4" 
                        fill="none"
                        strokeDasharray="0 176"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-600">
                      {atsScore}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  {atsScore > 80 
                    ? "Excellent ATS compatibility" 
                    : atsScore > 60 
                      ? "Good ATS compatibility" 
                      : "Needs improvement for ATS"}
                </p>
              </div>

              {/* Template Options */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Template Options</h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setActiveTemplate(template.id)}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        template.selected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{template.name}</span>
                        {template.selected && (
                          <span className="text-xs text-blue-600">Selected</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Progress */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Skills</h3>
                <div className="space-y-3">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Languages */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
                <div className="space-y-3">
                  {resumeData.languages.map((lang, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{lang.name}</span>
                        <span className="text-gray-500">{lang.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${lang.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Certificates</h3>
                <div className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {cert.name} - {cert.issuer} ({cert.year})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}