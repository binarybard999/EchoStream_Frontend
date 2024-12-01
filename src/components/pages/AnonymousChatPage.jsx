import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initializeSocket, joinAnonCommunityRoom, sendAnonMessage } from "../../utils/socket";
import { anonymousCommunityService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AnonymousChatPage() {
    const { communityName } = useParams(); // Community name passed in URL
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const username = useRef(`anon_${Math.random().toString(36).substring(7)}`); // Generate a random username
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize the socket connection
        socketRef.current = initializeSocket();
        joinAnonCommunityRoom(communityName, username.current);

        // Listen for new messages
        sendAnonMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [communityName]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            // Send message to the server
            const messageData = {
                communityName,
                username: username.current,
                content: newMessage,
            };

            await sendAnonMessage(communityName, username.current, newMessage);
            socketRef.current.emit("sendAnonMessage", messageData); // Emit message via socket
            setMessages((prevMessages) => [
                ...prevMessages,
                { username: username.current, content: newMessage, timestamp: new Date().toISOString() },
            ]);

            setNewMessage("");
        } catch (error) {
            toast.error("Failed to send message.");
        }
    };

    return (
        <div className="flex flex-col bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">{communityName || "Anonymous Community"}</h1>
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
                    <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-[#e473ff] font-semibold">{msg.username}</p>
                            <p className="text-gray-300">{msg.content}</p>
                            <p className="text-gray-500 text-xs">
                                {new Date(msg.timestamp || Date.now()).toLocaleTimeString()}
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
