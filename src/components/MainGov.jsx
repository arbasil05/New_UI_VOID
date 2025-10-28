import {
    BarChart2,
    Building2,
    FileClock,
    IndianRupee,
} from "lucide-react";
import CorporateVerificationPanel from "./CorporateList";

const MainContent = ({ session }) => {
    return (
        <>
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome, Government Officer
                </h2>

                <p className="text-gray-600 mb-4">
                    You are logged in as{" "}
                    <span className="font-semibold">{session?.user?.email}</span>
                </p>

                {/* Grid with 4 equal columns */}
                <div className="grid grid-cols-4 gap-6 mt-8">
                    <Card
                        title="Total Corporates"
                        value="1219"
                        icon={<Building2 size={40} className="text-amber-500" />}
                        color="bg-amber-50 border-amber-200"
                    />
                    <Card
                        title="Total Invoices"
                        value="34"
                        icon={<FileClock size={40} className="text-green-500" />}
                        color="bg-green-50 border-green-200"
                    />
                    <Card
                        title="Total Income Reported"
                        value="₹42,000"
                        icon={<IndianRupee size={40} className="text-indigo-500" />}
                        color="bg-indigo-50 border-indigo-200"
                    />
                    <Card
                        title="Total Tax"
                        value="₹18,000"
                        icon={<BarChart2 size={40} className="text-fuchsia-400" />}
                        color="bg-fuchsia-50 border-fuchsia-200"
                    />
                </div>

            </div>

            <div>
                <CorporateVerificationPanel />
            </div>
        </>
    );
};

const Card = ({ title, value, icon, color }) => (
    <div
        className={`p-4 rounded-lg border shadow-sm ${color} text-center flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105`}
    >
        <div>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default MainContent;
