import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext.jsx";
import { useIsLogin } from "../contexts/IsLoginContext.jsx";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export default function Sidebar() {
    const { isLogin, setLoginState } = useIsLogin();
    const { isSidebarOpen } = useSidebar();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = async () => {
        setLoading(true);
        try {
            await axios.post("/api/users/logout", {}, { withCredentials: true });
            setLoginState(false);
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { name: "Home", icon: "fa-solid fa-house", path: "/" },
        { name: "Liked Videos", icon: "fa-solid fa-thumbs-up", path: "/liked-videos" },
        { name: "History", icon: "fa-solid fa-history", path: "/history" },
        { name: "My Content", icon: "fa-solid fa-video", path: "/my-channel" },
        { name: "Collections", icon: "fa-solid fa-folder", path: "/collections" },
        { name: "Subscribers", icon: "fa-solid fa-users", path: "/subscribers" },
        { name: "Community", icon: "fa-solid fa-comments", path: "/community" },
    ];

    const bottomMenuItems = [
        { name: "Support", icon: "fa-solid fa-life-ring", path: "/support" },
        { name: "Settings", icon: "fa-solid fa-gear", path: "/settings" },
    ];

    return (
        <div className={`w-52 md:w-52 bg-[#0d0d0f] text-white h-[calc(100vh-4rem)] fixed top-16 ${isSidebarOpen ? 'block' : 'hidden'} md:flex flex-col justify-between py-5 px-2 overflow-y-auto z-50`}>
            {/* Top Menu */}
            <div>
                <ul className="space-y-6">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-5 rounded-xl ${isActive ? 'bg-[#1c1d1f] text-[#e473ff]' : 'hover:bg-[#1c1d1f] hover:text-[#e473ff]'
                                    }`
                                }
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-2" />
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Menu */}
            <div>
                <ul className="space-y-6 mt-6">
                    {bottomMenuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-5 rounded-xl ${isActive ? 'bg-[#1c1d1f] text-[#e473ff]' : 'hover:bg-[#1c1d1f] hover:text-[#e473ff]'
                                    }`
                                }
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-2" />
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Conditional Login/Logout */}
                <div className="mt-6">
                    {isLogin ? (
                        <button
                            onClick={handleLogoutClick}
                            disabled={loading}
                            className="w-full py-2 px-5 bg-red-500 rounded-xl hover:bg-red-800 text-white flex justify-center items-center"
                        >
                            {loading ? <FaSpinner className="animate-spin mr-2" /> : (
                                <>
                                    <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" className="w-5 h-5 mr-2" />
                                    Logout
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="w-full py-2 px-5 bg-[#da4cfd] rounded-xl hover:bg-[#6e2b7e] text-white flex justify-center items-center"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-sign-in-alt" className="w-5 h-5 mr-2" />
                            Login/Signup
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
