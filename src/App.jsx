import "./App.css"
import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Master from "./components/layouts/Master";
import Home from "./components/pages/Home";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Videos from "./components/pages/Videos";
import Channels from "./components/pages/Channels";

function App() {

    // let myVar = import.meta.env.VITE_MY_VAR; //and use it in the following way-
    // <p>my variable = {myVar || "hello"}</p>

    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Master />} >
                        <Route path="/" element={<Home />} />
                        <Route path="/videos" element={<Videos />} />
                        <Route path="/channels" element={<Channels />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
