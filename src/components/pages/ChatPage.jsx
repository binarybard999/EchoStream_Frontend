import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initializeSocket, joinCommunityRoom, leaveCommunityRoom, onNewMessage } from "../../utils/socket";
import { communityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMoreVertical } from "react-icons/fi";
import { faImage, faVideo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatPage() {
    const { communityId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [community, setCommunity] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef(null);

    const socket = initializeSocket();

    useEffect(() => {
        const fetchCommunityDetails = async () => {
            try {
                const response = await communityService.getCommunityDetails(communityId);
                setCommunity(response.data);
            } catch (error) {
                toast.error("Failed to fetch community details.");
            }
        };

        const fetchCommunityChats = async () => {
            setLoading(true);
            try {
                const response = await communityService.getCommunityChats(communityId, page);
                const chats = response?.data?.docs ? response.data.docs.reverse() : [];
                setMessages((prevMessages) => [...chats, ...prevMessages]);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch messages.");
                setLoading(false);
            }
        };

        fetchCommunityDetails();
        fetchCommunityChats();
        joinCommunityRoom(communityId);

        onNewMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            leaveCommunityRoom(communityId);
        };
    }, [communityId, page]);

    const handleMenuToggle = () => setShowMenu(!showMenu);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "image") setImage(files[0]);
        if (name === "video") setVideo(files[0]);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() && !image && !video) return;

        const messageData = {
            content: newMessage,
            image: image ? URL.createObjectURL(image) : null,  // Replace with actual URL if uploaded
            video: video ? URL.createObjectURL(video) : null,  // Replace with actual URL if uploaded
        };

        try {
            const response = await communityService.sendMessage(communityId, messageData);
            socket.emit("sendMessage", response);
            setMessages((prevMessages) => [...prevMessages, response]);
            setNewMessage("");
            setImage(null);
            setVideo(null);
        } catch (error) {
            toast.error("Failed to send message.");
        }
    };


    const loadMoreChats = () => {
        if (!loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleViewDetails = async () => {
        try {
            const response = await communityService.getCommunityDetails(communityId);
            console.log(response.data);
        } catch (error) {
            toast.error("Failed to load community details.");
        }
    };

    const handleLeaveCommunity = async () => {
        try {
            await communityService.leaveCommunity(communityId);
            toast.success("Left the community.");
            navigate("/explore-communities");
        } catch (error) {
            toast.error("Failed to leave the community.");
        }
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            {/* Header with Community Name and Menu */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    {community?.avatar && (
                        <img
                            src={community.avatar}
                            alt={`${community.name} avatar`}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                    )}
                    <h1 className="text-3xl font-semibold">{community?.name || "Community Name"}</h1>
                </div>
                <div className="relative">
                    <FiMoreVertical
                        className="cursor-pointer text-2xl"
                        onClick={handleMenuToggle}
                    />
                    {showMenu && (
                        <div className="absolute right-0 top-10 bg-[#262626] text-white rounded-md shadow-lg p-2 w-48">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-[#333333] rounded"
                                onClick={handleViewDetails}
                            >
                                View Community Details
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-[#333333] rounded text-red-500"
                                onClick={handleLeaveCommunity}
                            >
                                Leave Community
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div
                ref={chatBoxRef}
                className="bg-[#1a1a1d] rounded-lg p-4 h-[59vh] overflow-y-auto"
                onScroll={(e) => {
                    if (e.target.scrollTop === 0 && !loading) loadMoreChats();
                }}
            >
                {loading && <p className="text-center text-gray-400">Loading...</p>}
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-bold">{msg.username}</span>: {msg.content}
                        {msg.image && <img src={msg.image} alt="Attached" className="mt-2 w-32 rounded" />}
                        {msg.video && (
                            <video controls className="mt-2 w-32 rounded">
                                <source src={msg.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>

            {/* Message Input and File Uploads */}
            <div className="mt-4 flex flex-col space-y-2">
                {/* File Preview Area */}
                <div className="flex items-center space-x-2 bg-[#262626] p-2 rounded-lg overflow-x-auto mb-2">
                    {image && (
                        <div className="flex items-center space-x-2">
                            <img src={URL.createObjectURL(image)} alt="Selected" className="w-16 h-16 object-cover rounded-lg" />
                            <button
                                onClick={() => setImage(null)}
                                className="text-red-500 hover:text-red-700 text-xl"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    {video && (
                        <div className="flex items-center space-x-2">
                            <video controls className="w-16 h-16 rounded-lg">
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button
                                onClick={() => setVideo(null)}
                                className="text-red-500 hover:text-red-700 text-xl"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full bg-[#262626] text-white p-3 rounded-lg focus:outline-none"
                        placeholder="Type your message..."
                    />

                    {/* File Upload Icons and Send Button */}
                    <div className="flex items-center space-x-4">
                        {/* Image Upload Icon */}
                        <label htmlFor="image" className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faImage}
                                className="text-gray-400 hover:text-[#e473ff] text-xl"
                            />
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />

                        {/* Video Upload Icon */}
                        <label htmlFor="video" className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faVideo}
                                className="text-gray-400 hover:text-[#e473ff] text-xl"
                            />
                        </label>
                        <input
                            type="file"
                            name="video"
                            id="video"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="video/*"
                        />

                        {/* Send Button */}
                        <button
                            onClick={handleSendMessage}
                            className="bg-[#e473ff] text-white p-2 rounded-full hover:bg-[#6e2b7e] transition"
                        >
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="text-white text-xl"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
