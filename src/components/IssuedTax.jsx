import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase-client";
import {
    BarChart2,
    IndianRupee,
    Calendar,
    FileCheck2,
    Wallet,
} from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";

const IssuedTax = ({ session }) => {
    const [issuedTaxes, setIssuedTaxes] = useState([]);
    const [loading, setLoading] = useState(false);

    const gstin = session?.user?.user_metadata?.gstin || null;

    useEffect(() => {
        const fetchIssuedTaxes = async () => {
            if (!gstin) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("tax_results")
                    .select("*")
                    .eq("gstin", gstin)
                    .order("date_of_issue", { ascending: false });

                if (error) throw error;
                setIssuedTaxes(data || []);
            } catch (err) {
                console.error("Error fetching tax results:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssuedTaxes();
    }, [gstin]);

    return (
        <div className="min-h-screen bg-white py-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <BarChart2 className="text-blue-600" size={28} />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Issued Tax Records
                    </h2>
                </div>

                {/* Loading Animation */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Player
                            autoplay
                            loop
                            src="https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"
                            style={{ height: "150px", width: "150px" }}
                        />
                    </div>
                ) : issuedTaxes.length === 0 ? (
                    // No Data Message
                    <div className="flex flex-col items-center justify-center h-64 bg-white shadow-md rounded-lg">
                        <FileCheck2 className="text-gray-400 mb-3" size={40} />
                        <p className="text-gray-500 text-lg">
                            No tax records found
                        </p>
                    </div>
                ) : (
                    // Table Section
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        <Calendar className="inline mr-1" size={16} />
                                        Date of Issue
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        <Wallet className="inline mr-1" size={16} />
                                        GSTIN
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        <IndianRupee className="inline mr-1" size={16} />
                                        Tax (INR)
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        Tax (ETH)
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {issuedTaxes.map((record) => (
                                    <tr
                                        key={record.id}
                                        className=" hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-gray-800">
                                            {new Date(
                                                record.date_of_issue
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {record.gstin}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ₹{record.tax_inr}
                                        </td>
                                        <td className="px-6 py-4 text-gray-800">
                                            {record.tax_eth} ETH
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full ${record.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {record.status === "paid"
                                                    ? "Paid"
                                                    : "Not Paid"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {record.status === "not_paid" ? (
                                                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-400 text-white cursor-not-allowed"
                                                >
                                                    Paid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssuedTax;
