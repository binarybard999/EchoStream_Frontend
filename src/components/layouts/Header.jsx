// src/components/Header.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext.jsx";
import axios from "axios";
import { useIsLogin } from "../contexts/IsLoginContext.jsx";
import { userService } from "../../api/index.js";

export default function Header() {
    const { isLogin, setLoginState } = useIsLogin();
    const [user, setUser] = useState({});
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();
    const { toggleSidebar } = useSidebar();
    const handleSearchToggle = () => setIsSearchVisible((prev) => !prev);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            setLoginState(false);
            try {
                const response = await userService.getCurrentUser();
                setUser(response.data);
                // console.log(response.data.data);
                setLoginState(true);
            } catch (error) {
                console.error('Error fetching current user:', error);
                // Handle errors, e.g., redirect to login or display an error message
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <>
            <header className="bg-[#0d0d0f] text-white flex justify-between items-center px-5 py-3 fixed top-0 w-full z-20">
                <div className="flex">
                    <div className="content-center cursor-pointer block md:hidden" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon="fa-solid fa-bars" className="w-5 h-10" />
                    </div>

                    <Link to="/" className="px-3 content-center cursor-pointer">
                        {/* <img src="https://imgs.search.brave.com/KOOIgb6PSGsZwAt4KikyG-HW-RvOhyZyLvc2oV8BKTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAx/MTEzMTEyMzE1L1J1/dGhsZXNzX2NvbXBy/ZXNzZWQuanBn" className="w-[48px] h-[48px] rounded-xl object-cover" alt="EchoStream" /> */}
                        <img src="/logo.jpg" className="w-[48px] h-[48px] rounded-xl object-cover" alt="EchoStream" />
                    </Link>

                    <Link to="/" className="content-center cursor-pointer font-bold">
                        <h2>EchoStream</h2>
                    </Link>
                </div>

                <div className="hidden min-[1168px]:block mx-8">
                    <ul className="flex justify-center items-center">
                        <li className="me-7">
                            <NavLink to="/" className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">
                                Home
                            </NavLink>
                        </li>
                        <li className="me-7">
                            <NavLink to="/videos" className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">
                                Videos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/channels" className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">
                                Channels
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="content-center w-[35%]">
                    <div className="relative flex items-center justify-end">
                        <input
                            placeholder="Search"
                            name="searchbar"
                            className="bg-[#1c1d1f] text-white rounded-xl h-[100%] w-full px-5 py-3 pl-10 hidden md:block"
                        />
                        <FontAwesomeIcon icon="fa-solid fa-search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden md:block" />
                        <FontAwesomeIcon icon="fa-solid fa-search" className="block md:hidden cursor-pointer" onClick={handleSearchToggle} />
                    </div>
                </div>

                {isLogin && user ? (
                    <div className="hidden min-[700px]:block">
                        <div className="flex content-center">
                            <div id="username" className="px-3 content-center font-bold">
                                {user.fullName}
                            </div>
                            <Link className="content-center" to="/settings">
                                <img src={user.avatar} className="h-12 w-12 border-[4px] border-[#e473ff] rounded-xl" alt="avatar" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:block">
                        <div className="flex">
                            <button className="px-3 py-2 hover:text-[#e473ff]" onClick={() => navigate("/login")}>
                                Log in
                            </button>
                            <button
                                className="bg-[#e473ff] px-3 py-2 font-bold text-black rounded-md shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                onClick={() => navigate("/register")}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {isSearchVisible && (
                <div className="md:hidden fixed top-[4rem] left-0 w-full bg-[#0d0d0f] p-3 z-10">
                    <input type="text" placeholder="Search" className="w-full bg-[#1c1d1f] text-white p-3 rounded-xl focus:outline-none" />
                </div>
            )}
        </>
    );
}
