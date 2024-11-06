import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlusCircle, faCompass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function CommunityHub() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center bg-[#101010] text-white p-2 h-full md:ml-52 pt-16">
            <div className="w-full max-w-4xl bg-[#1a1a1d] rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center mb-6">Community Hub</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Create Community */}
                    <div
                        className="bg-[#262626] rounded-lg p-6 flex flex-col items-center cursor-pointer"
                        onClick={() => navigate("/create-community")}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} className="text-4xl text-[#e473ff] mb-4" />
                        <h2 className="text-2xl font-bold">Create a Community</h2>
                    </div>

                    {/* Explore Communities */}
                    <div
                        className="bg-[#262626] rounded-lg p-6 flex flex-col items-center cursor-pointer"
                        onClick={() => navigate("/explore-communities")}
                    >
                        <FontAwesomeIcon icon={faCompass} className="text-4xl text-[#e473ff] mb-4" />
                        <h2 className="text-2xl font-bold">Explore Communities</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
