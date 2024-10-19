import React from "react";
import { Link } from "react-router-dom";

export default function Videos() {
    const thumbnailURL = "https://dummyimage.com/640x360";
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
        },
    ];

    const topVideos = videoData.slice(0, 4);
    // const remainingVideos = videoData.slice(4);

    return (
        <div className="bg-[#0d0d0f] p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-bold text-white mb-5">Videos</h1>

            {/* Top Videos Section */}
            <div className="mb-8">
                <h2 className="text-xl text-white mb-3">Top Videos</h2>
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
