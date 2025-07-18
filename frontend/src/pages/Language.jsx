import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Language = () => {
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([
        { language: 'English', proficiency: 'Native' },
    ]);

    const proficiencies = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

    const addLanguage = () => {
        setLanguages([...languages, { language: '', proficiency: 'Native' }]);
    };

    const updateLanguage = (index, field, value) => {
        const updated = [...languages];
        updated[index][field] = value;
        setLanguages(updated);
    };

    const deleteLanguage = (index) => {
        if (languages.length > 1) {
            const updated = [...languages];
            updated.splice(index, 1);
            setLanguages(updated);
        }
    };

    const handleBack = () => {
        navigate("/builder/achievements");
    };

    const handleNext = () => {
        navigate("/builder/CertificatePage");
    };

    return (
        <div className=" min-h-screen p-6 mt-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-[#4338ca]">Languages</h1>
                    <p className="text-gray-600 mt-1">
                        Add your language proficiencies to showcase your communication skills to potential employers.
                    </p>
                </div>

                {/* Language Form */}
                <div className="bg-white p-6 rounded shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg">Language Proficiency</h2>
                        <button
                            onClick={addLanguage}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            Add Language
                        </button>
                    </div>

                    {languages.map((entry, index) => (
                        <div
                            key={index}
                            className="grid md:grid-cols-3 gap-4 mb-4 bg-gray-100 p-4 rounded border border-gray-200 items-center"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">Language</label>
                                <input
                                    type="text"
                                    value={entry.language}
                                    onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="e.g., English"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Proficiency Level</label>
                                <select
                                    value={entry.proficiency}
                                    onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {proficiencies.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Delete Button*/}
                            {languages.length > 1 && (
                                <div className="flex justify-end self-start mt-6 md:mt-0">
                                    <button
                                        onClick={() => deleteLanguage(index)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ATS Tips */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">ATS Optimization Tips</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 shadow-sm">
                            <strong className="text-blue-600 block mb-1">Be Specific About Proficiency</strong>
                            <p>Use levels like “Native”, “Fluent”, “Advanced”, “Intermediate”, or “Basic”. Avoid “Good” or “Fair”.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 shadow-sm">
                            <strong className="text-blue-600 block mb-1">Match Job Requirements</strong>
                            <p>Mention languages from the job description first, especially for roles that require specific language skills.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 shadow-sm">
                            <strong className="text-blue-600 block mb-1">Include Certifications</strong>
                            <p>If you have certifications (TOEFL, IELTS, etc.), include them in the Certificates section.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 shadow-sm">
                            <strong className="text-blue-600 block mb-1">Highlight Relevant Experience</strong>
                            <p>Connect language skills to achievements — e.g., working with international teams.</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Language;