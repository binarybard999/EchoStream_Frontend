import React, { useEffect, useState } from "react";
import { communityService } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function ExploreCommunities() {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joinedCommunities, setJoinedCommunities] = useState([]); // Track joined communities
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                setLoading(true);

                // Fetch all communities and user-joined communities in parallel
                const [communityResponse, joinedResponse] = await Promise.all([
                    communityService.listAllCommunities(),
                    communityService.getUserJoinedCommunities() // Fetch all joined communities at once
                ]);

                // Set communities state
                setCommunities(communityResponse.data.docs || []);

                // Set joined communities state with just community IDs
                setJoinedCommunities(joinedResponse.data.map((community) => community._id));
            } catch (error) {
                toast.error("Failed to fetch communities.");
            } finally {
                setLoading(false);
            }
        };
        fetchCommunities();
    }, []);

    const handleJoinCommunity = async (communityId) => {
        try {
            const response = await communityService.joinCommunity(communityId);
            if (response.alreadyJoined) {
                toast.info("Already a member of this community.");
            } else {
                toast.success("Successfully joined the community!");
                setJoinedCommunities([...joinedCommunities, communityId]); // Update state immediately
                setTimeout(() => {
                    navigate(`/community/${communityId}`);
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to join the community.");
        }
    };

    const isCommunityJoined = (communityId) => {
        return joinedCommunities.includes(communityId);
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-semibold mb-6">Explore Communities</h1>

            {/* Loader */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {communities.length > 0 ? (
                        communities.map((community) => (
                            <div key={community._id} className="bg-[#262626] rounded-lg p-4 text-center">
                                <h2 className="text-xl font-bold">{community.name}</h2>
                                <p className="text-gray-400 mb-4">{community.description}</p>
                                <div className="flex space-x-2 justify-center">
                                    <button
                                        className={`py-2 px-4 rounded-md transition ${isCommunityJoined(community._id)
                                            ? "bg-[#6e2b7e] cursor-not-allowed text-black font-bold"
                                            : "bg-[#e473ff] hover:bg-[#6e2b7e] text-black font-bold"
                                            }`}
                                        onClick={() => !isCommunityJoined(community._id) && handleJoinCommunity(community._id)}
                                        disabled={isCommunityJoined(community._id)}
                                    >
                                        {isCommunityJoined(community._id) ? "Joined" : "Join Community"}
                                    </button>
                                    {/* Navigate to Chat Page button */}
                                    {isCommunityJoined(community._id) && (
                                        <button
                                            className="bg-[#e473ff] hover:bg-[#6e2b7e] text-black font-bold py-2 px-4 rounded-md transition"
                                            onClick={() => navigate(`/community/${community._id}`)}
                                        >
                                            Go to Chat
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No communities found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
