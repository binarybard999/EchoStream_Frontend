import axios from 'axios';

/**
 * Get all videos.
 * @returns {Promise<Object>} - The API response containing all videos.
 */
export const getAllVideos = async () => {
    try {
        const response = await axios.get('/api/videos');
        return response.data; // Returns all videos
    } catch (error) {
        console.error("Failed to fetch all videos:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Publish a new video.
 * @param {Object} videoData - The data containing video details (e.g., title, description).
 * @param {Object} files - The files containing the video and thumbnail.
 * @returns {Promise<Object>} - The API response containing the published video.
 */
export const publishVideo = async (videoData, files) => {
    const formData = new FormData();
    formData.append('videoFile', files.videoFile[0]);
    formData.append('thumbnail', files.thumbnail[0]);
    for (const key in videoData) {
        formData.append(key, videoData[key]);
    }

    try {
        const response = await axios.post('/api/videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Returns the published video
    } catch (error) {
        console.error("Failed to publish video:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Get a video by its ID.
 * @param {String} videoId - The ID of the video to fetch.
 * @returns {Promise<Object>} - The API response containing the video data.
 */
export const getVideoById = async (videoId) => {
    try {
        const response = await axios.get(`/api/videos/${videoId}`);
        // console.log(response.data);
        if (response.status !== 200 || !response.data) {
            throw new Error("Video not found.");
        }
        return response.data; // Return the video data
    } catch (error) {
        console.error("Failed to fetch video by ID:", error.message);
        throw error; // Rethrow the error for handling in the component
    }
};

/**
 * Update a video by its ID.
 * @param {String} videoId - The ID of the video to update.
 * @param {Object} videoData - The updated video data.
 * @param {Object} thumbnail - The new thumbnail file (optional).
 * @returns {Promise<Object>} - The API response confirming the video update.
 */
export const updateVideo = async (videoId, videoData, thumbnail) => {
    const formData = new FormData();
    if (thumbnail) {
        formData.append('thumbnail', thumbnail);
    }
    for (const key in videoData) {
        formData.append(key, videoData[key]);
    }

    try {
        const response = await axios.patch(`/api/videos/${videoId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Returns confirmation of the video update
    } catch (error) {
        console.error("Failed to update video:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Delete a video by its ID.
 * @param {String} videoId - The ID of the video to delete.
 * @returns {Promise<Object>} - The API response confirming the deletion.
 */
export const deleteVideo = async (videoId) => {
    try {
        const response = await axios.delete(`/api/videos/${videoId}`);
        return response.data; // Returns confirmation of the deletion
    } catch (error) {
        console.error("Failed to delete video:", error);
        throw error; // Rethrow error for handling in the component
    }
};

/**
 * Toggle the publish status of a video by its ID.
 * @param {String} videoId - The ID of the video to toggle.
 * @returns {Promise<Object>} - The API response confirming the status change.
 */
export const togglePublishStatus = async (videoId) => {
    try {
        const response = await axios.patch(`/api/videos/toggle/publish/${videoId}`);
        return response.data; // Returns confirmation of the publish status toggle
    } catch (error) {
        console.error("Failed to toggle publish status:", error);
        throw error; // Rethrow error for handling in the component
    }
};
