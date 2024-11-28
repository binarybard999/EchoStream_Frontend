import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChannelHeader({ channel, onEditProfile }) {
    return (
        <div>
            <div className="relative">
                <img
                    src={channel.coverImage}
                    alt={`${channel.name} cover`}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-5 transform translate-y-1/2">
                    <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d0f]"
                    />
                </div>
            </div>
            <div className="mt-14 ml-36 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <p className="text-gray-400">{channel.username}</p>
                    <p className="text-gray-400">{channel.subscribers} | {channel.subscribed}</p>
                    <p className="text-gray-400">{channel.description}</p>
                </div>
                <button
                    onClick={onEditProfile}
                    className="px-4 py-2 bg-[#e473ff] text-black font-bold rounded-md shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                >
                    <FontAwesomeIcon icon="fa-solid fa-user-edit" className="mr-2" />
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
