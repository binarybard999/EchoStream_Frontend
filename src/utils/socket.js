import { io } from 'socket.io-client';

let socket;

/**
 * Initialize a socket connection if it doesn't already exist.
 * @returns {Socket} - The initialized Socket.IO client instance.
 */
export const initializeSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000', {
            transports: ['websocket'],
            withCredentials: true,
        });

        // Listen for connection and disconnection events
        socket.on('connect', () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on('disconnect', () => {
            console.log("Socket disconnected");
        });
    }
    return socket;
};

/**
 * Join a specific community room for real-time interactions.
 * @param {String} communityId - The ID of the community to join.
 */
export const joinCommunityRoom = (communityId) => {
    if (socket) {
        socket.emit("joinCommunity", communityId);
        console.log(`Joined community room: ${communityId}`);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Leave a specific community room.
 * @param {String} communityId - The ID of the community to leave.
 */
export const leaveCommunityRoom = (communityId) => {
    if (socket) {
        socket.emit("leaveCommunity", communityId);
        console.log(`Left community room: ${communityId}`);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Set up a listener for new messages in the community room.
 * @param {Function} callback - Function to execute when a new message is received.
 */
export const onNewMessage = (callback) => {
    if (socket) {
        socket.on("newMessage", callback);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Disconnect the socket connection if it exists.
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected:", socket.id);
        socket = null;
    } else {
        console.warn("Socket not initialized or already disconnected.");
    }
};
