import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCertificatePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
  const { title, issuer, issueDate } = formData;

  if (!title.trim()) {
    alert("Certificate name is required.");
    return false;
  }
  if (!issuer.trim()) {
    alert("Issuing organization is required.");
    return false;
  }

  // Validate issueDate (MM/YYYY)
  const datePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!datePattern.test(issueDate.trim())) {
    alert("Issue date must be in MM/YYYY format.");
    return false;
  }
  // If expiryDate provided, validate it
  if (
    formData.expiryDate.trim() !== "" &&
    !datePattern.test(formData.expiryDate.trim()) &&
    formData.expiryDate.toLowerCase().trim() !== "no expiration"
  ) {
    alert(" Expiration date must be MM/YYYY or 'No Expiration'.");
    return false;
  }

  return true;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    // Save to backend first
    const res = await fetch('http://localhost:5000/api/resume-builder/save-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: 'certificates',
        data: formData,
      }),
    });

    const result = await res.json();
    console.log("Response:", result);

    if (res.ok) {
      // Navigate to preview instead of back to CertificatePage
      navigate('/builder/resume-preview');
    } else {
      alert("Failed to save");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error saving certificate");
  }
};


return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ATS Resume Checker</h1>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>Home</li>
            <li className="hover:text-indigo-600 cursor-pointer">Login</li>
            <li className="hover:text-indigo-600 cursor-pointer">Sign Up</li>
          </ul>
          <button className="md:hidden text-3xl text-indigo-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-3 text-gray-700 font-medium">
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => setMenuOpen(false)}>Home</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => setMenuOpen(false)}>Login</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => setMenuOpen(false)}>Sign Up</li>
          </ul>
        )}
      </nav>

      {/* Certificate Form */}
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-10 mb-10">
        <h1 className="text-xl font-bold text-indigo-600 mb-6">Add New Certificate</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Certificate Name*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Project Management Professional (PMP)"
                className="w-full mt-1 p-2 border rounded text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use the full, official name of the certification
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Issuing Organization*</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g., Project Management Institute"
                className="w-full mt-1 p-2 border rounded text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Issue Date*</label>
              <input
                type="text"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
                className="w-full mt-1 p-2 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Expiration Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YYYY or No Expiration"
                className="w-full mt-1 p-2 border rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Credential ID</label>
            <input
              type="text"
              name="credentialId"
              value={formData.credentialId}
              onChange={handleChange}
              placeholder="e.g., ABC123XYZ (optional)"
              className="w-full mt-1 p-2 border rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Credential URL</label>
            <input
              type="text"
              name="credentialUrl"
              value={formData.credentialUrl}
              onChange={handleChange}
              placeholder="https://... (optional)"
              className="w-full mt-1 p-2 border rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe what this certification represents..."
              className="w-full mt-1 p-2 border rounded text-sm"
              rows={4}
            ></textarea>
          </div>

          {/* Optimization Tips */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-indigo-600 mb-2">📘 ATS Optimization Tips</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-500">
              <li>Include the full name of certifications without abbreviations</li>
              <li>List certifications relevant to the job you're applying for</li>
              <li>Include credential IDs when available</li>
              <li>Use industry-standard names that ATS systems will recognize</li>
            </ul>
          </div>

          {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
            <button
              type="button" 
              onClick={() => navigate('/builder/CertificatePage')}
              className="px-5 py-2 bg-gray-200 border text-gray-800 rounded hover:opacity-80 transition"
            >
              Back to Certificates
            </button>
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="px-5 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Add & Go to Preview
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-10 mb-6">
        © 2025 ATS Resume Checker. All rights reserved.
      </div>
    </div>
  );
};

export default AddCertificatePage;
