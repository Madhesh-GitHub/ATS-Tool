import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AchievementsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [awards, setAwards] = useState([]);

  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showAddAward, setShowAddAward] = useState(false);
  
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: '',
    keywords: ''
  });
  
  const [newAward, setNewAward] = useState({
    name: '',
    organization: '',
    date: '',
    level: '',
    description: ''
  });

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.date) {
      setAchievements([...achievements, {
        id: Date.now(),
        ...newAchievement
      }]);
      setNewAchievement({ title: '', date: '', description: '', keywords: '' });
      setShowAddAchievement(false);
    }
  };

  const handleAddAward = () => {
    if (newAward.name && newAward.organization) {
      setAwards([...awards, {
        id: Date.now(),
        ...newAward
      }]);
      setNewAward({ name: '', organization: '', date: '', level: '', description: '' });
      setShowAddAward(false);
    }
  };

  const removeAchievement = (id) => {
    setAchievements(achievements.filter(item => item.id !== id));
  };

  const removeAward = (id) => {
    setAwards(awards.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-beige">
      

      <div className="flex-1 p-6 pt-16 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h1>
            <p className="text-gray-600">
              Highlight your professional accomplishments, awards, and certifications to stand out to employers and ATS systems.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">ATS Optimization Tips</h2>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Use specific metrics and numbers to quantify your achievements</li>
              <li>• Include relevant keywords from the job description</li>
              <li>• List achievements in reverse chronological order</li>
              <li>• Focus on results and impact rather than responsibilities</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Professional Achievements</h2>
              <button
                onClick={() => setShowAddAchievement(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                Add Achievement
              </button>
            </div>

            <div className="p-6">
              {achievements.length === 0 && !showAddAchievement && (
                <div className="text-center py-8 text-gray-500">
                  No achievements added yet
                </div>
              )}

              {achievements.map((achievement) => (
                <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
                  <button
                    onClick={() => removeAchievement(achievement.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Title</label>
                      <input
                        type="text"
                        value={achievement.title}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={achievement.date}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={achievement.description}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 h-20"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={achievement.keywords}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              ))}

              {showAddAchievement && (
                <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Achievement</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={newAchievement.title}
                      onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g. June 2022)"
                      value={newAchievement.date}
                      onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <textarea
                    placeholder="Description"
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md h-20 mb-4"
                  />

                  <input
                    type="text"
                    placeholder="Keywords (comma separated)"
                    value={newAchievement.keywords}
                    onChange={(e) => setNewAchievement({ ...newAchievement, keywords: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAchievement}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddAchievement(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
              <button
                onClick={() => setShowAddAward(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Award
              </button>
            </div>

            <div className="p-6">
              {awards.length === 0 && !showAddAward && (
                <div className="text-center py-8 text-gray-500">
                  No awards added yet
                </div>
              )}

              {awards.map((award) => (
                <div key={award.id} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
                  <button
                    onClick={() => removeAward(award.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>

                  <p className="font-medium text-gray-800">{award.name}</p>
                  <p className="text-sm text-gray-600">{award.organization} — {award.date} ({award.level})</p>
                  <p className="text-sm mt-2 text-gray-700">{award.description}</p>
                </div>
              ))}

              {showAddAward && (
                <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Award</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Award Name"
                      value={newAward.name}
                      onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Organization"
                      value={newAward.organization}
                      onChange={(e) => setNewAward({ ...newAward, organization: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Date (e.g. November 2022)"
                    value={newAward.date}
                    onChange={(e) => setNewAward({ ...newAward, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  />

                  <select
                    value={newAward.level}
                    onChange={(e) => setNewAward({ ...newAward, level: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  >
                    <option value="">Select Level</option>
                    <option>Company-wide</option>
                    <option>Department</option>
                    <option>Team</option>
                    <option>Regional</option>
                    <option>National</option>
                    <option>International</option>
                  </select>

                  <textarea
                    placeholder="Description"
                    value={newAward.description}
                    onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md h-20 mb-4"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAward}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddAward(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/skills" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">
              Back to Skills
            </Link>
            <Link to="/languages" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Continue to Languages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;