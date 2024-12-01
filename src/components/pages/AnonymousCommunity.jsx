import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { anonymousCommunityService } from "../../api"; // Import the service for API calls

export default function AnonymousCommunity() {
    const [communityName, setCommunityName] = useState("");
    const [anonymousUsername, setAnonymousUsername] = useState("");
    const navigate = useNavigate();

    const handleJoinCommunity = async () => {
        if (!communityName.trim() || !anonymousUsername.trim()) {
            toast.error("Both community name and username are required!");
            return;
        }

        // Sanitize inputs
        const sanitizedCommunityName = communityName.replace(/\s+/g, "_").toLowerCase();
        const sanitizedUsername = anonymousUsername.replace(/\s+/g, "_").toLowerCase();

        try {
            // Call the API to create or join the community
            const response = await anonymousCommunityService.createOrJoinAnonCommunity(
                sanitizedCommunityName,
                sanitizedUsername
            );

            // Navigate to the community chat page with the sanitized community name
            navigate(`/anonymous/${sanitizedCommunityName}`);
            toast.success(response.message || "Successfully joined the community!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to join or create the community.");
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#101010] text-white p-2 h-full md:ml-52 pt-16">
            <div className="w-full max-w-lg bg-[#1a1a1d] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold mb-4">Join or Create Anonymous Community</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleJoinCommunity();
                    }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Enter Community Name"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Choose Anonymous Username"
                        value={anonymousUsername}
                        onChange={(e) => setAnonymousUsername(e.target.value)}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#e473ff] text-black font-bold py-4 rounded-lg hover:bg-[#6e2b7e] transition duration-200"
                    >
                        Join Community
                    </button>
                </form>
            </div>
        </div>
    );
}
