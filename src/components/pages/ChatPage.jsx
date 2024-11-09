import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initializeSocket, joinCommunityRoom, leaveCommunityRoom, onNewMessage } from "../../utils/socket";
import { communityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatPage() {
    const { communityId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        const fetchCommunityDetails = async () => {
            try {
                const response = await communityService.getCommunityDetails(communityId);
                setCommunity(response.data);
            } catch (error) {
                toast.error("Failed to fetch community details.");
            }
        };

        fetchCommunityDetails();

        // Initialize socket and join community room
        const socket = initializeSocket();
        joinCommunityRoom(communityId);

        // Listen for new messages
        onNewMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            leaveCommunityRoom(communityId);
        };
    }, [communityId]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "image") setImage(files[0]);
        if (name === "video") setVideo(files[0]);
    };

    const sendMessage = () => {
        if (!newMessage.trim() && !image && !video) return;

        const messageData = {
            communityId,
            content: newMessage,
            image: image || null,
            video: video || null,
        };

        // Emit the message through the socket
        socket.emit("sendMessage", messageData);

        // Clear message and file inputs
        setNewMessage("");
        setImage(null);
        setVideo(null);
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            {/* Community Name and Avatar */}
            <div className="flex items-center mb-4">
                {community?.avatar && (
                    <img
                        src={community.avatar}
                        alt={`${community.name} avatar`}
                        className="w-12 h-12 rounded-full mr-3"
                    />
                )}
                <h1 className="text-3xl font-semibold">{community?.name || "Community Name"}</h1>
            </div>

            {/* Chat Messages */}
            <div className="bg-[#1a1a1d] rounded-lg p-4 h-[70vh] overflow-y-auto">
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
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-[#262626] text-white p-3 rounded-lg focus:outline-none"
                    placeholder="Type your message..."
                />
                <div className="flex space-x-2">
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="text-sm text-gray-500 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                        accept="image/*"
                    />
                    <input
                        type="file"
                        name="video"
                        onChange={handleFileChange}
                        className="text-sm text-gray-500 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                        accept="video/*"
                    />
                </div>
                <button
                    onClick={sendMessage}
                    className="bg-[#e473ff] text-white py-3 px-6 rounded-lg hover:bg-[#6e2b7e] transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
