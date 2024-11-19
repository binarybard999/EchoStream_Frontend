import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initializeSocket, joinCommunityRoom, leaveCommunityRoom, onNewMessage } from "../../utils/socket";
import { communityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMoreVertical } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    const [sending, setSending] = useState(false);

    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection and join room
        if (!socketRef.current) {
            socketRef.current = initializeSocket();
            joinCommunityRoom(communityId);
        }

        // Fetch community details and initial chats
        const fetchInitialData = async () => {
            try {
                const communityResponse = await communityService.getCommunityDetails(communityId);
                // console.log(communityResponse.data);
                setCommunity(communityResponse.data);

                const chatsResponse = await communityService.getCommunityChats(communityId, page);
                // console.log(chatsResponse.data);
                setMessages(chatsResponse.data.reverse());
            } catch (error) {
                toast.error("Failed to load community data.");
            }
        };

        fetchInitialData();

        // Listen for new messages
        onNewMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on unmount
        return () => {
            leaveCommunityRoom(communityId);
            socketRef.current = null;
        };
    }, [communityId]);

    const handleMenuToggle = () => setShowMenu(!showMenu);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "image") setImage(files[0]);
        if (name === "video") setVideo(files[0]);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() && !image && !video) return;

        try {
            setSending(true); // Disable send button and show loader
            let imageUrl = null;
            let videoUrl = null;

            // Upload image if selected
            if (image) {
                try {
                    const imageResponse = await communityService.uploadImageToChat(communityId, image);
                    imageUrl = imageResponse.data.url;
                } catch (error) {
                    toast.error("Failed to upload image.");
                    return; // Exit on image upload failure
                }
            }

            // Upload video if selected
            if (video) {
                try {
                    const videoResponse = await communityService.uploadVideoToChat(communityId, video);
                    videoUrl = videoResponse.data.url;
                } catch (error) {
                    toast.error("Failed to upload video.");
                    return; // Exit on video upload failure
                }
            }

            // Prepare message data
            const messageData = {
                content: newMessage,
                image: imageUrl,
                video: videoUrl,
            };

            // Send the message
            const response = await communityService.sendMessage(communityId, messageData);
            socketRef.current.emit("sendMessage", response.data); // Broadcast to other users
            setMessages((prevMessages) => [...prevMessages, response.data]);

            toast.success("Message sent!");
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setSending(false); // Re-enable send button
            setNewMessage("");
            setImage(null);
            setVideo(null);
        }
    };


    const loadMoreChats = async () => {
        if (!loading) {
            setLoading(true);
            try {
                const response = await communityService.getCommunityChats(communityId, page + 1);
                // console.log(response.data);
                setMessages((prevMessages) => [...response.data.reverse(), ...prevMessages]);
                setPage((prevPage) => prevPage + 1);
            } catch (error) {
                toast.error("Failed to load older messages.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            {/* Header */}
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
                <FiMoreVertical
                    className="cursor-pointer text-2xl"
                    onClick={handleMenuToggle}
                />
                {showMenu && (
                    <div className="absolute right-0 top-12 bg-[#262626] rounded-md shadow-lg p-2 w-48">
                        <button
                            className="block w-full px-4 py-2 hover:bg-[#333333] text-left"
                            onClick={() => navigate(`/community/${communityId}`)}
                        >
                            View Community Details
                        </button>
                        <button
                            className="block w-full px-4 py-2 hover:bg-[#333333] text-left text-red-500"
                            onClick={() => navigate("/explore-communities")}
                        >
                            Leave Community
                        </button>
                    </div>
                )}
            </div>

            {/* Chat Messages */}
            <div className="bg-[#1a1a1d] rounded-lg p-4 h-[60vh] overflow-y-auto">
                {loading && <p className="text-center text-gray-400">Loading...</p>}
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-start mb-4">
                        <img
                            src={msg.sender?.avatar || "/default-avatar.png"}
                            alt={msg.sender?.username || "User"}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-semibold text-sm text-[#e473ff]">
                                {msg.sender?.username || "Unknown User"}
                            </p>
                            <p className="text-gray-500 text-xs">
                                {new Date(msg.createdAt).toLocaleString()}
                            </p>
                            <div className="bg-[#262626] text-white p-3 rounded-lg mt-1 shadow-md">
                                <p>{msg.content}</p>
                                {msg.image && <img src={msg.image} alt="Media" className="rounded-lg mt-2 w-48" />}
                                {msg.video && (
                                    <video controls className="mt-2 rounded-lg">
                                        <source src={msg.video} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center my-4">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-400" />
                </div>
            ) : (
                <button
                    onClick={loadMoreChats}
                    className="block mx-auto my-4 bg-[#e473ff] text-black px-4 py-2 rounded-lg"
                >
                    Load Older Messages
                </button>
            )}

            {/* Message Input */}
            <div className="flex items-center mt-4 space-x-2">
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
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-[#262626] p-3 rounded-lg"
                />
                <label htmlFor="image" className="cursor-pointer">
                    <FontAwesomeIcon icon={faImage} className="text-xl text-gray-400 hover:text-[#e473ff]" />
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label htmlFor="video" className="cursor-pointer">
                    <FontAwesomeIcon icon={faVideo} className="text-xl text-gray-400 hover:text-[#e473ff]" />
                </label>
                <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={sending}
                    className={`p-3 rounded-lg ${sending ? "bg-gray-500" : "bg-[#e473ff] hover:bg-[#6e2b7e]"}`}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}
