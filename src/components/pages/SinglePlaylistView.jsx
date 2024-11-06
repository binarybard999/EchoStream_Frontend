import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { playlistService } from "../../api"; // Adjust the path based on your project structure
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SinglePlaylistView() {
    const { playlistID } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                setLoading(true);
                const response = await playlistService.getPlaylistById(playlistID);
                setPlaylist(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch playlist details.");
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [playlistID]);

    if (loading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    if (!playlist) {
        return <div className="text-white text-center mt-10">Playlist not found.</div>;
    }

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <div className="bg-[#1a1a1d] rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-semibold mb-4">{playlist.name}</h1>
                <p className="text-gray-400 mb-6">{playlist.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlist.videos.map((video) => (
                        <div
                            key={video._id}
                            className="bg-[#262626] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                            onClick={() => navigate(`/view-video/${video._id}`)}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold truncate">{video.title}</h2>
                                <p className="text-gray-400 text-sm mt-1 truncate">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
