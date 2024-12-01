import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { initializeSocket, joinAnonCommunityRoom, onNewAnonMessage } from "../../utils/socket";
import { anonymousCommunityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AnonymousChatPage() {
    const { communityName } = useParams(); // Community name from URL
    const navigate = useNavigate();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Extract username from the URL query parameter
    const params = new URLSearchParams(location.search);
    const providedUsername = params.get("username") || "anonymous";

    // Append a random string to ensure uniqueness
    const username = useRef(`${providedUsername}_${Math.random().toString(36).substring(7)}`);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!communityName) {
            toast.error("Community name is required.");
            navigate("/anonymous-community");
            return;
        }

        // Initialize the socket connection
        socketRef.current = initializeSocket();

        // Join the anonymous community room
        joinAnonCommunityRoom(communityName, username.current);

        // Listen for new messages broadcasted by the server
        onNewAnonMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [communityName, navigate]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            toast.warn("Message cannot be empty.");
            return;
        }

        const messageData = {
            communityName,
            username: username.current,
            content: newMessage,
        };

        try {
            // Send the message via the API for persistence
            await anonymousCommunityService.sendAnonMessage(communityName, username.current, newMessage);

            // Emit the message via socket for real-time broadcasting
            socketRef.current.emit("sendAnonMessage", messageData);

            // Optimistically add the message to the local state
            setMessages((prevMessages) => [
                ...prevMessages,
                { username: username.current, content: newMessage, timestamp: new Date().toISOString() },
            ]);

            setNewMessage("");
        } catch (error) {
            toast.error("Failed to send the message. Please try again.");
        }
    };

    return (
        <div className="flex flex-col bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">
                    {communityName || "Anonymous Community"}
                </h1>
                <button
                    onClick={() => navigate("/anonymous-community")}
                    className="text-red-500 px-4 py-2 rounded-md hover:bg-[#1c1d1f]"
                >
                    Leave
                </button>
            </div>

            {/* Messages Section */}
            <div className="flex-grow bg-[#1a1a1d] rounded-lg p-4 overflow-y-auto">
                {messages.length === 0 ? (
                    <p className="text-gray-400 text-center">
                        No messages yet. Start the conversation!
                    </p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-[#e473ff] font-semibold">{msg.username}</p>
                            <p className="text-gray-300">{msg.content}</p>
                            <p className="text-gray-500 text-xs">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Message Input */}
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow bg-[#262626] p-3 rounded-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-[#e473ff] text-black px-4 py-2 rounded-lg hover:bg-[#6e2b7e]"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
