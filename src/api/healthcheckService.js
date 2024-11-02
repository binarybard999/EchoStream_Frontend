import axios from 'axios';

/**
 * Perform a health check to ensure the backend service is running.
 * @returns {Promise<String>} - "OK" if the service is operational
 */
export const performHealthCheck = async () => {
    try {
        const response = await axios.get('/api/healthcheck');
        return response.data.message; // Should return "OK"
    } catch (error) {
        console.error("Health check failed:", error);
        throw error;
    }
};
