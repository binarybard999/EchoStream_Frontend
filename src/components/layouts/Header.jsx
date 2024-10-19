import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext.jsx";

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const { toggleSidebar } = useSidebar(); // Access the toggle function

    return (
        <>
            <header className="bg-[#0d0d0f] text-white flex justify-between items-center px-5 py-3 fixed top-0 w-full">
                {/* Hamburger menu, logo, and website name */}
                <div className="flex">
                    {/* Hamburger menu */}
                    <div className="content-center cursor-pointer block md:hidden" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon="fa-solid fa-bars" className="w-5 h-10" />
                    </div>

                    {/* Logo */}
                    <Link to="/" className="px-3 content-center cursor-pointer">
                        <img src="https://imgs.search.brave.com/KOOIgb6PSGsZwAt4KikyG-HW-RvOhyZyLvc2oV8BKTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAx/MTEzMTEyMzE1L1J1/dGhsZXNzX2NvbXBy/ZXNzZWQuanBn" className="w-[48px] h-[48px] rounded-xl object-cover" alt="EchoStream" />
                    </Link>

                    {/* Website Name */}
                    <Link to="/" className="content-center cursor-pointer font-bold">
                        <h2>EchoStream</h2>
                    </Link>
                </div>

                {/* Navigation links */}
                <div className="hidden min-[1168px]:block mx-8">
                    <ul className="flex justify-center items-center">
                        <li className="me-7">
                            <NavLink
                                to="/"
                                className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="me-7">
                            <NavLink
                                to="/videos"
                                className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2"
                            >
                                Videos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/channels"
                                className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2"
                            >
                                Channels
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Search bar */}
                <div className="content-center w-[35%]">
                    <div className="relative flex items-center justify-end">
                        <input
                            placeholder="Search"
                            name="searchbar"
                            className="bg-[#1c1d1f] text-white rounded-xl h-[100%] w-full px-5 py-3 pl-10 hidden md:block"
                        />
                        <FontAwesomeIcon
                            icon="fa-solid fa-search"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden md:block"
                        />
                        <FontAwesomeIcon icon="fa-solid fa-search" className="block md:hidden" />
                    </div>
                </div>

                {/* Login and Sign Up buttons */}
                {isLogin ? (
                    // Display username and avatar if logged in
                    <div className="hidden min-[700px]:block">
                        <div className="flex content-center">
                            <div id="username" className="px-3 content-center font-bold">
                                Mikael
                            </div>
                            <div className="content-center">
                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1727870845~exp=1727874445~hmac=4d1f524ffcdd4cdd76382ffa3201587c5a5a6c13477ecfcb7f08d89bb637b50e&w=740" className="h-12 w-12 border-[4px] border-[#e473ff] rounded-xl" alt="avatar" />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Login and Register buttons
                    <div className="hidden md:block">
                        <div className="flex">
                            <button
                                className="px-3 py-2 hover:text-[#e473ff]"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </button>
                            <button
                                className="bg-[#e473ff] px-3 py-2 font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                onClick={() => navigate("/register")}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
