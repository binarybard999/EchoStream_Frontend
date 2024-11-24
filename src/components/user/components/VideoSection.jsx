import React, { useState, useEffect } from "react";
import { videoService } from "../../../api"; // Adjust the import as per your project structure
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { FiEdit, FiToggleLeft, FiToggleRight } from "react-icons/fi";

export default function VideoSection() {
    const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
    const [isEditVideoOpen, setIsEditVideoOpen] = useState(false);
    const [videoData, setVideoData] = useState({
        title: "",
        description: "",
        category: "",
        tags: "",
        videoFile: null,
        thumbnail: null,
    });
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editVideoId, setEditVideoId] = useState(null); // Track which video is being edited

    const categories = [
        "coding", "sports", "gaming", "music", "news", "travel",
        "food", "education", "lifestyle", "technology", "fitness",
        "health", "fashion", "art", "photography", "finance",
        "history", "movies", "science", "books", "nature",
    ];

    useEffect(() => {
        const fetchUserVideos = async () => {
            setLoading(true);
            try {
                const response = await videoService.getUserVideos();
                setVideos(response.data);
                toast.success("Videos loaded successfully!");
            } catch (error) {
                toast.error("Failed to fetch videos.");
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserVideos();
    }, []);

    const toggleAddVideoPopup = () => {
        resetVideoForm();
        setIsAddVideoOpen((prev) => !prev);
    }
    const toggleEditVideoPopup = () => setIsEditVideoOpen((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setVideoData((prevData) => ({ ...prevData, [name]: files[0] }));
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        resetVideoForm();
        setIsSubmitting(true);

        const formData = {
            title: videoData.title,
            description: videoData.description,
            category: videoData.category,
            tags: videoData.tags.split(",").map((tag) => tag.trim()),
        };

        const files = {
            videoFile: videoData.videoFile,
            thumbnail: videoData.thumbnail,
        };

        try {
            await videoService.publishVideo(formData, files);
            toast.success("Video added successfully!");
            toggleAddVideoPopup();
            resetVideoForm();
            refreshVideos();
        } catch (error) {
            toast.error("Failed to add video.");
            console.error("Error adding video:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditVideo = (video) => {
        setEditVideoId(video._id); // Store video ID to edit
        setVideoData({
            title: video.title,
            description: video.description,
            category: video.category || "", // Keep the current category
            tags: video.tags.join(", "), // Convert array to string
            thumbnail: null, // Existing thumbnail cannot be re-uploaded
        });
        toggleEditVideoPopup();
    };

    const handleUpdateVideo = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            title: videoData.title,
            description: videoData.description,
            category: videoData.category,
            tags: videoData.tags.split(",").map((tag) => tag.trim()),
        };

        const files = {
            thumbnail: videoData.thumbnail,
        };

        try {
            await videoService.updateVideo(editVideoId, formData, files);
            toast.success("Video updated successfully!");
            toggleEditVideoPopup();
            refreshVideos();
        } catch (error) {
            toast.error("Failed to update video.");
            console.error("Error updating video:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTogglePublishStatus = async (videoId, currentStatus) => {
        try {
            await videoService.togglePublishStatus(videoId);
            const updatedVideos = videos.map((video) =>
                video._id === videoId ? { ...video, isPublished: !currentStatus } : video
            );
            setVideos(updatedVideos);
            toast.success(
                `Video has been ${currentStatus ? "unpublished" : "published"}.`
            );
        } catch (error) {
            toast.error("Failed to toggle publish status.");
            console.error("Error toggling publish status:", error);
        }
    };

    const refreshVideos = async () => {
        try {
            const response = await videoService.getUserVideos();
            setVideos(response.data);
        } catch (error) {
            console.error("Error refreshing videos:", error);
        }
    };

    const resetVideoForm = () => {
        setVideoData({
            title: "",
            description: "",
            category: "",
            tags: "",
            videoFile: null,
            thumbnail: null,
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <p className="text-gray-300">Your videos are listed below.</p>
                <button
                    onClick={toggleAddVideoPopup}
                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                >
                    Add Video
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <FaSpinner className="text-gray-400 animate-spin text-3xl" />
                </div>
            ) : (
                <ul className="space-y-4">
                    {videos.map((video) => (
                        <li
                            key={video._id}
                            className="flex items-center justify-between bg-[#1a1a1d] p-4 rounded-lg shadow-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-bold">{video.title}</h3>
                                    <p className="text-gray-400 text-sm">{video.description}</p>
                                    <p className="text-gray-500 text-xs">
                                        {video.category} | Tags: {video.tags.join(", ")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleEditVideo(video)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FiEdit size={25} />
                                </button>
                                <button
                                    onClick={() => handleTogglePublishStatus(video._id, video.isPublished)}
                                    className={`${video.isPublished ? "text-green-500" : "text-red-500"
                                        } hover:text-gray-700`}
                                >
                                    {video.isPublished ? (
                                        <FiToggleRight size={25} />
                                    ) : (
                                        <FiToggleLeft size={25} />
                                    )}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isAddVideoOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Video</h2>
                        <form onSubmit={handleAddVideo} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={videoData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={videoData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={videoData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={videoData.tags}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Video File</label>
                                <input
                                    type="file"
                                    name="videoFile"
                                    onChange={handleFileChange}
                                    required
                                    accept="video/*"
                                    className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Thumbnail</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleFileChange}
                                    required
                                    accept="image/*"
                                    className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={toggleAddVideoPopup}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    {isSubmitting ? "Uploading..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditVideoOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Video</h2>
                        <form onSubmit={handleUpdateVideo} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={videoData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={videoData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={videoData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={videoData.tags}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Thumbnail</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-white hover:file:bg-[#6e2b7e]"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={toggleEditVideoPopup}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    {isSubmitting ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
