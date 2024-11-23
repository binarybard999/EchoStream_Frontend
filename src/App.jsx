import "./App.css"
import React from "react";
import { IsLoginProvider } from './components/contexts/IsLoginContext.jsx';
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Master from "./components/layouts/Master";
import Home from "./components/pages/Home";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Videos from "./components/pages/Videos";
import VideoDetail from "./components/pages/VideoDetail";
import Channels from "./components/pages/Channels";
import ChannelDetail from "./components/pages/ChannelDetail";
import Collections from "./components/pages/Collections.jsx";
import SinglePlaylistView from "./components/pages/SinglePlaylistView.jsx";
import SettingsPage from "./components/user/SettingsPage.jsx";

import SelfChannelDetail from "./components/user/SelfChannelDetail.jsx";
import ViewSubscribers from "./components/user/ViewSubscribers.jsx";

import CommunityHub from "./components/pages/CommunityHub.jsx";
import CreateCommunity from "./components/pages/CreateCommunity.jsx";
import ExploreCommunities from "./components/pages/ExploreCommunities.jsx";
import ChatPage from "./components/pages/ChatPage.jsx";

function App() {

    // let myVar = import.meta.env.VITE_MY_VAR; //and use it in the following way-
    // <p>my variable = {myVar || "hello"}</p>

    return (
        <>
            <IsLoginProvider>
                <BrowserRouter >
                    <Routes>
                        <Route path="/" element={<Master />} >
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/videos" element={<Videos />} />
                            <Route path="/v/:videoId" element={<VideoDetail />} />
                            <Route path="/channels" element={<Channels />} />
                            <Route path="/c/:username" element={<ChannelDetail />} />
                            <Route path="/collections" element={<Collections />} />
                            <Route path="/playlist/:playListId" element={<SinglePlaylistView />} />
                            <Route path="/settings" element={<SettingsPage />} />

                            <Route path="/my-channel" element={<SelfChannelDetail />} />
                            <Route path="/subscribers" element={<ViewSubscribers />} />

                            <Route path="/community" element={<CommunityHub />} />
                            <Route path="/create-community" element={<CreateCommunity />} />
                            <Route path="/explore-communities" element={<ExploreCommunities />} />
                            <Route path="/community/:communityId" element={<ChatPage />} />

                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </IsLoginProvider>
        </>
    )
}

export default App;
