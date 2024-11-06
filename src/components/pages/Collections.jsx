// src/pages/Collections.jsx
import React, { useEffect, useState } from "react";
import { playlistService } from "../../api"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Collections() {
    const [activeTab, setActiveTab] = useState("yourPlaylists"); // Tab state
    const navigate = useNavigate();
    // const [yourPlaylists, setYourPlaylists] = useState([]);
    // const [explorePlaylists, setExplorePlaylists] = useState([]);

    // Replace your API calls with this mock data for testing purposes
const mockYourPlaylists = [
    {
        _id: "1",
        name: "My Coding Tutorials",
        description: "A collection of my favorite coding tutorial videos.",
        videos: [{}, {}, {}, {}], // Example: 4 videos
    },
    {
        _id: "2",
        name: "Travel Vlogs",
        description: "Vlogs from my travels around the world.",
        videos: [{}, {}, {}, {}, {}, {}], // Example: 6 videos
    },
    {
        _id: "3",
        name: "Music Playlist",
        description: "My favorite music videos to relax and enjoy.",
        videos: [{}, {}, {}], // Example: 3 videos
    },
];

const mockExplorePlaylists = [
    {
        _id: "4",
        name: "Science Documentaries",
        description: "A collection of fascinating science documentaries.",
        videos: [{}, {}, {}, {}, {}, {}, {}, {}], // Example: 8 videos
    },
    {
        _id: "5",
        name: "Cooking Recipes",
        description: "Learn new and exciting recipes from around the world.",
        videos: [{}, {}, {}], // Example: 3 videos
    },
    {
        _id: "6",
        name: "Fitness Workouts",
        description: "Daily workouts to keep you fit and active.",
        videos: [{}, {}, {}, {}, {}], // Example: 5 videos
    },
];

// Use this mock data in place of the API response
const [yourPlaylists, setYourPlaylists] = useState(mockYourPlaylists);
const [explorePlaylists, setExplorePlaylists] = useState(mockExplorePlaylists);


    useEffect(() => {
        // Fetch the user's playlists
        const fetchYourPlaylists = async () => {
            try {
                const response = await playlistService.getUserPlaylists();
                setYourPlaylists(response.data);
            } catch (error) {
                toast.error("Failed to load your playlists.");
            }
        };

        // Fetch playlists created by other users
        const fetchExplorePlaylists = async () => {
            try {
                const response = await playlistService.getExplorePlaylists();
                setExplorePlaylists(response.data);
            } catch (error) {
                toast.error("Failed to load explore playlists.");
            }
        };

        fetchYourPlaylists();
        fetchExplorePlaylists();
    }, []);

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-semibold mb-6">Collections</h1>
            <div className="flex space-x-4 mb-6">
                <button
                    className={`py-2 px-4 font-semibold ${
                        activeTab === "yourPlaylists"
                            ? "text-[#e473ff] border-b-2 border-[#e473ff]"
                            : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("yourPlaylists")}
                >
                    Your Playlists
                </button>
                <button
                    className={`py-2 px-4 font-semibold ${
                        activeTab === "explorePlaylists"
                            ? "text-[#e473ff] border-b-2 border-[#e473ff]"
                            : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("explorePlaylists")}
                >
                    Explore Playlists
                </button>
            </div>

            {activeTab === "yourPlaylists" && (
                <div>
                    {yourPlaylists.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {yourPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="bg-[#1a1a1d] rounded-lg shadow-lg overflow-hidden"
                                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                                >
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">
                                            {playlist.name}
                                        </h2>
                                        <p className="text-gray-400">
                                            {playlist.description}
                                        </p>
                                        <div className="mt-3">
                                            <span className="text-sm text-gray-500">
                                                {playlist.videos.length} Videos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No playlists found.
                        </p>
                    )}
                </div>
            )}

            {activeTab === "explorePlaylists" && (
                <div>
                    {explorePlaylists.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {explorePlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="bg-[#1a1a1d] rounded-lg shadow-lg overflow-hidden"
                                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                                >
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">
                                            {playlist.name}
                                        </h2>
                                        <p className="text-gray-400">
                                            {playlist.description}
                                        </p>
                                        <div className="mt-3">
                                            <span className="text-sm text-gray-500">
                                                {playlist.videos.length} Videos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No playlists found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
