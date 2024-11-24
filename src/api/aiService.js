import axios from "axios";

// AI Service to interact with the backend
export const fetchAiGeneratedContent = async (videoData) => {
    try {
        const response = await axios.post(
            "/api/ai/generate",
            {
                title: videoData.title,
                description: videoData.description,
                tags: videoData.tags,
                category: videoData.category,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching AI-generated content:", error);
        throw error;
    }
};
