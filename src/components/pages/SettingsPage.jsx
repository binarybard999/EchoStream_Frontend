import React, { useState, useEffect } from "react";
import { userService } from "../../api";  // Assume userService handles API calls
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";

export default function SettingsPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        fullName: "",
        avatar: "",
        coverImage: "",
        password: "",
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userService.getCurrentUser();  // Fetch user data from backend
                setUser(response.data);
            } catch (error) {
                toast.error("Failed to load user data.");
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "avatar") setAvatarFile(files[0]);
        if (name === "coverImage") setCoverFile(files[0]);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("fullName", user.fullName);
        formData.append("password", user.password);
        if (avatarFile) formData.append("avatar", avatarFile);
        if (coverFile) formData.append("coverImage", coverFile);

        try {
            const response = await userService.updateAccountDetails(formData);  // Update user data on backend
            setUser(response.data);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="bg-[#101010] text-white p-5 h-full flex justify-center md:ml-52 pt-16">
            <div className="bg-[#1a1a1d] rounded-lg p-6 max-w-4xl w-full flex flex-col items-center">
                {/* Cover Image */}
                <div className="w-full relative mb-6">
                    <img
                        src={coverFile ? URL.createObjectURL(coverFile) : user.coverImage}
                        alt="Cover"
                        className="w-full h-36 object-cover rounded-lg"
                    />
                    <label htmlFor="coverImage" className="absolute top-40 right-2 cursor-pointer z-10">
                        <FontAwesomeIcon icon={faPencilAlt} className="text-gray-400 hover:text-[#e473ff] text-xl" />
                    </label>
                    <input
                        type="file"
                        name="coverImage"
                        id="coverImage"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                <div className="flex w-full space-x-6">
                    {/* Avatar Image */}
                    <div className="relative flex">
                        <img
                            src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
                            alt="Avatar"
                            className="w-24 h-24 object-cover rounded-full border-4 border-[#262626]"
                        />
                        <label htmlFor="avatar" className="absolute top-24 right-0 cursor-pointer">
                            <FontAwesomeIcon icon={faPencilAlt} className="text-gray-400 hover:text-[#e473ff]" />
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    {/* User Details */}
                    <div className="flex-grow space-y-4">
                        <div>
                            <label className="block text-gray-400">Username</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#262626] text-white p-3 pl-10 rounded-lg focus:outline-none"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400">Email</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#262626] text-white p-3 pl-10 rounded-lg focus:outline-none"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleInputChange}
                                className="w-full bg-[#262626] text-white p-3 rounded-lg focus:outline-none"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Password</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#262626] text-white p-3 pl-10 rounded-lg focus:outline-none"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full mt-6 bg-[#e473ff] text-black py-3 rounded-lg font-bold hover:bg-[#6e2b7e] transition duration-200"
                >
                    <FontAwesomeIcon icon={faSave} className="text-white text-xl mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}