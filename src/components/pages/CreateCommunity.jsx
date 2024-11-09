import React, { useState } from "react";
import { communityService } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCommunity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) {
            toast.error("All fields are required!");
            return;
        }

        // Create JSON payload for text-based fields
        const communityData = {
            name,
            description,
        };

        setLoading(true); // Start loader

        try {
            // Create community without avatar initially
            const response = await communityService.createCommunity(communityData);
            const communityId = response.data._id;

            console.log(response);
            console.log(communityId);

            // If avatar is provided, upload it separately
            if (avatar) {
                const avatarData = new FormData();
                avatarData.append("avatar", avatar);
                await communityService.addCommunityAvatar(communityId, avatarData);
            }
            setName("");
            setDescription("");
            toast.success("Community created successfully! redirecting...");
            setTimeout(() => {
                navigate(`/community/${response.data.communityId}`);
            }, 2000);
        } catch (error) {
            toast.error("Failed to create community.");
        } finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#101010] text-white p-2 h-full md:ml-52 pt-16">
            <div className="w-full max-w-lg bg-[#1a1a1d] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold mb-4">Create a Community</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Community Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <textarea
                        placeholder="Community Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    ></textarea>
                    <label className="text-gray-400">
                        <span>Community Avatar</span>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-black file:font-bold hover:file:bg-[#6e2b7e]"
                            accept="image/*"
                        />
                    </label>
                    <button
                        type="submit"
                        className={`w-full text-black py-4 rounded-lg font-bold transition duration-200 ${loading
                            ? "bg-[#6e2b7e] cursor-not-allowed"
                            : "bg-[#e473ff] hover:bg-[#6e2b7e]"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Community"}
                    </button>
                </form>
            </div>
        </div>
    );
}
