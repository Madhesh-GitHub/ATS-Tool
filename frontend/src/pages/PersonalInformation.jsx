import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeBuilderService } from '../services/resumeBuilderService';

export default function PersonalInformation() {
  const navigate = useNavigate();
  const resumeService = new ResumeBuilderService();
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    linkedIn: "", portfolio: "", headline: "",
    street: "", apartment: "", city: "", state: "",
    zip: "", country: "", remote: false, relocate: false,
  });
  const [errors, setErrors] = useState({});
  const [sessionId, setSessionId] = useState(null);

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const userData = await resumeService.getUserData();
      
      if (userData.hasData) {
        console.log('📊 Loading existing user data...');
        setSessionId(userData.sessionId);
        
        // Parse existing data and populate form
        const data = userData.data;
        const personalMatch = data.match(/=== PERSONAL DATA ===\n([\s\S]*?)(?=\n=== |$)/);
        
        if (personalMatch) {
          const personalData = personalMatch[1];
          const lines = personalData.split('\n').filter(line => line.trim());
          
          const parsedData = {};
          lines.forEach(line => {
            const [key, ...valueParts] = line.split(': ');
            const value = valueParts.join(': ').trim();
            
            if (key && value) {
              if (value === 'true') parsedData[key] = true;
              else if (value === 'false') parsedData[key] = false;
              else parsedData[key] = value;
            }
          });
          
          setFormData(prev => ({ ...prev, ...parsedData }));
          console.log('✅ Personal data loaded:', parsedData);
        }
      }
    } catch (error) {
      console.error('❌ Error loading existing data:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone format.";
    }

    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State/Province is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProgress = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    try {
      const result = await resumeService.saveResumeData('personal', formData);
      setSessionId(result.sessionId);
      alert("Personal information saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    try {
      const result = await resumeService.saveResumeData('personal', formData);
      setSessionId(result.sessionId);
      alert("Personal information saved successfully!");
      navigate("/builder/experience");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleStartFresh = async () => {
    if (confirm("This will clear all current form data. Are you sure?")) {
      try {
        await resumeService.startFreshSession();
        setFormData({
          firstName: "", lastName: "", email: "", phone: "",
          linkedIn: "", portfolio: "", headline: "",
          street: "", apartment: "", city: "", state: "",
          zip: "", country: "", remote: false, relocate: false,
        });
        setErrors({});
        setSessionId(null);
        alert("Form cleared! You can start fresh.");
      } catch (error) {
        console.error("Start fresh failed:", error);
        alert("Failed to clear data. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f4ef] flex flex-col items-center py-8">
      {/* Form Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#5a4b81] text-[30px]">
            Personal Information
          </h2>
          <button
            onClick={handleStartFresh}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
          >
            Start Fresh
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Complete your contact details to help recruiters reach you easily.
        </p>

        {/* ATS Optimization Tip */}
        <div className="bg-[#f0f4ff] border-l-4 border-[#5a4b81] p-4 mb-6">
          <p className="text-[#5a4b81] font-bold text-[20px]">
            ATS Optimization Tip
          </p>
          <p className="text-gray-700">
            Use your legal name and provide complete contact information. ATS
            systems scan for these details first to match you with the right
            position.
          </p>
        </div>

        {/* Form Fields */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>

          {/* LinkedIn & Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              placeholder="linkedin.com/in/yourprofile"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="yourwebsite.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
            />
          </div>

          {/* Professional Headline */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="e.g., Senior Marketing Manager"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
            />
          </div>

          {/* Address Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-[#5a4b81] mt-4 mb-2">Address Information</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="123 Main Street"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apartment/Suite</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="Apt #4B"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="NY"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code*</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="10001"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="United States"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]"
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="mr-2"
              />
              I am open to remote work opportunities
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="relocate"
                checked={formData.relocate}
                onChange={handleChange}
                className="mr-2"
              />
              I am willing to relocate
            </label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col space-y-6 mt-4">
            <div className="w-full">
              <h2 className="text-sm font-semibold text-[#5a4b81] mb-2">
                Section Completion
              </h2>

              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-700 whitespace-nowrap">
                  75% Complete
                </p>

                <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full relative overflow-hidden">
                  <div
                    className="h-2 bg-[#5a4b81] rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                <p className="text-xs text-gray-700 whitespace-nowrap">
                  3/4 Required Fields
                </p>

                {/* ✅ Fix: Pass event to handleNext */}
                <button 
                  className="ml-4 bg-[#5a4b81] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap hover:opacity-90" 
                  onClick={handleNext}
                >
                  Next: Work Experience
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm bg-white hover:bg-gray-100">
                Back to Dashboard
              </button>

              {/* ✅ Fix: Pass event to handleSaveProgress */}
              <button 
                className="bg-[#5a4b81] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90" 
                onClick={handleSaveProgress}
              >
                Save Progress
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
