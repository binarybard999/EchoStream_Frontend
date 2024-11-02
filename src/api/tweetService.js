import axios from 'axios';

/**
 * Create a new tweet.
 * @param {Object} tweetData - The tweet data containing content.
 * @param {Object} user - The user object containing user details (typically includes user token).
 * @returns {Promise<Object>} - The API response containing the created tweet.
 */
export const createTweet = async (tweetData, user) => {
    try {
        const response = await axios.post('/api/tweets', tweetData, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Use the user's token for authentication
            },
        });
        return response.data; // Returns the created tweet response
    } catch (error) {
        console.error("Failed to create tweet:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get all tweets for a specific user.
 * @param {String} userId - The ID of the user whose tweets to fetch.
 * @returns {Promise<Object>} - The API response containing the user's tweets.
 */
export const getUserTweets = async (userId) => {
    try {
        const response = await axios.get(`/api/tweets/user/${userId}`);
        return response.data; // Returns the user's tweets
    } catch (error) {
        console.error("Failed to fetch user tweets:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Update an existing tweet.
 * @param {String} tweetId - The ID of the tweet to update.
 * @param {Object} tweetData - The updated tweet data containing content.
 * @param {Object} user - The user object containing user details (typically includes user token).
 * @returns {Promise<Object>} - The API response containing the updated tweet.
 */
export const updateTweet = async (tweetId, tweetData, user) => {
    try {
        const response = await axios.patch(`/api/tweets/${tweetId}`, tweetData, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Use the user's token for authentication
            },
        });
        return response.data; // Returns the updated tweet response
    } catch (error) {
        console.error("Failed to update tweet:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Delete an existing tweet.
 * @param {String} tweetId - The ID of the tweet to delete.
 * @param {Object} user - The user object containing user details (typically includes user token).
 * @returns {Promise<Object>} - The API response confirming the deletion.
 */
export const deleteTweet = async (tweetId, user) => {
    try {
        const response = await axios.delete(`/api/tweets/${tweetId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Use the user's token for authentication
            },
        });
        return response.data; // Returns the response confirming deletion
    } catch (error) {
        console.error("Failed to delete tweet:", error);
        throw error; // Rethrow error for handling in the component
    }
};
