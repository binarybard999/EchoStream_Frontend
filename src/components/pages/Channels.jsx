import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Channels() {
    const [channels, setChannels] = useState([]); // State for user data
    const [page, setPage] = useState(1); // State to manage pagination
    const [loading, setLoading] = useState(false); // State for loader
    const [hasMore, setHasMore] = useState(true); // State to check if more data is available
    const [retry, setRetry] = useState(false); // State for retry button

    useEffect(() => {
        fetchChannels(page); // Fetch initial channels
    }, [page]);

    const fetchChannels = async (currentPage) => {
        try {
            setLoading(true); // Start loader
            setRetry(false); // Reset retry state
            const response = await userService.fetchUsers(currentPage, 10); // Fetch users with pagination
            // console.log(response);
            const newChannels = response.data.docs || [];

            // Avoid duplicates using a Set
            setChannels((prevChannels) => {
                const allChannels = [...prevChannels, ...newChannels];
                return Array.from(new Set(allChannels.map((channel) => channel._id))).map((id) =>
                    allChannels.find((channel) => channel._id === id)
                );
            });
            setHasMore(response.data.hasNextPage); // Check if more data is available
        } catch (error) {
            toast.error("Failed to fetch channels.");
            setRetry(true); // Show retry button on error
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const loadMoreChannels = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Increment page number
        }
    };

    return (
        <div className="bg-[#0d0d0f] p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-bold text-white mb-5">Channels</h1>

            {/* Featured Channels Section */}
            {channels.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl text-white mb-3">Featured Channels</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {channels.slice(0, 4).map((channel) => (
                            <Link
                                to={`/c/${channel.username}`}
                                key={channel._id}
                                className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                            >
                                <img
                                    src={channel.avatar || "https://dummyimage.com/100x100"}
                                    alt={channel.username}
                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                />
                                <p className="text-lg font-semibold truncate">{channel.username}</p>
                                <p className="text-gray-400 text-sm">{channel.fullName || "No subscribers yet"}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* All Channels Section */}
            <div>
                <h2 className="text-xl text-white mb-3">All Channels</h2>
                {channels.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {channels.map((channel) => (
                            <Link
                                to={`/c/${channel.username}`}
                                key={channel._id}
                                className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                            >
                                <img
                                    src={channel.avatar || "https://dummyimage.com/100x100"}
                                    alt={channel.username}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                />
                                <p className="text-lg font-semibold truncate">{channel.username}</p>
                                <p className="text-gray-400 text-sm">{channel.fullName || "No subscribers yet"}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-400 text-center mb-3">No channels found.</p>
                        <button
                            onClick={() => fetchChannels(page)} // Retry fetching channels
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && channels.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMoreChannels}
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Load More Channels
                        </button>
                    </div>
                )}
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center mt-6">
                    <p className="text-gray-400">Loading...</p>
                </div>
            )}
        </div>
    );
}
