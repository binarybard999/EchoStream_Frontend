import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"; // Assuming you manage login state locally or through context

export default function Sidebar() {
    const [isLogin, setIsLogin] = useState(false); // Simulating login state

    return (
        <div className="w-44 md:w-52 bg-[#0d0d0f] text-white h-full flex flex-col justify-between py-5 px-2">
            {/* Top Menu */}
            <div>
                <ul className="space-y-6">
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-house" className="w-5 h-5 mr-2" />
                        Home
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-thumbs-up" className="w-5 h-5 mr-2" />
                        Liked Videos
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-history" className="w-5 h-5 mr-2" />
                        History
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-video" className="w-5 h-5 mr-2" />
                        My Content
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-folder" className="w-5 h-5 mr-2" />
                        Collections
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-users" className="w-5 h-5 mr-2" />
                        Subscribers
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-comments" className="w-5 h-5 mr-2" />
                        Community
                    </li>
                </ul>
            </div>

            {/* Bottom Menu */}
            <div>
                <ul className="space-y-6">
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-life-ring" className="w-5 h-5 mr-2" />
                        Support
                    </li>
                    <li className="cursor-pointer flex items-center py-2 px-5 hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff]">
                        <FontAwesomeIcon icon="fa-solid fa-gear" className="w-5 h-5 mr-2" />
                        Settings
                    </li>
                </ul>

                {/* Conditional Login/Logout */}
                <div className="mt-6">
                    {isLogin ? (
                        <button
                            onClick={() => setIsLogin(false)} // Logout action
                            className="w-full py-2 px-5 bg-red-500 rounded-xl hover:bg-red-800 text-white flex justify-center items-center"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsLogin(true)} // Login action for example
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
