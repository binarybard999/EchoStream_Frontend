import React from "react";

export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex space-x-4 border-b border-gray-600">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`py-2 px-3 font-semibold transition-colors duration-200 ${activeTab === tab ? "text-[#e473ff] border-b-2 border-[#e473ff]" : "text-gray-400"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
