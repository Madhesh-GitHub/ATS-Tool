import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeBuilderService } from '../../services/resumeBuilderService';

export default function AddCertificatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const resumeService = new ResumeBuilderService();
  
  const [certificate, setCertificate] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "",
    doesNotExpire: false
  });
  
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Check if we're editing an existing certificate
  useEffect(() => {
    if (location.state?.editingCertificate) {
      setCertificate(location.state.editingCertificate);
      setIsEditing(true);
      setEditingIndex(location.state.editingIndex);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCertificate(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear expiry date if "does not expire" is checked
    if (name === 'doesNotExpire' && checked) {
      setCertificate(prev => ({
        ...prev,
        expiryDate: ''
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!certificate.title.trim()) {
      newErrors.title = "Certificate title is required";
    }
    
    if (!certificate.issuer.trim()) {
      newErrors.issuer = "Issuing organization is required";
    }
    
    if (!certificate.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    
    // Validate URL format if provided
    if (certificate.credentialUrl && !isValidUrl(certificate.credentialUrl)) {
      newErrors.credentialUrl = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Get existing certificates
      let existingCertificates = [];
      
      try {
        const userData = await resumeService.getUserData();
        if (userData.hasData) {
          const data = userData.data;
          const certMatch = data.match(/=== CERTIFICATIONS DATA ===\n([\s\S]*?)(?=\n=== |$)/);
          
          if (certMatch) {
            const certData = certMatch[1];
            const parsedCerts = JSON.parse(certData.split('certificates: ')[1] || '[]');
            existingCertificates = parsedCerts;
          }
        }
      } catch (parseError) {
        console.log('No existing certificates found, starting fresh');
      }

      // Add or update certificate
      if (isEditing && editingIndex !== null) {
        existingCertificates[editingIndex] = certificate;
      } else {
        existingCertificates.push(certificate);
      }

      // Save updated certificates
      await resumeService.saveResumeData('certifications', { 
        certificates: existingCertificates 
      });

      alert(`Certificate ${isEditing ? 'updated' : 'added'} successfully!`);
      navigate('/builder/CertificatePage');
      
    } catch (error) {
      console.error("Error saving certificate:", error);
      alert("Error saving certificate");
    }
  };

  const handleCancel = () => {
    navigate('/builder/CertificatePage');
  };

  return (
    <div className="p-20 w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1f4882] mb-6">
        {isEditing ? 'Edit Certificate' : 'Add Certificate'}
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-6">
          {/* Certificate Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Title *
            </label>
            <input
              type="text"
              name="title"
              value={certificate.title}
              onChange={handleInputChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Issuing Organization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization *
            </label>
            <input
              type="text"
              name="issuer"
              value={certificate.issuer}
              onChange={handleInputChange}
              placeholder="e.g., Amazon Web Services, Microsoft, Google"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.issuer ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.issuer && <p className="text-red-500 text-sm mt-1">{errors.issuer}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date *
              </label>
              <input
                type="date"
                name="issueDate"
                value={certificate.issueDate}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  errors.issueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={certificate.expiryDate}
                onChange={handleInputChange}
                disabled={certificate.doesNotExpire}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="doesNotExpire"
                    checked={certificate.doesNotExpire}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">This certificate does not expire</span>
                </label>
              </div>
            </div>
          </div>

          {/* Credential Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                name="credentialId"
                value={certificate.credentialId}
                onChange={handleInputChange}
                placeholder="e.g., ABC123XYZ"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential URL
              </label>
              <input
                type="url"
                name="credentialUrl"
                value={certificate.credentialUrl}
                onChange={handleInputChange}
                placeholder="https://..."
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  errors.credentialUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.credentialUrl && <p className="text-red-500 text-sm mt-1">{errors.credentialUrl}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={certificate.description}
              onChange={handleInputChange}
              placeholder="Brief description of what this certification covers..."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <button 
          onClick={handleCancel}
          className="text-gray-600 underline hover:text-gray-800"
        >
          ← Cancel
        </button>
        
        <div className="space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#1f4882] text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Update Certificate' : 'Save Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
}
