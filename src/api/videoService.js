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
 * Fetch videos uploaded by the logged-in user
 * @returns {Promise<Object>} - The list of user's videos
 */
export const getUserVideos = async () => {
    try {
        const response = await axios.get("/api/videos/user", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching user videos:", error);
        throw error;
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
 * Update an existing video.
 * @param {String} videoId - The ID of the video to update.
 * @param {Object} videoData - The fields to update (title, description, etc.).
 * @param {File} thumbnailFile - The new thumbnail file, if any.
 * @returns {Promise<Object>} - Updated video data.
 */
export const updateVideo = async (videoId, videoData, thumbnailFile) => {
    const formData = new FormData();

    // Append fields to the form data
    if (videoData.title) formData.append("title", videoData.title);
    if (videoData.description) formData.append("description", videoData.description);
    if (videoData.categories) formData.append("categories", videoData.categories.join(","));
    if (videoData.tags) formData.append("tags", videoData.tags.join(","));
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

    try {
        const response = await axios.patch(`/api/videos/${videoId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating video:", error);
        throw error;
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
        const response = await axios.patch(`/api/videos/${videoId}/toggle-publish`);
        return response.data; // Returns confirmation of the publish status toggle
    } catch (error) {
        console.error("Failed to toggle publish status:", error);
        throw error; // Rethrow error for handling in the component
    }
};
