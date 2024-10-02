import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <header className="bg-[#0d0d0f] text-white flex justify-between items-center px-5 py-3">

                {/* hamburger menu, logo and website name*/}
                <div className="flex">

                    {/* hamburger menu */}
                    <div className="content-center cursor-pointer">
                        <FontAwesomeIcon icon="fa-solid fa-bars" className="w-5 h-10" />
                    </div>

                    {/* logo */}
                    <div className="px-3 content-center cursor-pointer">
                        <img src="https://imgs.search.brave.com/KOOIgb6PSGsZwAt4KikyG-HW-RvOhyZyLvc2oV8BKTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAx/MTEzMTEyMzE1L1J1/dGhsZXNzX2NvbXBy/ZXNzZWQuanBn" className="w-[48px] h-[48px] rounded-xl object-cover" alt="EchoStream" />
                    </div>

                    {/* websiteName */}
                    <div className="content-center cursor-pointer font-bold">
                        <h2>EchoStream</h2>
                    </div>
                </div>

                {/* ul list for navigation */}
                <div className="hidden min-[1168px]:block mx-8">
                    <ul className="flex justify-center items-center">
                        <li className="me-7 font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">Home</li>
                        <li className="me-7 font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">Videos</li>
                        <li className="font-semibold cursor-pointer hover:bg-[#1c1d1f] rounded-xl hover:text-[#e473ff] px-5 py-2">Channels</li>
                    </ul>
                </div>

                {/* searchbar */}
                <div className="content-center w-[35%]">
                    <div className="relative flex items-center justify-end">
                        {/* Input Field */}
                        <input
                            placeholder="Search"
                            name="searchbar"
                            className="bg-[#1c1d1f] text-white rounded-xl h-[100%] w-full px-5 py-3 pl-10 hidden md:block"
                        />
                        {/* Search Icon */}
                        <FontAwesomeIcon
                            icon="fa-solid fa-search"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden md:block"
                        />
                        <FontAwesomeIcon icon="fa-soild fa-search" className="block md:hidden" />
                    </div>
                </div>


                {/* login and sign up buttons */}
                {isLogin ?
                    // username and avatar
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
                    :
                    // login and signup button
                    <div className="hidden md:block">
                        <div className="flex">
                            <button className="px-3 py-2">Log in</button>
                            <button
                                className="bg-[#e473ff] px-3 py-2 font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                                Sign up
                            </button>
                        </div>
                    </div>
                }
            </header>
        </>
    );
}
