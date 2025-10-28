import React from "react";
import { Eye, Calculator } from "lucide-react";

const CorporateVerificationPanel = () => {
    const corporates = [
        {
            id: "C001",
            name: "Alpha Pvt Ltd",
            gstin: "27ABCDE1234F1Z5",
            status: "Verified",
            lastUpdated: "2025-10-19",
        },
        {
            id: "C002",
            name: "Tech Solutions Pvt Ltd",
            gstin: "29AABCT1332L1ZV",
            status: "Verified",
            lastUpdated: "2025-10-27",
        },
        {
            id: "C003",
            name: "Global Industries Inc",
            gstin: "27AABCG1234F1Z5",
            status: "Pending",
            lastUpdated: "2025-10-26",
        },
        {
            id: "C004",
            name: "Manufacturing Corp",
            gstin: "24AABCU9603R1ZX",
            status: "Verified",
            lastUpdated: "2025-10-27",
        },
        {
            id: "C005",
            name: "Retail Enterprises",
            gstin: "09AABCR3452K1Z8",
            status: "Pending",
            lastUpdated: "2025-10-25",
        },
    ];

    const getStatusStyle = (status) => {
        if (status === "Verified") return "text-green-700 bg-green-100";
        if (status === "Pending") return "text-amber-700 bg-amber-100";
        return "text-gray-700 bg-gray-100";
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Corporate Verification Panel
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Corporate ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Company Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">GSTIN</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Last Updated</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {corporates.map((corp) => (
                            <tr
                                key={corp.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-800 font-medium">{corp.id}</td>
                                <td className="px-6 py-4 text-gray-700">{corp.name}</td>
                                <td className="px-6 py-4 text-gray-700">{corp.gstin}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
                                            corp.status
                                        )}`}
                                    >
                                        {corp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{corp.lastUpdated}</td>
                                <td className="px-6 py-4 flex items-center justify-center gap-3">
                                    <button className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-md font-medium hover:bg-blue-200 transition">
                                        <Eye size={16} />
                                        View
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-600 rounded-md font-medium hover:bg-green-200 transition">
                                        <Calculator size={16} />
                                        Calculate Tax
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CorporateVerificationPanel;
