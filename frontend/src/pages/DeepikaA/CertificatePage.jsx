import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CertificatePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const certificates = [
    {
      title: 'UI/UX Design Mastery',
      issuer: 'Graphic Design Institute',
      issueDate: 'May 2022',
      expiryDate: 'May 2025',
      description: 'Validates expertise in designing user-centered digital products.',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'AWS',
      issueDate: 'January 2023',
      expiryDate: 'No Expiration',
      description: 'Certification for designing and building data processing systems on AWS.',
    },
    {
      title: 'Data Science & Analytics',
      issuer: 'HP Life',
      issueDate: 'August 2021',
      expiryDate: 'August 2023',
      description: 'Demonstrates knowledge of data science principles and analytics techniques.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 w-full p-20">
    

      {/* Main Certificate Section */}
      <div className="">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#6366F1]">Certificates</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Add professional certifications to showcase your specialized knowledge and skills.
              </p>
            </div>
            <button 
            onClick={() => navigate('/builder/AddCertificatePage')}
            className="bg-[#6366F1] text-white px-4 py-2 rounded hover:bg-[#4F46E5] transition">
              Add Certificate
            </button>
          </div>

          {/* Certificate Cards */}
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-[#1F2937]">{cert.title}</h2>
                <p className="text-sm text-[#6B7280]">{cert.issuer}</p>
                <div className="flex items-center text-sm text-[#6B7280] mt-1">
                  <FaCalendarAlt className="mr-2 text-[#6B7280]" />
                  <span>
                    Issued: {cert.issueDate} &nbsp;•&nbsp; Expires: {cert.expiryDate}
                  </span>
                </div>
                <p className="text-sm text-[#1F2937] mt-2">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-[#6B7280] mt-10">
        © 2025 ATS Resume Checker. All rights reserved.
      </div>
    </div>
  );
};

export default CertificatePage;
