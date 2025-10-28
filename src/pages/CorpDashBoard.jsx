import React from "react";
import { LogOut } from "lucide-react";

const CorporateDashboard = ({ session, onLogout }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Corporate Dashboard</h1>

                <p className="text-gray-600 mb-6">
                    Welcome, <span className="font-semibold">{session?.user?.email}</span>
                </p>

                <p className="text-gray-500 mb-6">
                    Role: <span className="font-medium text-indigo-600">corporate</span>
                </p>

                <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default CorporateDashboard;
