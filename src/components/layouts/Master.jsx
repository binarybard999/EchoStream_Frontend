import Header from "./Header";
import Sidebar from "./Sidebar"; // Import Sidebar component
import { Outlet } from "react-router-dom";

export default function Master() {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header />

            {/* Main content area with Sidebar and page content */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />

                {/* Page content rendered here via Outlet */}
                <div className="flex-grow p-5 bg-gray-900">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
