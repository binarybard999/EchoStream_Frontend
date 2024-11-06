import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userService } from "../../api"; // Adjust the path based on your project structure
import { FaSpinner } from "react-icons/fa"; // Spinner icon for loading

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: null,
        coverImage: null,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        if (formData.avatar) formDataToSend.append("avatar", formData.avatar);
        if (formData.coverImage) formDataToSend.append("coverImage", formData.coverImage);

        setLoading(true); // Start loading

        try {
            const response = await userService.registerUser(formDataToSend);
            toast.success(response.message || "User registered successfully!");

            // Clear form after successful registration
            setFormData({
                fullName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                avatar: null,
                coverImage: null,
            });

            // Redirect to the login page
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
            console.error("Error registering user:", error.response ? error.response : error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#101010] px-4">
            <div className="w-full max-w-lg bg-[#1a1a1d] rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-white mb-4">Create an Account</h2>
                <p className="text-center text-gray-400 mb-6">Join the community and start sharing your content!</p>

                {/* Social Login Buttons */}
                <div className="flex gap-4 mb-8">
                    <button className="flex-1 bg-[#333] text-white py-3 rounded-lg hover:bg-[#444] transition">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Sign up with Google
                    </button>
                    <button className="flex-1 bg-[#333] text-white py-3 rounded-lg hover:bg-[#444] transition">
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        Sign up with GitHub
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="text-gray-500">or</span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        required
                    />
                    <div className="flex gap-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                            required
                        />
                    </div>

                    {/* File Upload for Avatar and Cover Image */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="text-gray-400">
                            <span>Avatar</span>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleFileChange}
                                className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-black file:font-bold hover:file:bg-[#6e2b7e]"
                                accept="image/*"
                                required
                            />
                        </label>
                        <label className="text-gray-400">
                            <span>Cover Image</span>
                            <input
                                type="file"
                                name="coverImage"
                                onChange={handleFileChange}
                                className="block w-full mt-2 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#e473ff] file:text-black file:font-bold hover:file:bg-[#6e2b7e]"
                                accept="image/*"
                                required
                            />
                        </label>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#e473ff] text-black py-4 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Sign Up"}
                    </button>
                </form>

                {/* Redirect to Login */}
                <p className="text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#e473ff] hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
