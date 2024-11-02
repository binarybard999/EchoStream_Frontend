import axios from 'axios';

/**
 * Toggle like status on a video.
 * @param {String} videoId - The ID of the video to like or unlike
 * @returns {Promise<Object>} - The API response with the like status
 */
export const toggleVideoLike = async (videoId) => {
    try {
        const response = await axios.post(`/api/likes/toggle/v/${videoId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error toggling video like:", error);
        throw error;
    }
};

/**
 * Toggle like status on a comment.
 * @param {String} commentId - The ID of the comment to like or unlike
 * @returns {Promise<Object>} - The API response with the like status
 */
export const toggleCommentLike = async (commentId) => {
    try {
        const response = await axios.post(`/api/likes/toggle/c/${commentId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error toggling comment like:", error);
        throw error;
    }
};

/**
 * Toggle like status on a tweet.
 * @param {String} tweetId - The ID of the tweet to like or unlike
 * @returns {Promise<Object>} - The API response with the like status
 */
export const toggleTweetLike = async (tweetId) => {
    try {
        const response = await axios.post(`/api/likes/toggle/t/${tweetId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error toggling tweet like:", error);
        throw error;
    }
};

/**
 * Fetch all videos liked by the user.
 * @returns {Promise<Array>} - The list of liked videos
 */
export const getLikedVideos = async () => {
    try {
        const response = await axios.get('/api/likes/videos', { withCredentials: true });
        return response.data.data; // Returning the liked videos
    } catch (error) {
        console.error("Error fetching liked videos:", error);
        throw error;
    }
};
