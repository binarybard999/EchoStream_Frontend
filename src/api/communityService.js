import axios from "axios";

// Function to create a community
export const createCommunity = async (communityData) => {
    const response = await axios.post("/api/communities", communityData);
    return response.data;
};

// Function to join a community
export const joinCommunity = async (joinData) => {
    const response = await axios.post("/api/communities/join", joinData);
    return response.data;
};

export const communityService = {
    createCommunity,
    joinCommunity,
};
