import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userService } from "../../api";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await userService.loginUser(formData); // Call the loginUser function

            setLoading(false);
            toast.success("Login successful! Redirecting...");

            // Check response for status or data needed
            console.log("Login successful:", response);

            // Redirect or additional logic can go here
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#101010] px-4">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
            <div className="w-full max-w-md bg-[#1a1a1d] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full bg-[#262626] text-white p-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e473ff]"
                        onChange={handleInputChange}
                        value={formData.password}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#e473ff] text-black font-bold py-4 rounded-lg hover:bg-[#6e2b7e] transition duration-200 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <FaSpinner className="animate-spin mr-2" /> : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#e473ff] hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
