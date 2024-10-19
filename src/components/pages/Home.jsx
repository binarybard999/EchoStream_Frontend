// src/components/Home.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Home() {
    const thumbnailURL = "https://dummyimage.com/640x360";
    const channelURL = "https://dummyimage.com/100x100";
    const videoData = [
        {
            id: 1,
            title: "Video Title 1",
            thumbnail: thumbnailURL,
            channel: "Channel Name 1",
            views: "1.2M views",
            timestamp: "2 days ago",
        },
        {
            id: 2,
            title: "Video Title 2",
            thumbnail: thumbnailURL,
            channel: "Channel Name 2",
            views: "500K views",
            timestamp: "1 week ago",
        },
        {
            id: 3,
            title: "Video Title 3",
            thumbnail: thumbnailURL,
            channel: "Channel Name 3",
            views: "300K views",
            timestamp: "5 days ago",
        },
        {
            id: 4,
            title: "Video Title 4",
            thumbnail: thumbnailURL,
            channel: "Channel Name 4",
            views: "1M views",
            timestamp: "3 days ago",
        },
        {
            id: 5,
            title: "Video Title 5",
            thumbnail: thumbnailURL,
            channel: "Channel Name 5",
            views: "2M views",
            timestamp: "1 month ago",
        }
    ];

    const channelData = [
        {
            id: 1,
            name: "Channel 1",
            avatar: channelURL,
        },
        {
            id: 2,
            name: "Channel 2",
            avatar: channelURL,
        },
        {
            id: 3,
            name: "Channel 3",
            avatar: channelURL,
        },
        {
            id: 4,
            name: "Channel 4",
            avatar: channelURL,
        },
        {
            id: 5,
            name: "Channel 5",
            avatar: channelURL,
        },
        {
            id: 6,
            name: "Channel 6",
            avatar: channelURL,
        },
        {
            id: 7,
            name: "Channel 7",
            avatar: channelURL,
        },
        {
            id: 8,
            name: "Channel 8",
            avatar: channelURL,
        },
    ];

    const topVideos = videoData.slice(0, 4);

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
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {topVideos.map((video) => (
                        <Link
                            to="/view-video"
                            key={video.id}
                            className="hover:bg-[#1c1d1f] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-sm mx-auto"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <h2 className="text-white text-lg font-semibold mt-3 truncate">
                                {video.title}
                            </h2>
                            <p className="text-gray-400 text-sm">{video.channel}</p>
                            <p className="text-gray-500 text-sm">
                                {video.views} • {video.timestamp}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Channels Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl text-white">Featured Channels</h2>
                    <NavLink to="/channels" className="text-[#e473ff] hover:underline">
                        View More
                    </NavLink>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                    {channelData.map((channel) => (
                        <Link
                            to="/view-channel"
                            key={channel.id}
                            className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                        >
                            <img
                                src={channel.avatar}
                                alt={channel.name}
                                className="w-20 h-20 rounded-full object-cover mb-2"
                            />
                            <p className="truncate">{channel.name}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Remaining Videos Section */}
            <div>
                <h2 className="text-xl text-white mb-3">More Videos</h2>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {videoData.map((video) => (
                        <Link
                            to="/view-video"
                            key={video.id}
                            className="hover:bg-[#1c1d1f] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-sm mx-auto"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <h2 className="text-white text-lg font-semibold mt-3 truncate">
                                {video.title}
                            </h2>
                            <p className="text-gray-400 text-sm">{video.channel}</p>
                            <p className="text-gray-500 text-sm">
                                {video.views} • {video.timestamp}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
