import axios from 'axios';

/**
 * Toggle subscription for a user to a channel.
 * @param {String} channelId - The ID of the channel to subscribe/unsubscribe from.
 * @param {Object} user - The user object containing user details (typically includes user ID).
 * @returns {Promise<Object>} - The API response with the success message.
 */
export const toggleSubscription = async (channelId, user) => {
    try {
        const response = await axios.post(`/api/subscriptions/c/${channelId}`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Use the user's token for authentication
            },
        });
        return response.data; // Returns the response from the API
    } catch (error) {
        console.error("Failed to toggle subscription:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the list of subscribers for a specific channel.
 * @param {String} subscriberId - The ID of the subscriber.
 * @returns {Promise<Object>} - The API response containing subscribers and total count.
 */
export const getUserChannelSubscribers = async (subscriberId) => {
    try {
        const response = await axios.get(`/api/subscriptions/u/${subscriberId}`);
        return response.data; // Returns the list of subscribers
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the list of channels that a user has subscribed to.
 * @param {String} channelId - The ID of the channel.
 * @returns {Promise<Object>} - The API response containing subscribed channels and total count.
 */
export const getSubscribedChannels = async (channelId) => {
    try {
        const response = await axios.get(`/api/subscriptions/c/${channelId}`);
        return response.data; // Returns the list of subscribed channels
    } catch (error) {
        console.error("Failed to fetch subscribed channels:", error);
        throw error; // Rethrow error for handling in the component
    }
};
