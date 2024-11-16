import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { videoService, userService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
    const [videos, setVideos] = useState([]); // All videos
    const [channels, setChannels] = useState([]); // All channels
    const [loadingVideos, setLoadingVideos] = useState(true); // Video loading state
    const [loadingChannels, setLoadingChannels] = useState(true); // Channel loading state
    const [retryVideos, setRetryVideos] = useState(false); // Retry for videos
    const [retryChannels, setRetryChannels] = useState(false); // Retry for channels

    const thumbnailURL = "https://dummyimage.com/640x360";
    const channelURL = "https://dummyimage.com/100x100";

    useEffect(() => {
        fetchVideos();
        fetchChannels();
    }, []);

    // Fetch videos
    const fetchVideos = async () => {
        try {
            setLoadingVideos(true);
            setRetryVideos(false);
            const response = await videoService.getAllVideos();
            setVideos(response.statusCode.docs || []); // Use `docs` if paginated
        } catch (error) {
            toast.error("Failed to load videos.");
            setRetryVideos(true);
        } finally {
            setLoadingVideos(false);
        }
    };

    // Fetch channels
    const fetchChannels = async () => {
        try {
            setLoadingChannels(true);
            setRetryChannels(false);
            const response = await userService.fetchUsers(1, 8); // Fetch top 8 channels
            setChannels(response.data.docs || []);
        } catch (error) {
            toast.error("Failed to load channels.");
            setRetryChannels(true);
        } finally {
            setLoadingChannels(false);
        }
    };

    // Top videos
    const topVideos = videos.slice(0, 4);

    return (
        <div className="bg-[#0d0d0f] p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-bold text-white mb-5">Home</h1>

            {/* Top Videos Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl text-white">Top Videos</h2>
                    <NavLink to="/videos" className="text-[#e473ff] hover:underline">
                        View More
                    </NavLink>
                </div>
                {loadingVideos ? (
                    <div className="text-center text-white">
                        <FaSpinner className="animate-spin" />
                    </div>
                ) : retryVideos ? (
                    <div className="text-center">
                        <button
                            onClick={fetchVideos}
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {topVideos.map((video) => (
                            <Link
                                to={`/view-video/${video._id}`}
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
                )}
            </div>

            {/* Featured Channels Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl text-white">Featured Channels</h2>
                    <NavLink to="/channels" className="text-[#e473ff] hover:underline">
                        View More
                    </NavLink>
                </div>
                {loadingChannels ? (
                    <div className="text-center text-white">
                        <FaSpinner className="animate-spin" />
                    </div>
                ) : retryChannels ? (
                    <div className="text-center">
                        <button
                            onClick={fetchChannels}
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                        {channels.map((channel) => (
                            <Link
                                to={`/view-channel/${channel._id}`}
                                key={channel._id}
                                className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                            >
                                <img
                                    src={channel.avatar || channelURL}
                                    alt={channel.username || "Channel"}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                />
                                <p className="truncate">{channel.username || "Unknown Channel"}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* More Videos Section */}
            <div>
                <h2 className="text-xl text-white mb-3">More Videos</h2>
                {loadingVideos ? (
                    <div className="text-center text-white">
                        <FaSpinner className="animate-spin" />
                    </div>
                ) : retryVideos ? (
                    <div className="text-center">
                        <button
                            onClick={fetchVideos}
                            className="bg-[#e473ff] text-black py-2 px-4 rounded-lg hover:bg-[#6e2b7e] transition duration-200 text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videos.slice(4).map((video) => (
                            <Link
                                to={`/view-video/${video._id}`}
                                key={video._id}
                                className="hover:bg-[#1c1d1f] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-sm mx-auto"
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={video.thumbnail || thumbnailURL}
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <h2 className="text-white text-lg font-semibold mt-3 truncate">
                                    {video.title}
                                </h2>
                                <p className="text-gray-400 text-sm">{video.channel || "Unknown Channel"}</p>
                                <p className="text-gray-500 text-sm">
                                    {video.views || "0 views"} • {video.createdAt || "Just now"}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
