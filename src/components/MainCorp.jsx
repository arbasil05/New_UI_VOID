import React, { useEffect, useState } from "react";
import {
    FileText,
    IndianRupee,
    BarChart2,
    Calendar,
    TrendingUp,
} from "lucide-react";
import { supabase } from "../utils/supabase-client";

const MainCorp = ({ session }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalInvoices: 0,
        totalIncome: 0,
        totalTax: 0,
    });

    // ✅ Fetch invoices of the logged-in corporate
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Get company GSTIN from user metadata
                const gstin = session?.user?.user_metadata?.gstin;

                if (!gstin) {
                    console.warn("No GSTIN found for this user");
                    return;
                }

                const { data, error } = await supabase
                    .from("invoices")
                    .select("*")
                    .eq("gstin", gstin)
                    .order("created_at", { ascending: false });

                if (error) throw error;

                setInvoices(data || []);
                calculateStats(data);
            } catch (err) {
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [session]);

    // ✅ Compute totals
    const calculateStats = (data) => {
        let totalIncome = 0;
        let totalTax = 0;

        data.forEach((invoice) => {
            if (invoice.type === "income") totalIncome += invoice.amount;
            if (invoice.tax_paid) totalTax += invoice.tax_paid;
        });

        setStats({
            totalInvoices: data.length,
            totalIncome,
            totalTax,
        });
    };

    return (
        <div className="bg-white shadow rounded-2xl p-8 space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome, {session?.user?.user_metadata?.company_name || "Corporate User"}
                </h2>
                <p className="text-gray-600">
                    Logged in as{" "}
                    <span className="font-semibold">{session?.user?.email}</span>
                </p>
            </header>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <StatCard
                    title="Total Transactions"
                    value={stats.totalInvoices}
                    icon={<FileText size={40} className="text-indigo-500" />}
                    color="bg-indigo-50 border-indigo-200"
                />
                <StatCard
                    title="Total Income"
                    value={`₹${stats.totalIncome.toLocaleString()}`}
                    icon={<IndianRupee size={40} className="text-green-500" />}
                    color="bg-green-50 border-green-200"
                />
                <StatCard
                    title="Total Tax Paid"
                    value={`₹${stats.totalTax.toLocaleString()}`}
                    icon={<BarChart2 size={40} className="text-amber-500" />}
                    color="bg-amber-50 border-amber-200"
                />
            </section>

            {/* Transactions Table */}
            <section>
                <h3 className="text-xl font-semibold text-indigo-700 mb-5 flex items-center gap-2">
                    <TrendingUp size={22} />
                    Recent Transactions
                </h3>

                {loading ? (
                    <p className="text-gray-500">Loading transactions...</p>
                ) : invoices.length === 0 ? (
                    <p className="text-gray-500 italic">No transactions found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-gray-700 text-sm uppercase tracking-wide">
                                    <th className="py-3.5 px-6 text-left">Invoice No</th>
                                    <th className="py-3.5 px-6 text-left">Type</th>
                                    <th className="py-3.5 px-6 text-left">Amount</th>
                                    <th className="py-3.5 px-6 text-left">Tax Paid</th>
                                    <th className="py-3.5 px-6 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {invoices.map((inv, idx) => (
                                    <tr
                                        key={inv.id}
                                        className={`${idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                                            } hover:bg-indigo-50 transition`}
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900">
                                            {inv.invoice_number || `INV-${inv.id.slice(0, 6)}`}
                                        </td>
                                        <td className="py-4 px-6 capitalize text-gray-700">
                                            {inv.type}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">
                                            ₹{inv.amount.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">
                                            ₹{(inv.tax_paid || 0).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(inv.created_at).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

// ✅ Card Component
const StatCard = ({ title, value, icon, color }) => (
    <div
        className={`p-5 rounded-lg border shadow-sm ${color} text-center flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105`}
    >
        <div>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default MainCorp;
