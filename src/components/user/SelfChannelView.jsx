// src/components/SelfChannelDetail.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useIsLogin } from '../contexts/IsLoginContext.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

export default function SelfChannelDetail() {
    const [activeTab, setActiveTab] = useState("Videos");

    const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
    const [videoData, setVideoData] = useState({ title: "", description: "", videoFile: null, thumbnail: null });

    const [loading, setLoading] = useState(false);

    const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
    const [isAddTweetOpen, setIsAddTweetOpen] = useState(false);
    const [collectionData, setCollectionData] = useState({ name: "", description: "" });
    const [tweetData, setTweetData] = useState({ content: "" });

    const navigate = useNavigate();
    const { isLogin } = useIsLogin(); // Access login state

    const [channel, setChannel] = useState({
        name: '',
        username: '',
        subscribers: '',
        subscribed: '',
        coverImage: '',
        avatar: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //change it to fetch user channel info not current user details
                const response = await axios.get('/api/users/current-user', {}, { withCredentials: true });
                const userData = response.data.data;
                // console.log(userData);
                setChannel({
                    name: userData.fullName,
                    username: `@${userData.username}`,
                    subscribers: `${userData.subscribersCount || 0} subscribers`,
                    subscribed: `${userData.channelsSubscribedToCount || 0} subscribed`,
                    coverImage: userData.coverImage,
                    avatar: userData.avatar,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (isLogin) {
            fetchUserData();
        }
    }, [isLogin]);

    // Redirect to /login if the user is not logged in
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    const subscribedChannels = [
        { id: 1, name: "Channel 1", avatar: "https://dummyimage.com/100x100" },
        { id: 2, name: "Channel 2", avatar: "https://dummyimage.com/100x100" },
        { id: 3, name: "Channel 3", avatar: "https://dummyimage.com/100x100" },
    ];

    const tabs = ["Videos", "Collections", "Tweets", "Subscribed"];

    const handleEditProfile = () => {
        navigate("/profile-settings");
    };

    const handleAddVideoToggle = () => {
        setIsAddVideoOpen((prev) => !prev);
    };

    const handleAddCollectionToggle = () => {
        setIsAddCollectionOpen((prev) => !prev);
    };

    const handleAddTweetToggle = () => {
        setIsAddTweetOpen((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", videoData.title);
        formData.append("description", videoData.description);
        formData.append("videoFile", videoData.videoFile);
        formData.append("thumbnail", videoData.thumbnail);

        try {
            await axios.post("/api/videos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            toast.success("Video added successfully!");
            setIsAddVideoOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding video.");
            console.error("Error uploading video:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCollectionChange = (e) => {
        const { name, value } = e.target;
        setCollectionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTweetChange = (e) => {
        const { value } = e.target;
        setTweetData({ content: value });
    };

    const handleCollectionSubmit = (e) => {
        e.preventDefault();
        console.log("Collection submitted:", collectionData);
        setIsAddCollectionOpen(false);
    };

    const handleTweetSubmit = (e) => {
        e.preventDefault();
        console.log("Tweet submitted:", tweetData);
        setIsAddTweetOpen(false);
    };

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16">
            {/* Cover Image */}
            <div className="relative">
                <img src={channel.coverImage} alt={`${channel.name} cover`} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute bottom-0 left-5 transform translate-y-1/2">
                    <img src={channel.avatar} alt={channel.name} className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d0f]" />
                </div>
            </div>

            {/* Channel Info */}
            <div className="mt-14 ml-36 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <p className="text-gray-400">{channel.username}</p>
                    <p className="text-gray-400">{channel.subscribers} | {channel.subscribed}</p>
                </div>
                <button
                    onClick={handleEditProfile}
                    className="px-4 py-2 bg-[#e473ff] text-black font-bold rounded-md shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                >
                    <FontAwesomeIcon icon="fa-solid fa-user-edit" className="mr-2" />
                    Edit Profile
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
                            <div className="flex justify-between items-center mb-5">
                                <p className="text-gray-300">This is where your videos will be displayed.</p>
                                <button
                                    onClick={handleAddVideoToggle}
                                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                                >
                                    Add Video
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === "Collections" && (
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <p className="text-gray-300">This is where your collections will be displayed.</p>
                                <button
                                    onClick={handleAddCollectionToggle}
                                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                                >
                                    Add Collection
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === "Tweets" && (
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <p className="text-gray-300">This is where your tweets will be displayed.</p>
                                <button
                                    onClick={handleAddTweetToggle}
                                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                                >
                                    Add Tweet
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === "Subscribed" && (
                        <div>
                            <p className="text-gray-300 mb-5">Channels you are subscribed to:</p>
                            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                {subscribedChannels.map((sub) => (
                                    <div key={sub.id} className="flex items-center hover:bg-[#1c1d1f] p-3 rounded-lg">
                                        <img src={sub.avatar} alt={sub.name} className="w-12 h-12 rounded-full mr-3" />
                                        <div className="text-white">
                                            <h3 className="text-lg font-semibold">{sub.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Video Popup */}
            {isAddVideoOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Video</h2>
                        <form onSubmit={handleVideoSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={videoData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={videoData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Video File</label>
                                <input
                                    type="file"
                                    name="videoFile"
                                    onChange={handleFileChange}
                                    required
                                    accept="video/*"
                                    className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Thumbnail</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleFileChange}
                                    required
                                    accept="image/*"
                                    className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleAddVideoToggle}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Collection Popup */}
            {isAddCollectionOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Collection</h2>
                        <form onSubmit={handleCollectionSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Collection Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={collectionData.name}
                                    onChange={handleCollectionChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={collectionData.description}
                                    onChange={handleCollectionChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleAddCollectionToggle}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Tweet Popup */}
            {isAddTweetOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Tweet</h2>
                        <form onSubmit={handleTweetSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Tweet Content</label>
                                <textarea
                                    name="content"
                                    value={tweetData.content}
                                    onChange={handleTweetChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleAddTweetToggle}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
