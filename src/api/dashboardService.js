import axios from 'axios';

/**
 * Fetch channel statistics such as total videos, total views, total subscribers, and total likes.
 * @returns {Promise<Object>} - The statistics data from the API
 */
export const fetchChannelStats = async () => {
    try {
        const response = await axios.get('/api/dashboard/stats', { withCredentials: true });
        return response.data.data; // Returning the statistics data
    } catch (error) {
        console.error("Error fetching channel stats:", error);
        throw error;
    }
};

/**
 * Fetch all videos uploaded by the channel owner.
 * @returns {Promise<Array>} - The list of videos from the API
 */
export const fetchChannelVideos = async () => {
    try {
        const response = await axios.get('/api/dashboard/videos', { withCredentials: true });
        return response.data.data; // Returning the videos list
    } catch (error) {
        console.error("Error fetching channel videos:", error);
        throw error;
    }
};
