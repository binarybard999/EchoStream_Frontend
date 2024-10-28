// src/components/VideoDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import videojs from "video.js";
import 'video.js/dist/video-js.css'; // Import video.js CSS

export default function VideoDetail() {
    const { videoId } = useParams(); // Assumes that the route provides a video ID parameter
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); // Track if there's an error
    const videoRef = useRef(null); // Reference for the video element
    const playerRef = useRef(null); // Reference for the video.js player

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`/api/videos/${videoId}`);
                setVideo(response.data.statusCode.video); // Set video data from response
            } catch (err) {
                console.error("Error fetching video:", err);
                setError(true); // Set error to true if fetch fails
            } finally {
                setLoading(false); // Loading complete
            }
        };

        fetchVideo();
    }, [videoId]);

    useEffect(() => {
        if (video) {
            // Initialize the video.js player
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                responsive: true,
                fluid: true,
                sources: [{
                    src: video.videoFile,
                    type: 'video/mp4' // Specify the video type
                }]
            });

            // Cleanup on component unmount
            // return () => {
            //     if (playerRef.current) {
            //         playerRef.current.dispose();
            //     }
            // };
        }
    }, [video]);

    // Dummy placeholder video data
    const placeholderVideo = {
        id: videoId,
        title: "Video Not Found",
        channel: "Unknown Channel",
        views: "N/A",
        timestamp: "N/A",
        description: "The video you are looking for does not exist.",
        videoUrl: "https://dummyimage.com/1280x720", // Placeholder URL for the video thumbnail
    };

    // Loading state and error handling
    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    // If video not found, show placeholder
    const displayVideo = error || !video ? placeholderVideo : video;

    const suggestedVideos = [
        {
            id: 1,
            title: "Suggested Video 1",
            thumbnail: "https://dummyimage.com/640x360",
            channel: "Channel Name 1",
            views: "1.2M views",
            timestamp: "2 days ago",
        },
        {
            id: 2,
            title: "Suggested Video 2",
            thumbnail: "https://dummyimage.com/640x360",
            channel: "Channel Name 2",
            views: "500K views",
            timestamp: "1 week ago",
        },
        {
            id: 3,
            title: "Suggested Video 3",
            thumbnail: "https://dummyimage.com/640x360",
            channel: "Channel Name 3",
            views: "300K views",
            timestamp: "5 days ago",
        },
        {
            id: 4,
            title: "Suggested Video 4",
            thumbnail: "https://dummyimage.com/640x360",
            channel: "Channel Name 4",
            views: "1M views",
            timestamp: "3 days ago",
        },
        {
            id: 5,
            title: "Suggested Video 5",
            thumbnail: "https://dummyimage.com/640x360",
            channel: "Channel Name 5",
            views: "5M views",
            timestamp: "7 days ago",
        },
    ];

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16 flex flex-col lg:flex-row">
            {/* Main Video Player and Details */}
            <div className="flex-grow lg:w-2/3">
                <div className="mb-5">
                    <div className="aspect-w-16 aspect-h-9">
                        {/* Video.js player integration */}
                        {video && !error ? (
                            <div data-vjs-player>
                                <video
                                    ref={videoRef}
                                    className="video-js w-full h-full object-cover rounded-lg"
                                    controls
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
                    <span>{displayVideo.views} • {displayVideo.timestamp}</span>
                </div>
                <div className="flex items-center mb-5">
                    <img
                        src="https://dummyimage.com/50x50"
                        alt={displayVideo.channel}
                        className="rounded-full w-10 h-10 object-cover mr-3"
                    />
                    <div>
                        <h2 className="font-semibold">{displayVideo.channel}</h2>
                        <p className="text-sm text-gray-500">1.5M subscribers</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-5">{displayVideo.description}</p>
            </div>

            {/* Suggested Videos */}
            <div className="lg:w-1/3 lg:pl-5">
                <h2 className="text-xl font-semibold mb-3">Suggested Videos</h2>
                <div className="space-y-4">
                    {suggestedVideos.map((suggestedVideo) => (
                        <div
                            key={suggestedVideo.id}
                            className="flex items-center hover:bg-[#1c1d1f] p-2 rounded-lg transition-colors duration-200"
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
                                <p className="text-gray-400 text-sm">{suggestedVideo.channel}</p>
                                <p className="text-gray-500 text-sm">
                                    {suggestedVideo.views} • {suggestedVideo.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
