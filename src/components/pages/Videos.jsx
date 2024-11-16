import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { videoService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Videos() {
    const [videos, setVideos] = useState([]); // State for videos
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loader state
    const [hasMore, setHasMore] = useState(true); // Check if more videos are available
    const [retry, setRetry] = useState(false); // Retry state

    useEffect(() => {
        fetchVideos(page); // Fetch videos on page load or when page changes
    }, [page]);

    const fetchVideos = async (currentPage) => {
        try {
            setLoading(true);
            setRetry(false); // Reset retry state

            const response = await videoService.getAllVideos(currentPage, 10); // Fetch videos from API
            const newVideos = response.statusCode.docs || [];

            // Update videos state without duplication
            setVideos((prevVideos) => {
                const allVideos = [...prevVideos, ...newVideos];
                return Array.from(new Set(allVideos.map((video) => video._id))).map((id) =>
                    allVideos.find((video) => video._id === id)
                );
            });

            setHasMore(response.data.hasNextPage); // Update "hasMore" state
        } catch (error) {
            toast.error("Failed to fetch videos.");
            setRetry(true); // Show retry button on error
        } finally {
            setLoading(false);
        }
    };

    const loadMoreVideos = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const retryFetch = () => {
        fetchVideos(page);
    };

    return (
        <div className="bg-[#0d0d0f] p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-bold text-white mb-5">Videos</h1>

            {/* Top Videos Section */}
            {videos.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl text-white mb-3">Top Videos</h2>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videos.slice(0, 4).map((video) => (
                            <Link
                                to={`/v/${video._id}`}
                                key={video._id}
                                className="hover:bg-[#1c1d1f] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-sm mx-auto"
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={video.thumbnail || "https://dummyimage.com/640x360"}
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex items-center mt-2">
                                    <img
                                        src={video.ownerDetails?.avatar || "https://dummyimage.com/100x100"}
                                        alt={video.ownerDetails?.username || "Unknown User"}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <h2 className="text-white text-lg font-semibold truncate">
                                            {video.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm">{video.ownerDetails?.username || "Unknown Channel"}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">
                                    {video.views || "0 views"} • {new Date(video.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* More Videos Section */}
            <div>
                <h2 className="text-xl text-white mb-3">More Videos</h2>
                {videos.length > 4 ? (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videos.slice(4).map((video) => (
                            <Link
                                to={`/v/${video._id}`}
                                key={video._id}
                                className="hover:bg-[#1c1d1f] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-sm mx-auto"
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={video.thumbnail || "https://dummyimage.com/640x360"}
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex items-center mt-2">
                                    <img
                                        src={video.ownerDetails?.avatar || "https://dummyimage.com/100x100"}
                                        alt={video.ownerDetails?.username || "Unknown User"}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <h2 className="text-white text-lg font-semibold truncate">
                                            {video.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm">{video.ownerDetails?.username || "Unknown Channel"}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">
                                    {video.views || "0 views"} • {new Date(video.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-400 text-center mb-3">No videos found.</p>
                        {retry && (
                            <button
                                onClick={retryFetch}
                                className="bg-[#e473ff] text-black py-2 px-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200 text-sm"
                            >
                                Retry
                            </button>
                        )}
                    </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && videos.length > 4 && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMoreVideos}
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Load More Videos
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
