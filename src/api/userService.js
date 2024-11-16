import axios from 'axios';

/**
 * Register a new user.
 * @param {Object} userData - The user data containing username, email, password, and files (avatar, coverImage).
 * @returns {Promise<Object>} - The API response containing the created user.
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/api/users/register', userData);
        return response.data; // Returns the created user response
    } catch (error) {
        console.error("Failed to register user:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Log in a user.
 * @param {Object} credentials - The user's credentials containing email and password.
 * @returns {Promise<Object>} - The API response containing the user data and tokens.
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('/api/users/login', credentials, {
            withCredentials: true, // Include cookies if needed
        });
        return response.data; // Returns the user data and tokens
    } catch (error) {
        console.error("Failed to log in user:", error);
        throw error; // Rethrow error for handling in the component
    }
};
/**
 * Log out the current user.
 * @returns {Promise<Object>} - The API response confirming the logout.
 */
export const logoutUser = async () => {
    try {
        const response = await axios.post("/api/users/logout", {}, { withCredentials: true });
        return response.data; // Returns confirmation of the logout
    } catch (error) {
        console.error("Failed to log out user:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Refresh the access token.
 * @returns {Promise<Object>} - The API response containing the new access token.
 */
export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/api/users/refresh-token');
        return response.data; // Returns the new access token
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Change the current user's password.
 * @param {Object} passwordData - The data containing the current and new passwords.
 * @returns {Promise<Object>} - The API response confirming the password change.
 */
export const changeCurrentPassword = async (passwordData) => {
    try {
        const response = await axios.post('/api/users/change-password', passwordData);
        return response.data; // Returns confirmation of the password change
    } catch (error) {
        console.error("Failed to change password:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the current authenticated user.
 * @returns {Promise<Object>} - The API response containing the current user data.
 */
export const getCurrentUser = async () => {
    try {
        const response = await axios.get('/api/users/current-user');
        return response.data; // Returns the current user data
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Update account details for the current user.
 * @param {Object} accountData - The data containing updated account details (e.g., username, email).
 * @returns {Promise<Object>} - The API response confirming the account update.
 */
export const updateAccountDetails = async (accountData) => {
    try {
        const response = await axios.patch('/api/users/update-account', accountData);
        return response.data; // Returns confirmation of the account update
    } catch (error) {
        console.error("Failed to update account details:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Update the user's avatar.
 * @param {Object} avatarData - The data containing the new avatar file.
 * @returns {Promise<Object>} - The API response confirming the avatar update.
 */
export const updateUserAvatar = async (avatarData) => {
    try {
        const response = await axios.patch('/api/users/avatar', avatarData);
        return response.data; // Returns confirmation of the avatar update
    } catch (error) {
        console.error("Failed to update user avatar:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Update the user's cover image.
 * @param {Object} coverImageData - The data containing the new cover image file.
 * @returns {Promise<Object>} - The API response confirming the cover image update.
 */
export const updateUserCoverImage = async (coverImageData) => {
    try {
        const response = await axios.patch('/api/users/cover-image', coverImageData);
        return response.data; // Returns confirmation of the cover image update
    } catch (error) {
        console.error("Failed to update user cover image:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the user channel profile by username.
 * @param {String} username - The username of the user whose profile to fetch.
 * @returns {Promise<Object>} - The API response containing the user's channel profile.
 */
export const getUserChannelProfile = async (username) => {
    try {
        const response = await axios.get(`/api/users/c/${username}`);
        return response.data; // Returns the user's channel profile
    } catch (error) {
        console.error("Failed to fetch user channel profile:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the watch history of the current user.
 * @returns {Promise<Object>} - The API response containing the user's watch history.
 */
export const getWatchHistory = async () => {
    try {
        const response = await axios.get('/api/users/history');
        return response.data; // Returns the user's watch history
    } catch (error) {
        console.error("Failed to fetch watch history:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get the all users.
 * @returns {Promise<Object>} - The API response containing all users data.
 */
export const fetchUsers = async () => {
    try {
        const response = await axios.get('/api/users/allusers');
        return response.data; // Returns all users data
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error; // Rethrow error for handling in the component
    }
};