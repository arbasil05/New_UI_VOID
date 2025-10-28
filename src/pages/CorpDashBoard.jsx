import React from "react";
import { supabase } from "../utils/supabase-client";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const CorpDashBoard = ({ session }) => {
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success("Logged out successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error.message);
            toast.error("Failed to log out");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Corporate Dashboard
                </h1>
                <p className="text-gray-600 mb-6">
                    Welcome, <span className="font-semibold">{session?.user?.email}</span>
                </p>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default CorpDashBoard;
