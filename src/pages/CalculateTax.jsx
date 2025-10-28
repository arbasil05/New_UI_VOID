import React from 'react'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainGov";
import MainCalculateTax from '../components/MainCalculateTax';

const CalculateTax = ({ session }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed full height */}
            <Sidebar />

            {/* Right Side (Navbar + MainContent) */}
            <div className="flex flex-col flex-1">
                <Navbar session={session}/>
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    <MainCalculateTax/>
                </main>
            </div>
        </div>
    );
}

export default CalculateTax
