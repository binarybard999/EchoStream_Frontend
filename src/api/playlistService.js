// src/services/playlistService.js
import axios from 'axios';

/**
 * Create a new playlist
 * @param {Object} playlistData - The data for the new playlist (name, description)
 * @returns {Promise<Object>} - The created playlist
 */
export const createPlaylist = async (playlistData) => {
    try {
        const response = await axios.post('/api/playlists', playlistData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating playlist:", error);
        throw error;
    }
};

/**
 * Fetch playlists of a specific user
 * @param {String} userId - The ID of the user
 * @returns {Promise<Array>} - The list of playlists
 */
export const getUserPlaylists = async (userId) => {
    try {
        const response = await axios.get(`/api/playlists/user/${userId}`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user playlists:", error);
        throw error;
    }
};

/**
 * Get a playlist by its ID
 * @param {String} playlistId - The ID of the playlist
 * @returns {Promise<Object>} - The playlist details
 */
export const getPlaylistById = async (playlistId) => {
    try {
        const response = await axios.get(`/api/playlists/${playlistId}`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching playlist by ID:", error);
        throw error;
    }
};

/**
 * Add a video to a playlist
 * @param {String} playlistId - The ID of the playlist
 * @param {String} videoId - The ID of the video to add
 * @returns {Promise<Object>} - The updated playlist
 */
export const addVideoToPlaylist = async (playlistId, videoId) => {
    try {
        const response = await axios.patch(`/api/playlists/add/${videoId}/${playlistId}`, {}, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error adding video to playlist:", error);
        throw error;
    }
};

/**
 * Remove a video from a playlist
 * @param {String} playlistId - The ID of the playlist
 * @param {String} videoId - The ID of the video to remove
 * @returns {Promise<Object>} - The updated playlist
 */
export const removeVideoFromPlaylist = async (playlistId, videoId) => {
    try {
        const response = await axios.patch(`/api/playlists/remove/${videoId}/${playlistId}`, {}, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error removing video from playlist:", error);
        throw error;
    }
};

/**
 * Delete a playlist
 * @param {String} playlistId - The ID of the playlist to delete
 * @returns {Promise<Object>} - Success message
 */
export const deletePlaylist = async (playlistId) => {
    try {
        const response = await axios.delete(`/api/playlists/${playlistId}`, { withCredentials: true });
        return response.data.message;
    } catch (error) {
        console.error("Error deleting playlist:", error);
        throw error;
    }
};

/**
 * Update a playlist's details
 * @param {String} playlistId - The ID of the playlist
 * @param {Object} updateData - The data to update (name, description)
 * @returns {Promise<Object>} - The updated playlist
 */
export const updatePlaylist = async (playlistId, updateData) => {
    try {
        const response = await axios.patch(`/api/playlists/${playlistId}`, updateData, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error updating playlist:", error);
        throw error;
    }
};
