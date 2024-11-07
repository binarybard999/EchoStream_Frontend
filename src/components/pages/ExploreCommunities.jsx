import React, { useEffect, useState } from "react";
import { communityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExploreCommunities() {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await communityService.listAllCommunities();

                // Log response data to check if it's an array
                console.log("Fetched communities data:", response.data);

                // Ensure communities is an array before setting state
                setCommunities(Array.isArray(response.data.docs) ? response.data.docs : []);
            } catch (error) {
                toast.error("Failed to fetch communities.");
            }
        };
        fetchCommunities();
    }, []);

    const handleJoinCommunity = async (communityId) => {
        try {
            await communityService.joinCommunity({ communityId });
            toast.success("Successfully joined the community!");
        } catch (error) {
            toast.error("Failed to join the community.");
        }
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-semibold mb-6">Explore Communities</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {communities.length > 0 ? (
                    communities.map((community) => (
                        <div key={community._id} className="bg-[#262626] rounded-lg p-4">
                            <h2 className="text-xl font-bold">{community.name}</h2>
                            <p className="text-gray-400 mb-4">{community.description}</p>
                            <button
                                className="bg-[#e473ff] text-white py-2 px-4 rounded-md hover:bg-[#6e2b7e] transition"
                                onClick={() => handleJoinCommunity(community._id)}
                            >
                                Join Community
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No communities found.</p>
                )}
            </div>
        </div>
    );
}
