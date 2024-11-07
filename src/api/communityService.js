import axios from 'axios';

const baseUrl = '/api/communities';

/** Community Management Functions **/
// 1. Create a new community
export const createCommunity = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating community:", error);
        throw error;
    }
};

// 2. Edit a community
export const editCommunity = async (communityId, data) => {
    try {
        const response = await axios.patch(`${baseUrl}/${communityId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error editing community:", error);
        throw error;
    }
};

// 3. Delete a community
export const deleteCommunity = async (communityId) => {
    try {
        const response = await axios.delete(`${baseUrl}/${communityId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting community:", error);
        throw error;
    }
};

// 4. Add or update community avatar
export const addCommunityAvatar = async (communityId, avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
        const response = await axios.patch(`${baseUrl}/${communityId}/avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding community avatar:", error);
        throw error;
    }
};


/** Member Management Functions **/
// 5. Join a community
export const joinCommunity = async (communityId) => {
    try {
        const response = await axios.post(`${baseUrl}/${communityId}/join`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error joining community:", error);
        throw error;
    }
};

// 6. Leave a community
export const leaveCommunity = async (communityId) => {
    try {
        const response = await axios.post(`${baseUrl}/${communityId}/leave`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error leaving community:", error);
        throw error;
    }
};

// 7. Remove a user from community
export const removeUserFromCommunity = async (communityId, userId) => {
    try {
        const response = await axios.delete(`${baseUrl}/${communityId}/remove/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error removing user from community:", error);
        throw error;
    }
};

// 8. Make a user an admin
export const makeAdmin = async (communityId, userId) => {
    try {
        const response = await axios.patch(`${baseUrl}/${communityId}/admin/make/${userId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error making user admin:", error);
        throw error;
    }
};

// 9. Revoke admin status
export const revokeAdmin = async (communityId, userId) => {
    try {
        const response = await axios.patch(`${baseUrl}/${communityId}/admin/revoke/${userId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error revoking admin status:", error);
        throw error;
    }
};


/** Chat Management Functions **/
// 10. Send a chat message
export const sendMessage = async (communityId, messageData) => {
    try {
        const response = await axios.post(`${baseUrl}/${communityId}/message`, messageData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

// 11. Delete a chat message
export const deleteMessage = async (communityId, messageId) => {
    try {
        const response = await axios.delete(`${baseUrl}/${communityId}/message/${messageId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
};

// 12. Edit a chat message
export const editMessage = async (communityId, messageId, content) => {
    try {
        const response = await axios.patch(`${baseUrl}/${communityId}/message/${messageId}`, { content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error editing message:", error);
        throw error;
    }
};

// 13. Get chat messages with pagination
export const getCommunityChats = async (communityId, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/${communityId}/messages`, {
            params: { page, limit },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching community chats:", error);
        throw error;
    }
};


/** Media Management Functions **/
// 14. Upload an image to a chat
export const uploadImageToChat = async (communityId, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post(`${baseUrl}/${communityId}/chat/upload-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading image to chat:", error);
        throw error;
    }
};

// 15. Upload a video to a chat
export const uploadVideoToChat = async (communityId, videoFile) => {
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
        const response = await axios.post(`${baseUrl}/${communityId}/chat/upload-video`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading video to chat:", error);
        throw error;
    }
};

// 16. Delete all media in a community
export const deleteCommunityMedia = async (communityId) => {
    try {
        const response = await axios.delete(`${baseUrl}/${communityId}/media`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting community media:", error);
        throw error;
    }
};


/** Community Information and Search Functions **/
// 17. Get community details
export const getCommunityDetails = async (communityId) => {
    try {
        const response = await axios.get(`${baseUrl}/${communityId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error getting community details:", error);
        throw error;
    }
};

// 18. Search communities
export const searchCommunities = async (query) => {
    try {
        const response = await axios.get(`${baseUrl}/search`, {
            params: { query },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error searching communities:", error);
        throw error;
    }
};

// 19. List all communities
export const listAllCommunities = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(baseUrl, {
            params: { page, limit },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error listing all communities:", error);
        throw error;
    }
};

// 20. List user communities
export const listUserCommunities = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/user/${userId}/communities`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error listing user communities:", error);
        throw error;
    }
};
