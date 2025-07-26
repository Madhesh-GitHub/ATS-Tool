import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ResumeBuilderService } from '../../services/resumeBuilderService';

const CertificatePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const resumeService = new ResumeBuilderService();
  
  const [certificates, setCertificates] = useState([]);

  // Load existing certificates on component mount
  useEffect(() => {
    loadExistingCertificates();
  }, []);

  const loadExistingCertificates = async () => {
    try {
      const userData = await resumeService.getUserData();
      
      if (userData.hasData) {
        const data = userData.data;
        const certMatch = data.match(/=== CERTIFICATIONS DATA ===\n([\s\S]*?)(?=\n=== |$)/);
        
        if (certMatch) {
          const certData = certMatch[1];
          try {
            // Parse certificates if they're stored as JSON
            const parsedCerts = JSON.parse(certData.split('certificates: ')[1] || '[]');
            setCertificates(parsedCerts);
          } catch (parseError) {
            console.log('Could not parse existing certificates');
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing certificates:', error);
    }
  };

  const handleCertificateAdded = (newCertificate) => {
    setCertificates(prev => [...prev, newCertificate]);
  };

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const editCertificate = (index) => {
    const cert = certificates[index];
    // Navigate to add page with certificate data for editing
    navigate('/builder/AddCertificatePage', { 
      state: { 
        editingCertificate: cert, 
        editingIndex: index 
      } 
    });
  };

  const handleSave = async () => {
    try {
      await resumeService.saveResumeData('certifications', { certificates });
      alert("Certificates saved successfully!");
    } catch (error) {
      console.error("Error saving certificates:", error);
      alert("Error saving certificates");
    }
  };

  const handleContinue = async () => {
    try {
      await resumeService.saveResumeData('certifications', { certificates });
      alert("Certificates saved successfully!");
      navigate("/builder/resume-preview");
    } catch (error) {
      console.error("Error saving certificates:", error);
      alert("Error saving certificates");
    }
  };

  const handleSkip = async () => {
    try {
      // Save empty certificates data
      await resumeService.saveResumeData('certifications', { certificates: [] });
      navigate("/builder/resume-preview");
    } catch (error) {
      console.error("Error skipping certificates:", error);
      alert("Error proceeding to next step");
    }
  };

  return (
    <div className="p-20 w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1f4882] mb-6">Certifications & Licenses</h1>
      
      {/* Add Certificate Button */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Professional Certifications</h2>
        <p className="text-gray-600 mb-4">
          Add your professional certifications, licenses, and training programs to showcase your expertise.
        </p>
        <button
          onClick={() => navigate('/builder/AddCertificatePage')}
          className="bg-[#1f4882] text-white px-6 py-3 rounded-md hover:bg-blue-700 text-lg"
        >
          + Add Certificate
        </button>
      </div>

      {/* Certificates List */}
      {certificates.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#1f4882]">Your Certificates</h2>
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{cert.title}</h3>
                    <p className="text-blue-600 font-medium">{cert.issuer}</p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      {cert.issueDate && (
                        <p><span className="font-medium">Issued:</span> {cert.issueDate}</p>
                      )}
                      {cert.expiryDate && (
                        <p><span className="font-medium">Expires:</span> {cert.expiryDate}</p>
                      )}
                      {cert.credentialId && (
                        <p><span className="font-medium">Credential ID:</span> {cert.credentialId}</p>
                      )}
                      {cert.credentialUrl && (
                        <p>
                          <span className="font-medium">URL:</span> 
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline ml-1">
                            View Certificate
                          </a>
                        </p>
                      )}
                    </div>
                    {cert.description && (
                      <p className="mt-2 text-gray-700">{cert.description}</p>
                    )}
                  </div>
                  <div className="ml-4 space-x-2">
                    <button
                      onClick={() => editCertificate(index)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeCertificate(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <button
              onClick={() => navigate('/builder/AddCertificatePage')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              + Add Another Certificate
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button 
          onClick={() => navigate('/builder/achievements')}
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Achievements
        </button>
        
        <div className="space-x-4">
          <button
            onClick={handleSkip}
            className="text-gray-600 underline hover:text-gray-800"
          >
            Skip This Step
          </button>
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
            Continue to Preview →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
