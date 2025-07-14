import React from "react";

export default function PersonalInformation() {
  return (
    <div className="min-h-screen bg-[#f9f4ef] flex flex-col items-center py-8">
      {/* Header */}
      <header className="w-full max-w-4xl px-4 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#5a4b81]">AI Resume Builder</h1>
        <button className="bg-[#5a4b81] text-white px-4 py-2 rounded-lg">New Resume</button>
      </header>

      {/* Form Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[#5a4b81] mb-4">Personal Information</h2>
        <p className="text-gray-600 mb-4">
          Complete your contact details to help recruiters reach you easily.
        </p>

        {/* ATS Optimization Tip */}
        <div className="bg-[#f0f4ff] border-l-4 border-[#5a4b81] p-4 mb-6">
          <p className="text-[#5a4b81] font-medium">ATS Optimization Tip</p>
          <p className="text-gray-700">
            Use your legal name and provide complete contact information. ATS systems scan for these details first to match you with the right position. Clear, concise personal details improve your resume’s visibility to recruiters.
          </p>
        </div>

        {/* Form Fields */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
            <input type="text" placeholder="Enter your first name" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
            <input type="text" placeholder="Enter your last name" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <input type="email" placeholder="name@example.com" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input type="tel" placeholder="+1 (555) 123-4567" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>

          {/* LinkedIn & Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
            <input type="url" placeholder="linkedin.com/in/yourprofile" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
            <input type="url" placeholder="yourwebsite.com" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>

          {/* Professional Headline */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Headline</label>
            <input type="text" placeholder="e.g., Senior Marketing Manager with 8+ years of experience" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>

          {/* Address Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-[#5a4b81] mt-4 mb-2">Address Information</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input type="text" placeholder="123 Main Street" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apartment/Suite</label>
            <input type="text" placeholder="Apt #4B" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
            <input type="text" placeholder="New York" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
            <input type="text" placeholder="NY" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code*</label>
            <input type="text" placeholder="10001" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
            <input type="text" placeholder="United States" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a4b81]" />
          </div>

          {/* Checkboxes */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              I am open to remote work opportunities
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              I am willing to relocate
            </label>
          </div>

          {/* Progress and Buttons */}
          <div className="md:col-span-2 flex flex-col space-y-4 mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#5a4b81] h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-sm text-gray-700">75% Complete - 3/4 Required Fields</p>
            <div className="flex justify-between">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Back to Dashboard</button>
              <div className="flex gap-2">
                <button className="bg-[#5a4b81] text-white px-4 py-2 rounded-lg">Next: Work Experience</button>
                <button className="bg-[#5a4b81] text-white px-4 py-2 rounded-lg">Save Progress</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
