import React from "react";
import {
    Home,
    FileText,
    History,
    BarChart2,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidebarCorp = ({ session }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <aside className="h-screen w-64 bg-indigo-800 text-white shadow-xl flex flex-col justify-between p-5">
            {/* Top section */}
            <div>
                <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
                    TaxChain
                </h2>

                <nav className="space-y-2">
                    <SidebarLink
                        icon={<Home size={22} />}
                        label="Dashboard"
                        onClick={() => handleNavigation("/corp-dashboard")}
                    />
                    <SidebarLink
                        icon={<FileText size={22} />}
                        label="Manage Invoices"
                        onClick={() => handleNavigation("/manage-invoices")}
                    />
                    <SidebarLink
                        icon={<BarChart2 />}
                        label="Issued Tax"
                        onClick={() => handleNavigation("/issued-tax")}
                    />
                    <SidebarLink
                        icon={<History size={22} />}
                        label="Tax History"
                        onClick={() => handleNavigation("/tax-history")}
                    />

                </nav>
            </div>
        </aside>
    );
};

const SidebarLink = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-3 text-indigo-100 hover:bg-indigo-700 w-full px-3 py-2 rounded-lg transition cursor-pointer"
    >
        {icon}
        <span className="text-base font-medium">{label}</span>
    </button>
);

export default SidebarCorp;
