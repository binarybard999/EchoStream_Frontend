import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subscriptionService, userService, videoService, tweetService, playlistService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChannelDetail() {
    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // For redirection
    const [channel, setChannel] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [isOwnChannel, setIsOwnChannel] = useState(false); // Check if it's the logged-in user's channel
    const [activeTab, setActiveTab] = useState("Videos");
    const [tabContent, setTabContent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChannelDetails = async () => {
            try {
                const response = await userService.getUserChannelProfile(username);
                const user = await userService.getCurrentUser();
                setChannel(response.data);
                setCurrentUser(user.data);
                // console.log(user.data);
                
                // Check if the current user owns this channel
                const loggedInUserId = user.data.username; // Replace with your auth method
                setIsOwnChannel(loggedInUserId === response.data.username);
                
                setIsFollowing(response.data.isSubscribed);

            } catch (error) {
                toast.error("Failed to load channel details.");
            }
        };
        fetchChannelDetails();
    }, [username]);

    useEffect(() => {
        const fetchTabContent = async () => {
            setLoading(true);
            try {
                let response;
                if (activeTab === "Videos") {
                    response = await videoService.getVideosByChannel(channel._id);
                } else if (activeTab === "Playlists") {
                    response = await playlistService.getPlaylistsByChannel(channel._id);
                } else if (activeTab === "Tweets") {
                    response = await tweetService.getTweetsByChannel(channel._id);
                } else if (activeTab === "Subscribed") {
                    response = await subscriptionService.getSubscribedChannels(channel._id);
                }
                setTabContent(response.data || []);
            } catch (error) {
                toast.error(`Failed to load ${activeTab.toLowerCase()}.`);
            } finally {
                setLoading(false);
            }
        };
        if (channel._id) {
            fetchTabContent();
        }
    }, [activeTab, channel]);

    const handleFollowToggle = async () => {
        try {
            await subscriptionService.toggleSubscription(channel._id);
            setIsFollowing((prev) => !prev);
        } catch (error) {
            toast.error("Failed to update subscription.");
        }
    };

    const handleViewProfile = () => {
        navigate("/my-channel"); // Redirect to the logged-in user's channel
    };

    const tabs = ["Videos", "Playlists", "Tweets", "Subscribed"];

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={channel.coverImage || "https://dummyimage.com/1280x300"}
                    alt={`${channel.name} cover`}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-5 transform translate-y-1/2">
                    <img
                        src={channel.avatar || "https://dummyimage.com/150x150"}
                        alt={channel.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d0f]"
                    />
                </div>
            </div>

            {/* Channel Info */}
            <div className="mt-14 ml-36 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{channel.fullName || "Channel Name"}</h1>
                    <p className="text-gray-400">{channel.username || "@username"}</p>
                    <p className="text-gray-400">{channel.subscribers || "0 subscribers"}</p>
                    <p className="text-gray-400">{channel.description || "No description available."}</p>
                </div>
                {isOwnChannel ? (
                    <button
                        onClick={handleViewProfile}
                        className="px-3 py-2 font-bold rounded-md shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] bg-[#e473ff] text-black"
                    >
                        View Profile
                    </button>
                ) : (
                    <button
                        onClick={handleFollowToggle}
                        className={`px-3 py-2 font-bold rounded-md shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]
                        ${isFollowing ? "bg-red-500 text-white" : "bg-[#e473ff] text-black"}`}
                    >
                        <span className="ml-2">
                            <FontAwesomeIcon icon={isFollowing ? "fa-user-minus" : "fa-user-plus"} />
                        </span>
                        {isFollowing ? " Unfollow" : " Follow"}
                    </button>
                )}
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
                    {loading ? (
                        <p className="text-center text-gray-400">Loading {activeTab.toLowerCase()}...</p>
                    ) : tabContent.length > 0 ? (
                        tabContent.map((item) => (
                            <div key={item._id} className="bg-[#1c1d1f] p-4 rounded-lg mb-4">
                                {activeTab === "Videos" && (
                                    <>
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </>
                                )}
                                {activeTab === "Playlists" && (
                                    <>
                                        <h3 className="text-lg font-bold">{item.name}</h3>
                                        <p className="text-gray-400">{item.videoCount} videos</p>
                                    </>
                                )}
                                {activeTab === "Tweets" && <p className="text-gray-400">{item.content}</p>}
                                {activeTab === "Subscribed" && (
                                    <>
                                        <h3 className="text-lg font-bold">{item.name}</h3>
                                        <p className="text-gray-400">{item.subscribers} subscribers</p>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">No {activeTab.toLowerCase()} found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
