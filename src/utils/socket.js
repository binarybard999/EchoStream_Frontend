import { io } from 'socket.io-client';

let socket;

/**
 * Initialize a socket connection if it doesn't already exist.
 * @returns {socket} - The initialized Socket.IO client instance.
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

// === Normal Community Functions ===

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

// === Anonymous Community Functions ===

/**
 * Join an anonymous community room.
 * @param {string} communityName - The community name (from URL).
 * @param {string} username - The anonymous username.
 */
export const joinAnonCommunityRoom = (communityName, username) => {
    if (socket) {
        const sanitizedCommunityName = communityName.replace(/\s+/g, "_").toLowerCase();
        socket.emit("joinAnonCommunity", { communityName: sanitizedCommunityName, username });
        console.log(`Joined anonymous community: ${sanitizedCommunityName} as ${username}`);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Send an anonymous message.
 * @param {string} communityName - The community name (from URL).
 * @param {string} username - The anonymous username.
 * @param {string} content - The message content.
 */
export const sendAnonMessage = (communityName, username, content) => {
    if (socket) {
        const sanitizedCommunityName = communityName.replace(/\s+/g, "_").toLowerCase();
        socket.emit("sendAnonMessage", { communityName: sanitizedCommunityName, username, content });
        console.log(`Message sent to ${sanitizedCommunityName} by ${username}:`, content);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Leave an anonymous community room.
 * @param {string} communityName - The community name (from URL).
 * @param {string} username - The anonymous username.
 */
export const leaveAnonCommunityRoom = (communityName, username) => {
    if (socket) {
        const sanitizedCommunityName = communityName.replace(/\s+/g, "_").toLowerCase();
        socket.emit("leaveAnonCommunity", { communityName: sanitizedCommunityName, username });
        console.log(`Left anonymous community: ${sanitizedCommunityName}`);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Set up a listener for new messages in the anonymous community room.
 * @param {Function} callback - Function to execute when a new message is received.
 */
export const onNewAnonMessage = (callback) => {
    if (socket) {
        socket.on("newAnonMessage", callback);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Set up a listener for user join events in the anonymous community room.
 * @param {Function} callback - Function to execute when a user joins the community.
 */
export const onUserJoined = (callback) => {
    if (socket) {
        socket.on("userJoined", callback);
    } else {
        console.warn("Socket not initialized. Call initializeSocket() first.");
    }
};

/**
 * Set up a listener for user leave events in the anonymous community room.
 * @param {Function} callback - Function to execute when a user leaves the community.
 */
export const onUserLeft = (callback) => {
    if (socket) {
        socket.on("userLeft", callback);
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
