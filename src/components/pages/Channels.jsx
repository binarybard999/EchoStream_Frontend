// src/components/Channels.jsx
import React from "react";

export default function Channels() {
    const channelData = [
        {
            id: 1,
            name: "Channel 1",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "1.2M subscribers",
        },
        {
            id: 2,
            name: "Channel 2",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "500K subscribers",
        },
        {
            id: 3,
            name: "Channel 3",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "300K subscribers",
        },
        {
            id: 4,
            name: "Channel 4",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "1M subscribers",
        },
        {
            id: 5,
            name: "Channel 5",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "2M subscribers",
        },
        {
            id: 6,
            name: "Channel 6",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "800K subscribers",
        },
        {
            id: 7,
            name: "Channel 7",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "900K subscribers",
        },
        {
            id: 8,
            name: "Channel 8",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "1.5M subscribers",
        },
        {
            id: 9,
            name: "Channel 9",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "750K subscribers",
        },
        {
            id: 10,
            name: "Channel 10",
            avatar: "https://dummyimage.com/100x100",
            subscribers: "1.3M subscribers",
        },
    ];

    // Select the first 4 channels as featured channels
    const featuredChannels = channelData.slice(0, 4);
    // Remaining channels after the featured ones
    // const remainingChannels = channelData.slice(4);

    return (
        <div className="bg-[#0d0d0f] p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-bold text-white mb-5">Channels</h1>

            {/* Featured Channels Section */}
            <div className="mb-8">
                <h2 className="text-xl text-white mb-3">Featured Channels</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {featuredChannels.map((channel) => (
                        <div
                            key={channel.id}
                            className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                        >
                            <img
                                src={channel.avatar}
                                alt={channel.name}
                                className="w-24 h-24 rounded-full object-cover mb-2"
                            />
                            <p className="text-lg font-semibold truncate">{channel.name}</p>
                            <p className="text-gray-400 text-sm">{channel.subscribers}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Remaining Channels Section */}
            <div>
                <h2 className="text-xl text-white mb-3">All Channels</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {channelData.map((channel) => (
                        <div
                            key={channel.id}
                            className="flex flex-col items-center text-center text-white hover:bg-[#1c1d1f] p-3 rounded-lg shadow-lg"
                        >
                            <img
                                src={channel.avatar}
                                alt={channel.name}
                                className="w-20 h-20 rounded-full object-cover mb-2"
                            />
                            <p className="text-lg font-semibold truncate">{channel.name}</p>
                            <p className="text-gray-400 text-sm">{channel.subscribers}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
