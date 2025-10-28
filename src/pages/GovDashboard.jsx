import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainGov";

const GovernmentDashboard = ({ session, onLogout }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed full height */}
            <Sidebar />

            {/* Right Side (Navbar + MainContent) */}
            <div className="flex flex-col flex-1">
                <Navbar session={session} onLogout={onLogout} />
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    <MainContent session={session} />
                </main>
            </div>
        </div>
    );
};

export default GovernmentDashboard;
