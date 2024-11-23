import React, { useState, useEffect } from "react";
import { videoService } from "../../../api"; // Adjust the import as per your project structure
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

export default function VideoSection() {
    const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
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

    const categories = [
        "coding",
        "sports",
        "gaming",
        "music",
        "news",
        "travel",
        "food",
        "education",
        "lifestyle",
        "technology",
        "fitness",
        "health",
        "fashion",
        "art",
        "photography",
        "finance",
        "history",
        "movies",
        "science",
        "books",
        "nature",
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

    const toggleAddVideoPopup = () => setIsAddVideoOpen((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value);
        setVideoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setVideoData((prevData) => ({ ...prevData, [name]: files[0] }));
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
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
            toast.success("Video published successfully!");
            toggleAddVideoPopup();
            setVideoData({
                title: "",
                description: "",
                category: "",
                tags: "",
                videoFile: null,
                thumbnail: null,
            });
            const response = await videoService.getUserVideos(); // Refresh video list
            setVideos(response.data);
        } catch (error) {
            toast.error("Failed to publish video.");
            console.error("Error publishing video:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <p className="text-gray-300">This is where your videos will be displayed.</p>
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
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div key={video._id} className="bg-[#1a1a1d] p-4 rounded-lg shadow-lg">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-lg font-bold mt-2">{video.title}</h3>
                            <p className="text-gray-400">{video.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {isAddVideoOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Video</h2>
                        <form onSubmit={handleVideoSubmit} className="space-y-4">
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
        </div>
    );
}
