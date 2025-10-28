import { useState } from "react";
import { BarChart2, IndianRupee, Calendar, FileCheck2 } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";

const IssuedTax = ({ session }) => {
    const [issuedTaxes, setIssuedTaxes] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-2xl p-8">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                <div className="flex justify-center items-center gap-2">
                    <BarChart2 className="text-indigo-600" size={22} />
                    Taxes Issued by Government
                </div>
            </h2>


            {/* Table / Data */}
            {loading ? (
                <p className="text-gray-500">Loading issued taxes...</p>
            ) : issuedTaxes.length === 0 ? (
                <p className="text-gray-500 italic">
                    <Player
                        autoplay
                        loop
                        src={"/empty.json"}
                        style={{ height: "220px", width: "220px" }}
                    />
                    <p className="text-center mt-3">No tax to pay</p>
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-gray-700 text-sm uppercase tracking-wide">
                                <th className="py-3.5 px-6 text-left">Date</th>
                                <th className="py-3.5 px-6 text-left">GSTIN</th>
                                <th className="py-3.5 px-6 text-left">Total Income</th>
                                <th className="py-3.5 px-6 text-left">Total Expense</th>
                                <th className="py-3.5 px-6 text-left">Tax Payable</th>
                                <th className="py-3.5 px-6 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {issuedTaxes.map((record, idx) => (
                                <tr
                                    key={record.id}
                                    className={`${idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                                        } hover:bg-indigo-50 transition`}
                                >
                                    <td className="py-4 px-6 text-gray-700 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        {new Date(record.created_at).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{record.gstin}</td>
                                    <td className="py-4 px-6 text-gray-700 font-medium">
                                        ₹{record.total_income || 0}
                                    </td>
                                    <td className="py-4 px-6 text-gray-700 font-medium">
                                        ₹{record.total_expense || 0}
                                    </td>
                                    <td className="py-4 px-6 text-indigo-700 font-semibold">
                                        ₹{record.tax_amount || 0}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`flex items-center gap-1 text-sm ${record.status === "paid"
                                                ? "text-green-600"
                                                : "text-amber-600"
                                                }`}
                                        >
                                            <FileCheck2 size={15} />
                                            {record.status || "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default IssuedTax;
