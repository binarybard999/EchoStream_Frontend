// src/services/anonCommunityService.js
import axios from "axios";

const API_BASE_URL = "/api/anonymous-community";

/**
 * Join or create an anonymous community.
 * @param {string} communityName - The name of the community.
 * @param {string} username - The anonymous username.
 * @returns {Promise<Object>} - The response data containing community and user info.
 */
export const createOrJoinAnonCommunity = async (communityName, username) => {
    try {
        const sanitizedCommunityName = communityName.trim().replace(/\s+/g, "_").toLowerCase();
        const sanitizedUsername = username.trim().replace(/\s+/g, "_").toLowerCase();

        const response = await axios.post(`${API_BASE_URL}/join`, {
            communityName: sanitizedCommunityName,
            username: sanitizedUsername,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating/joining anonymous community:", error);
        throw error.response?.data || { message: "Failed to join or create the community." };
    }
};

/**
 * Send a chat message in an anonymous community.
 * @param {string} communityName - The name of the community.
 * @param {string} username - The sender's anonymous username.
 * @param {string} content - The message content.
 * @returns {Promise<Object>} - The sent message data.
 */
export const sendAnonMessage = async (communityName, username, content) => {
    try {
        if (!content.trim()) {
            throw new Error("Message content cannot be empty.");
        }

        const sanitizedCommunityName = communityName.trim().replace(/\s+/g, "_").toLowerCase();
        const sanitizedUsername = username.trim().replace(/\s+/g, "_").toLowerCase();

        const response = await axios.post(`${API_BASE_URL}/message`, {
            communityName: sanitizedCommunityName,
            username: sanitizedUsername,
            content,
        });

        return response.data;
    } catch (error) {
        console.error("Error sending anonymous message:", error);
        throw error.response?.data || { message: "Failed to send the message." };
    }
};
