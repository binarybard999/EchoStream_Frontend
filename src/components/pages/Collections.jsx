import React, { useEffect, useState } from "react";
import { playlistService } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner, FaPlus } from "react-icons/fa";

export default function Collections() {
    const [activeTab, setActiveTab] = useState("yourPlaylists");
    const [yourPlaylists, setYourPlaylists] = useState([]);
    const [explorePlaylists, setExplorePlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
    const navigate = useNavigate();

    const fetchPlaylists = async () => {
        setLoading(true);
        try {
            if (activeTab === "yourPlaylists") {
                const response = await playlistService.getCurrentUserPlaylists();
                setYourPlaylists(response.data || []);
            } else if (activeTab === "explorePlaylists") {
                const response = await playlistService.getAllPlaylists();
                setExplorePlaylists(response.data.docs || []);
            }
        } catch (error) {
            toast.error(`Failed to load ${activeTab}.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, [activeTab]);

    const handleAddPlaylist = async () => {
        if (!newPlaylist.name.trim() || !newPlaylist.description.trim()) {
            toast.error("Both name and description are required.");
            return;
        }

        try {
            setLoading(true);
            await playlistService.createPlaylist(newPlaylist);
            toast.success("Playlist created successfully.");
            setShowModal(false);
            setNewPlaylist({ name: "", description: "" });
            fetchPlaylists();
        } catch (error) {
            toast.error("Failed to create playlist.");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-semibold mb-6">Collections</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap">
                    <button
                        className={`py-2 px-4 mb-2 font-semibold ${activeTab === "yourPlaylists"
                                ? "text-[#e473ff] border-b-2 border-[#e473ff]"
                                : "text-gray-400"
                            }`}
                        onClick={() => setActiveTab("yourPlaylists")}
                    >
                        Your Playlists
                    </button>
                    <button
                        className={`py-2 px-4 font-semibold ${activeTab === "explorePlaylists"
                                ? "text-[#e473ff] border-b-2 border-[#e473ff]"
                                : "text-gray-400"
                            }`}
                        onClick={() => setActiveTab("explorePlaylists")}
                    >
                        Explore Playlists
                    </button>
                    {activeTab === "yourPlaylists" && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center bg-[#e473ff] text-black py-2 px-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200"
                        >
                            <FaPlus className="mr-2" /> Add Playlist
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-gray-400 text-2xl" />
                </div>
            ) : activeTab === "yourPlaylists" ? (
                <div>
                    {yourPlaylists.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {yourPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="bg-[#1a1a1d] rounded-lg shadow-lg overflow-hidden cursor-pointer"
                                    onClick={() => handlePlaylistClick(playlist._id)}
                                >
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">{playlist.name}</h2>
                                        <p className="text-gray-400">{playlist.description}</p>
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
                        <p className="text-gray-500 text-center">No playlists found.</p>
                    )}
                </div>
            ) : (
                <div>
                    {explorePlaylists.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {explorePlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="bg-[#1a1a1d] rounded-lg shadow-lg overflow-hidden cursor-pointer"
                                    onClick={() => handlePlaylistClick(playlist._id)}
                                >
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">{playlist.name}</h2>
                                        <p className="text-gray-400">{playlist.description}</p>
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
                        <p className="text-gray-500 text-center">No playlists found.</p>
                    )}
                </div>
            )}

            {/* Add Playlist Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full md:ml-52">
                    <div className="bg-[#1a1a1d] p-6 rounded-lg w-100">
                        <h2 className="text-xl font-bold mb-4">Create Playlist</h2>
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            value={newPlaylist.name}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                            className="w-full mb-4 p-2 rounded bg-[#262626] text-white"
                        />
                        <textarea
                            placeholder="Playlist Description"
                            value={newPlaylist.description}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                            className="w-full mb-4 p-2 rounded bg-[#262626] text-white"
                            rows="3"
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddPlaylist}
                                className="bg-[#e473ff] text-black px-4 py-2 rounded hover:bg-[#6e2b7e]"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
