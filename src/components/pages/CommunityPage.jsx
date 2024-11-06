import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { communityService } from "../../api"; // Make sure to implement community API services
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommunityPage() {
    const [communityName, setCommunityName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const navigate = useNavigate();

    // Handle creating a community
    const handleCreateCommunity = async (e) => {
        e.preventDefault();
        if (!communityName.trim()) {
            toast.error("Community name is required!");
            return;
        }
        try {
            const response = await communityService.createCommunity({ name: communityName });
            toast.success("Community created successfully!");
            navigate(`/community/${response.data.communityId}`); // Redirect to the new community
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create community.");
        }
    };

    // Handle joining a community
    const handleJoinCommunity = async (e) => {
        e.preventDefault();
        if (!joinCode.trim()) {
            toast.error("Join code is required!");
            return;
        }
        try {
            const response = await communityService.joinCommunity({ joinCode });
            toast.success("Joined community successfully!");
            navigate(`/community/${response.data.communityId}`); // Redirect to the joined community
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to join community.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#101010] text-white p-2 h-full md:ml-52 pt-16">
            <div className="w-full max-w-4xl bg-[#1a1a1d] rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center mb-6">Community Hub</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Create Community Section */}
                    <div className="bg-[#262626] rounded-lg p-6 flex flex-col items-center">
                        <FontAwesomeIcon icon={faPlusCircle} className="text-4xl text-[#e473ff] mb-4" />
                        <h2 className="text-2xl font-bold mb-4 text-center">Create a Community</h2>
                        <form onSubmit={handleCreateCommunity} className="w-full space-y-4">
                            <input
                                type="text"
                                placeholder="Community Name"
                                value={communityName}
                                onChange={(e) => setCommunityName(e.target.value)}
                                className="w-full bg-[#333] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#e473ff] text-white py-3 rounded-md font-bold hover:bg-[#6e2b7e] transition"
                            >
                                Create
                            </button>
                        </form>
                    </div>

                    {/* Join Community Section */}
                    <div className="bg-[#262626] rounded-lg p-6 flex flex-col items-center">
                        <FontAwesomeIcon icon={faUsers} className="text-4xl text-[#e473ff] mb-4" />
                        <h2 className="text-2xl font-bold mb-4 text-center">Join a Community</h2>
                        <form onSubmit={handleJoinCommunity} className="w-full space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Join Code"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                className="w-full bg-[#333] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#e473ff] text-white py-3 rounded-md font-bold hover:bg-[#6e2b7e] transition"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
