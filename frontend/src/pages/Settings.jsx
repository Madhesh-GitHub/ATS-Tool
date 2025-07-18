import React, { useState } from "react";

const Settings = () => {
    const [isDark, setIsDark] = useState(false); // false = light, true = dark

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };
    return (
        <div className="p-6 mt-8">
            {/* Page Heading */}
            <h1 className="text-3xl font-bold text-[#4338ca]">Settings</h1>

            {/* Theme Change Card */}
            <div className="bg-gray-200 p-6 mt-6 rounded-lg shadow border border-gray-200 max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Theme</h2>

                {/* Toggle Switch */}
                <div className="flex items-center space-x-4">
                    <span className="text-md text-gray-700">Light</span>

                    <div
                        onClick={toggleTheme}
                        className={`w-14 h-8 flex items-center bg-gray-500 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
                    >
                        <div
                            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out 
                ${isDark ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </div>

                    <span className="text-md text-gray-700">Dark</span>
                </div>
            </div>
        </div>
    );
};

export default Settings;
