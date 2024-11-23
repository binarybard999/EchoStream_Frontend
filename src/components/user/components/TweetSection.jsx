import React, { useState } from "react";

export default function TweetSection() {
    const [isAddTweetOpen, setIsAddTweetOpen] = useState(false);
    const [tweetData, setTweetData] = useState({ content: "" });

    const toggleAddTweetPopup = () => setIsAddTweetOpen((prev) => !prev);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setTweetData({ content: value });
    };

    const handleTweetSubmit = (e) => {
        e.preventDefault();
        console.log("Tweet submitted:", tweetData);
        toggleAddTweetPopup();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <p className="text-gray-300">This is where your tweets will be displayed.</p>
                <button
                    onClick={toggleAddTweetPopup}
                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                >
                    Add Tweet
                </button>
            </div>

            {isAddTweetOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Tweet</h2>
                        <form onSubmit={handleTweetSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Tweet Content</label>
                                <textarea
                                    name="content"
                                    value={tweetData.content}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={toggleAddTweetPopup}
                                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#e473ff] text-black font-bold px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
