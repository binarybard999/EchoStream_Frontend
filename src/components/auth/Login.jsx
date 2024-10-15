import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log("Logging in with data:", formData);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#0d0d0f]">
            <div className="bg-[#1c1d1f] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-white text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#0d0d0f] text-white rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#0d0d0f] text-white rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#e473ff] text-black font-bold py-2 rounded-md hover:bg-[#c653f7] transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

