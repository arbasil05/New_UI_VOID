import Navbar from "../components/Navbar";
import SidebarCorp from "../components/SidebarCorp";
import MainCorp from "../components/MainCorp";

const CorporateDashboard = ({ session, onLogout }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed full height */}
            <SidebarCorp session={session} />

            {/* Right Side (Navbar + MainContent) */}
            <div className="flex flex-col flex-1">
                <Navbar session={session} onLogout={onLogout} />
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    {/* <MainContent session={session} /> */}
                    <MainCorp />
                </main>
            </div>
        </div>
    );
};

export default CorporateDashboard;
