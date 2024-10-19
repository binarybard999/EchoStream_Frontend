import Header from "./Header";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext.jsx";
import { Outlet } from "react-router-dom";

export default function Master() {
    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen">
                {/* Header */}
                <Header />

                {/* Main content area with Sidebar and page content */}
                <div className="flex flex-grow">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Page content rendered here via Outlet */}
                    <div className="flex-grow pt-5 border-2 bg-gray-900">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
