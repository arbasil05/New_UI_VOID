import React from "react";
import { supabase } from "../utils/supabase-client";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import CorporateDashboard from "./CorpDashBoard";
import GovernmentDashboard from "./GovDashboard";

const Dashboard = ({ session }) => {
    const role = session?.user?.user_metadata?.role;
    const isCorporate = !!role; 

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

    const renderDashboard = () => {
        if (isCorporate) {
            return <CorporateDashboard session={session} onLogout={handleLogout} />;
        } else {
            return <GovernmentDashboard session={session} onLogout={handleLogout} />;
        }
    };

    return renderDashboard();
};

export default Dashboard;
