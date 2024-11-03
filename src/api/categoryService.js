// src/services/categoryService.js
import axios from 'axios';

// Base URLs and API keys (replace with your own keys)
const GOOGLE_BOOKS_API_KEY = 'YOUR_GOOGLE_BOOKS_API_KEY';
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';
const JDoodle_API_URL = 'https://api.jdoodle.com/v1/compilers';
const SPORTS_API_URL = 'https://example-sports-api.com';
const GAMING_API_URL = 'https://example-gaming-api.com';
const MUSIC_API_URL = 'https://example-music-api.com';
const NEWS_API_URL = 'https://example-news-api.com';
const TRAVEL_API_URL = 'https://example-travel-api.com';
const EDUCATION_API_URL = 'https://example-education-api.com';
const LIFESTYLE_API_URL = 'https://example-lifestyle-api.com';

// Function to fetch content for different categories

// 1. Coding/Programming
export const fetchCodingContent = async () => {
    try {
        const response = await axios.get(JDoodle_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching coding content:", error);
        throw error;
    }
};

// 2. Sports
export const fetchSportsContent = async () => {
    try {
        const response = await axios.get(SPORTS_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching sports content:", error);
        throw error;
    }
};

// 3. Gaming
export const fetchGamingContent = async () => {
    try {
        const response = await axios.get(GAMING_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching gaming content:", error);
        throw error;
    }
};

// 4. Music
export const fetchMusicContent = async () => {
    try {
        const response = await axios.get(MUSIC_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching music content:", error);
        throw error;
    }
};

// 5. News
export const fetchNewsContent = async () => {
    try {
        const response = await axios.get(NEWS_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching news content:", error);
        throw error;
    }
};

// 6. Travel
export const fetchTravelContent = async () => {
    try {
        const response = await axios.get(TRAVEL_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching travel content:", error);
        throw error;
    }
};

// 7. Food
export const fetchFoodContent = async () => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=5&apiKey=${SPOONACULAR_API_KEY}`
        );
        return response.data.recipes;
    } catch (error) {
        console.error("Error fetching food content:", error);
        throw error;
    }
};

// 8. Education
export const fetchEducationContent = async () => {
    try {
        const response = await axios.get(EDUCATION_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching education content:", error);
        throw error;
    }
};

// 9. Lifestyle
export const fetchLifestyleContent = async () => {
    try {
        const response = await axios.get(LIFESTYLE_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching lifestyle content:", error);
        throw error;
    }
};

// General function to fetch related content by category
export const fetchRelatedContentByCategory = async (category) => {
    switch (category.toLowerCase()) {
        case 'coding':
            return await fetchCodingContent();
        case 'sports':
            return await fetchSportsContent();
        case 'gaming':
            return await fetchGamingContent();
        case 'music':
            return await fetchMusicContent();
        case 'news':
            return await fetchNewsContent();
        case 'travel':
            return await fetchTravelContent();
        case 'food':
            return await fetchFoodContent();
        case 'education':
            return await fetchEducationContent();
        case 'lifestyle':
            return await fetchLifestyleContent();
        default:
            throw new Error("Invalid category or content not available.");
    }
};
