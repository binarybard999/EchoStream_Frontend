import axios from 'axios';

/**
 * Fetch comments for a specific video
 * @param {String} videoId - The ID of the video
 * @param {Number} page - Page number for pagination
 * @param {Number} limit - Number of comments per page
 * @returns {Promise<Object>} - The API response containing comments
 */
export const getVideoComments = async (videoId, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/comments/${videoId}`, {
            params: { page, limit },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

/**
 * Add a comment to a video
 * @param {String} videoId - The ID of the video
 * @param {String} content - The content of the comment
 * @returns {Promise<Object>} - The API response containing the new comment
 */
export const addComment = async (videoId, content) => {
    try {
        const response = await axios.post(`/api/comments/${videoId}`, { content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

/**
 * Update a comment
 * @param {String} commentId - The ID of the comment to update
 * @param {String} content - The new content of the comment
 * @returns {Promise<Object>} - The API response containing the updated comment
 */
export const updateComment = async (commentId, content) => {
    try {
        const response = await axios.patch(`/api/comments/c/${commentId}`, { content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

/**
 * Delete a comment
 * @param {String} commentId - The ID of the comment to delete
 * @returns {Promise<Object>} - The API response confirming deletion
 */
export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`/api/comments/c/${commentId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
