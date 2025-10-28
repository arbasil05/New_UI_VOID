import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase-client";
import { FileText, Calendar, IndianRupee, Layers } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";

const GetInvoice = ({ session }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    const gstin = session?.user?.user_metadata?.gstin || null;

    useEffect(() => {
        const fetchInvoices = async () => {
            if (!gstin) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("invoices")
                    .select("*")
                    .eq("gstin", gstin)
                    .order("date", { ascending: false });

                if (error) throw error;
                setInvoices(data || []);
            } catch (err) {
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [gstin]);

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto mt-10">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4 flex items-center justify-center gap-2">
                <FileText size={22} /> Your Filed Invoices
            </h2>

            {/* GSTIN Info */}
            <div className="text-center text-sm text-gray-600 mb-6">
                <p>
                    <span className="font-semibold text-gray-800">GSTIN:</span>{" "}
                    {gstin || "Not Available"}
                </p>
            </div>

            {/* Table / Empty State */}
            {loading ? (
                <p className="text-gray-500 text-center">Loading your invoices...</p>
            ) : invoices.length === 0 ? (
                <div className="flex flex-col items-center text-gray-500 mt-4">
                    <Player autoplay loop src="/empty.json" style={{ height: 200, width: 200 }} />
                    <p className="italic mt-3">No invoices found for your GSTIN</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left text-gray-700">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                            <tr>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Invoice No.</th>
                                <th className="py-3 px-6">Type</th>
                                <th className="py-3 px-6">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv, idx) => (
                                <tr
                                    key={inv.id}
                                    className={`transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-indigo-50`}
                                >
                                    {/* Date */}
                                    <td className="py-3 px-6 flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        {new Date(inv.date).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>

                                    {/* Invoice No */}
                                    <td className="py-3 px-6 font-medium text-gray-800">
                                        {inv.invoice_number}
                                    </td>

                                    {/* Type */}
                                    <td className="py-3 px-6 flex items-center gap-1 font-medium">
                                        <Layers
                                            size={16}
                                            className={
                                                inv.type === "income" ? "text-green-600" : "text-red-600"
                                            }
                                        />
                                        <span
                                            className={
                                                inv.type === "income" ? "text-green-600" : "text-red-600"
                                            }
                                        >
                                            {inv.type}
                                        </span>
                                    </td>

                                    {/* Amount */}
                                    <td className="py-3 px-6 text-indigo-700 font-semibold flex items-center gap-1">
                                        <IndianRupee size={15} />
                                        {inv.amount.toLocaleString("en-IN")}
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

export default GetInvoice;
