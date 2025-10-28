import React from "react";
import { LogOut } from "lucide-react";
import { supabase } from "../utils/supabase-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ session }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success("Logged out successfully!");
            navigate("/"); // go back to login page
        } catch (error) {
            console.error("Logout error:", error.message);
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-indigo-600 text-white shadow-md">
            <h1 className="text-xl font-semibold">
                Hello, {session?.user?.email || "User"}
            </h1>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
