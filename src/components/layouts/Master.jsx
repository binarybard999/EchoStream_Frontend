import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Master() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Main content area with Sidebar and page content */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar isCollapsed={isSidebarCollapsed} />

                {/* Page content rendered here via Outlet */}
                <div className="flex-grow bg-gray-900 border-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

