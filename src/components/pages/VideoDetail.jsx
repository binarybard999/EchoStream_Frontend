import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import video.js CSS
import { videoService, aiService } from "../../api";
import { toast } from "react-toastify";

export default function VideoDetail() {
    const { videoId } = useParams();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); // Track if there's an error
    const [relatedVideos, setRelatedVideos] = useState([]); // Suggested videos
    const [aiContent, setAiContent] = useState(null); // AI-generated content
    const [aiLoading, setAiLoading] = useState(false); // Loading state for AI content
    const videoRef = useRef(null); // Reference for the video element
    const playerRef = useRef(null); // Reference for the video.js player

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            setError(false);
            try {
                const videoData = await videoService.getVideoById(videoId);
                console.log(videoData);
                setVideo(videoData.statusCode.video);
                setRelatedVideos(videoData.statusCode.relatedVideos || []); // Set related videos if available
                console.log(videoData.statusCode.relatedVideos);
            } catch (err) {
                setError(true);
                toast.error("Failed to load video.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    // Initialize video.js player when the video data is available
    useEffect(() => {
        if (!playerRef.current && video?.videoFile && videoRef.current) {
            // Initialize video.js
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                responsive: true,
                fluid: true,
            });
            // Set video source
            playerRef.current.src({ src: video.videoFile, type: "video/mp4" });
        }
        // Cleanup only on component unmount
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [video.videoFile]); // Re-run when video.videoFile changes

    const fetchAiContent = async () => {
        if (!video) return;

        setAiLoading(true);
        try {
            const payload = {
                title: video.title,
                description: video.description,
                tags: video.tags.join(", "),
                category: video.category,
            };
            const response = await aiService.fetchAiGeneratedContent(payload);
            console.log(response.data);
            setAiContent(response.data); // Assuming the AI service returns JSON as described
            toast.success("AI content generated successfully!");
        } catch (error) {
            toast.error("Failed to generate AI content.");
            console.error("Error fetching AI content:", error);
        } finally {
            setAiLoading(false);
        }
    };

    const placeholderVideo = {
        title: "Video Not Found",
        channel: "Unknown Channel",
        views: "N/A",
        createdAt: "N/A",
        description: "The video you are looking for does not exist.",
        videoUrl: "https://dummyimage.com/1280x720", // Placeholder URL for missing videos
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    const displayVideo = error || !video ? placeholderVideo : video;

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16 flex flex-col lg:flex-row">
            {/* Main Video Player and Details */}
            <div className="flex-grow lg:w-3/4">
                <div className="mb-5">
                    <div className="aspect-w-16 aspect-h-9">
                        {/* Video.js player integration */}
                        {video && !error ? (
                            <div data-vjs-player>
                                <video
                                    ref={videoRef}
                                    // src={displayVideo.videoFile}
                                    className="video-js w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ) : (
                            <img
                                src={displayVideo.videoUrl}
                                alt={displayVideo.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">{displayVideo.title}</h1>
                <div className="text-gray-400 mb-3">
                    <span>
                        {displayVideo.views} •{" "}
                        {new Date(displayVideo.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <Link className="flex items-center mb-5" to={`/c/${displayVideo.owner?.username}`}>
                    <img
                        src={displayVideo.owner?.avatar || "https://dummyimage.com/50x50"}
                        alt={displayVideo.owner?.username || displayVideo.channel}
                        className="rounded-full w-10 h-10 object-cover mr-3"
                    />
                    <div>
                        <h2 className="font-semibold">
                            {displayVideo.owner?.username || displayVideo.channel}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {displayVideo.owner?.subscribersCount || "N/A"} subscribers
                        </p>
                    </div>
                </Link>
                <p className="text-gray-300 mb-5">{displayVideo.description}</p>
            </div>

            {/* Suggested Videos & AI Content */}
            <div className="lg:w-1/3 lg:pl-5">
                <h2 className="text-xl font-semibold mb-3">Suggested Videos</h2>
                <div className="space-y-4">
                    {relatedVideos.length > 0 ? (
                        relatedVideos.map((suggestedVideo) => (
                            <div
                                key={suggestedVideo._id}
                                className="flex items-center hover:bg-[#1c1d1f] p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                                <img
                                    src={suggestedVideo.thumbnail}
                                    alt={suggestedVideo.title}
                                    className="w-32 h-20 rounded-lg object-cover"
                                />
                                <div className="ml-3 flex flex-col">
                                    <h3 className="text-white text-md font-semibold truncate">
                                        {suggestedVideo.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {suggestedVideo.owner?.username || "Unknown Channel"}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {suggestedVideo.views} •{" "}
                                        {new Date(suggestedVideo.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No suggested videos found.</p>
                    )}
                </div>

                <div className="mt-5">
                    <button
                        onClick={fetchAiContent}
                        disabled={aiLoading}
                        className="w-full bg-[#e473ff] text-black font-bold py-2 rounded-md"
                    >
                        {aiLoading ? "Generating Content..." : "Generate Related Content"}
                    </button>
                </div>

                {aiContent && (
                    <div className="mt-5 space-y-4">
                        {/* Books Section */}
                        {Array.isArray(aiContent["data"]["books"]) && aiContent["data"]["books"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Books</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["books"].map((book, index) => (
                                        <li key={index}>
                                            <a
                                                href={book.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#e473ff]"
                                            >
                                                {book.title} by {book.author}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Links Section */}
                        {Array.isArray(aiContent["data"]["links"]) && aiContent["data"]["links"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Links</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["links"].map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#e473ff]"
                                            >
                                                {link.title}
                                            </a>
                                            <p>{link.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Recipes Section */}
                        {Array.isArray(aiContent["data"]["recipes"]) && aiContent["data"]["recipes"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Recipes</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["recipes"].map((recipe, index) => (
                                        <li key={index}>
                                            <p className="font-semibold">{recipe.name}</p>
                                            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
                                            <p>Steps:</p>
                                            <ol className="list-decimal pl-5">
                                                {recipe.steps.map((step, idx) => (
                                                    <li key={idx}>{step}</li>
                                                ))}
                                            </ol>
                                            <a
                                                href={recipe.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#e473ff]"
                                            >
                                                Source
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Facts Section */}
                        {Array.isArray(aiContent["data"]["facts"]) && aiContent["data"]["facts"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Facts</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["facts"].map((fact, index) => (
                                        <li key={index}>{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Products Section */}
                        {Array.isArray(aiContent["data"]["products"]) && aiContent["data"]["products"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Products</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["products"].map((product, index) => (
                                        <li key={index}>
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#e473ff]"
                                            >
                                                {product.name}
                                            </a>
                                            <p>{product.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Articles Section */}
                        {Array.isArray(aiContent["data"]["articles"]) && aiContent["data"]["articles"].length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Articles</h3>
                                <ul className="text-gray-300">
                                    {aiContent["data"]["articles"].map((article, index) => (
                                        <li key={index}>
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#e473ff]"
                                            >
                                                {article.title}
                                            </a>
                                            <p>{article.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
