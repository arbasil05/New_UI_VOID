import React from "react";
import { Home, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ session }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <aside className="h-screen w-64 bg-indigo-800 text-white shadow-lg flex flex-col p-5">
            <h2 className="text-4xl font-semibold mb-8 text-center">Taxchain</h2>
            <nav className="space-y-3">
                <SidebarLink
                    icon={<Home size={22} />}
                    label="Overview"
                    onClick={() => handleNavigation("/gov-dashboard")}
                />
                <SidebarLink
                    icon={<Calculator size={22} />}
                    label="Calculate Tax"
                    onClick={() => handleNavigation("/calculate-tax")}
                />
            </nav>
        </aside>
    );
};

const SidebarLink = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-3 text-indigo-100 hover:bg-indigo-700 w-full px-3 py-2 rounded-lg transition cursor-pointer"
    >
        {icon}
        <span className="text-lg font-medium">{label}</span>
    </button>
);

export default Sidebar;
