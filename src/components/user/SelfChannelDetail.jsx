import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useIsLogin } from "../contexts/IsLoginContext.jsx";
import axios from "axios";
import ChannelHeader from "./components/ChannelHeader";
import Tabs from "./components/Tabs";
import VideoSection from "./components/VideoSection";
import CollectionSection from "./components/CollectionSection";
import TweetSection from "./components/TweetSection";
import SubscribedSection from "./components/SubscribedSection";
import { userService } from "../../api";

export default function SelfChannelDetail() {
    const [activeTab, setActiveTab] = useState("Videos");
    const [channel, setChannel] = useState({
        name: "",
        username: "",
        subscribers: "",
        subscribed: "",
        coverImage: "",
        avatar: "",
    });
    const { isLogin } = useIsLogin();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userService.getCurrentUser();
                const userData = response.data;
                setChannel({
                    name: userData.fullName,
                    username: `@${userData.username}`,
                    subscribers: `${userData.subscribersCount || 0} subscribers`,
                    subscribed: `${userData.channelsSubscribedToCount || 0} subscribed`,
                    coverImage: userData.coverImage,
                    avatar: userData.avatar,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (isLogin) fetchUserData();
    }, [isLogin]);

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    const tabs = ["Videos", "Collections", "Tweets", "Subscribed"];

    return (
        <div className="bg-[#0d0d0f] text-white p-5 h-full md:ml-52 pt-16">
            <ChannelHeader channel={channel} onEditProfile={() => navigate("/settings")} />
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="mt-5">
                {activeTab === "Videos" && <VideoSection />}
                {activeTab === "Collections" && <CollectionSection />}
                {activeTab === "Tweets" && <TweetSection />}
                {activeTab === "Subscribed" && <SubscribedSection />}
            </div>
        </div>
    );
}
