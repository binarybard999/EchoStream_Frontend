import axios from "axios";

/**
 * Fetch AI-generated content for a video.
 * @param {Object} videoData - Video data including title, description, tags, and category.
 * @returns {Promise<Object>} - The AI-generated content.
 */
export const fetchAiGeneratedContent = async (videoData) => {
    try {
        const response = await axios.post("/api/ai/generate", videoData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching AI-generated content:", error);
        throw error;
    }
};