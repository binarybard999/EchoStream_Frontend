import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ChannelDetail() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("Videos");

    const channel = {
        id: 1,
        name: "Channel Name",
        username: "@channelname",
        subscribers: "1.5M subscribers",
        coverImage: "https://dummyimage.com/1280x300",
        avatar: "https://dummyimage.com/150x150",
        description:
            "This is a sample description of the channel. It gives a brief overview of what the channel is about.",
    };

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    const tabs = ["Videos", "Playlists", "Tweets", "Subscribed"];

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={channel.coverImage}
                    alt={`${channel.name} cover`}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-5 transform translate-y-1/2">
                    <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d0f]"
                    />
                </div>
            </div>

            {/* Channel Info */}
            <div className="mt-14 ml-36 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <p className="text-gray-400">{channel.username}</p>
                    <p className="text-gray-400">{channel.subscribers}</p>
                </div>
                <button
                    onClick={handleFollowToggle}
                    className={`px-3 py-2 font-bold shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]
                    ${isFollowing ? "bg-red-500 text-white" : "bg-[#e473ff] text-black"}`}
                >
                    <span className="ml-2">
                        <FontAwesomeIcon icon={isFollowing ? "fa-user-minus" : "fa-user-plus"} />
                    </span>
                    {isFollowing ? " Unfollow" : " Follow"}
                </button>

            </div>

            {/* Tabs */}
            <div className="mt-5">
                <div className="flex space-x-4 border-b border-gray-600">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-3 font-semibold transition-colors duration-200 ${activeTab === tab ? "text-[#e473ff] border-b-2 border-[#e473ff]" : "text-gray-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-5">
                    {activeTab === "Videos" && (
                        <div>
                            <p className="text-gray-300">This is where the videos will be displayed.</p>
                            {/* Add your video cards here */}
                        </div>
                    )}
                    {activeTab === "Playlists" && (
                        <div>
                            <p className="text-gray-300">This is where the playlists will be displayed.</p>
                            {/* Add your playlists here */}
                        </div>
                    )}
                    {activeTab === "Tweets" && (
                        <div>
                            <p className="text-gray-300">This is where tweets related to the channel will be displayed.</p>
                            {/* Add tweet content here */}
                        </div>
                    )}
                    {activeTab === "Subscribed" && (
                        <div>
                            <p className="text-gray-300">This is where subscribed channels or content will be displayed.</p>
                            {/* Add subscribed content here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
