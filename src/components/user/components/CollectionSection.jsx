import React, { useState } from "react";

export default function CollectionSection() {
    const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
    const [collectionData, setCollectionData] = useState({ name: "", description: "" });

    const toggleAddCollectionPopup = () => setIsAddCollectionOpen((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollectionData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCollectionSubmit = (e) => {
        e.preventDefault();
        console.log("Collection submitted:", collectionData);
        toggleAddCollectionPopup();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <p className="text-gray-300">This is where your collections will be displayed.</p>
                <button
                    onClick={toggleAddCollectionPopup}
                    className="bg-[#e473ff] text-black font-bold px-3 py-2 rounded-md"
                >
                    Add Collection
                </button>
            </div>

            {isAddCollectionOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1c1d1f] p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Collection</h2>
                        <form onSubmit={handleCollectionSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Collection Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={collectionData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={collectionData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#2a2a2d] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={toggleAddCollectionPopup}
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
