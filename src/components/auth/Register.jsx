// src/components/Register.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            const response = await axios.post("/register", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data) {
                alert("Registration successful!");
                // Redirect or handle successful registration
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0f] flex justify-center items-center">
            <div className="flex flex-col md:flex-row bg-gradient-to-tr from-[#381f54] to-[#632b6c] p-5 md:p-10 rounded-3xl shadow-lg max-w-5xl w-full">
                {/* Left gradient section */}
                <div className="flex-1 flex flex-col justify-center text-center text-white p-5 md:p-10">
                    <h1 className="text-3xl font-bold">EchoStream</h1>
                    <h2 className="text-2xl mt-5">Get Started with Us</h2>
                    <p className="mt-2">Register your account.</p>
                    <p className="mt-2">Share your content with the world.</p>
                </div>

                {/* Right form section */}
                <div className="flex-1 bg-[#1c1d1f] p-5 md:p-10 rounded-3xl text-white">
                    <h2 className="text-xl font-bold mb-5">Sign Up Account</h2>
                    <p className="mb-5 text-gray-400">Enter your personal data to create your account.</p>

                    {/* Social Buttons */}
                    <div className="flex justify-between gap-3 mb-5">
                        <button className="flex-1 bg-white text-black py-2 px-4 rounded-md shadow hover:bg-gray-100">
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            Google
                        </button>
                        <button className="flex-1 bg-white text-black py-2 px-4 rounded-md shadow hover:bg-gray-100">
                            <FontAwesomeIcon icon={faGithub} className="mr-2" />
                            Github
                        </button>
                    </div>

                    <div className="flex items-center mb-5">
                        <hr className="flex-grow border-gray-600" />
                        <span className="px-2 text-gray-400">Or</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>

                    {/* Input fields */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-[#2a2a2d] text-white p-3 rounded-md w-full mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#632b6c]"
                        />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="bg-[#2a2a2d] text-white p-3 rounded-md w-full mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#632b6c]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-[#2a2a2d] text-white p-3 rounded-md w-full mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#632b6c]"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-[#2a2a2d] text-white p-3 rounded-md w-full mb-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#632b6c]"
                        />
                        <p className="text-xs text-gray-400 mb-5">Must be at least 8 characters.</p>

                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2">Avatar:</label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-white"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-400 mb-2">Cover Image:</label>
                            <input
                                type="file"
                                name="coverImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-white"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="bg-[#e473ff] text-black font-bold py-2 px-4 w-full rounded-md hover:bg-[#d862ed] transition duration-200"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-5">
                        Already have an account? <a href="/login" className="text-[#e473ff] hover:underline">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
