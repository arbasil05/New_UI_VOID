import React, { useState, useEffect } from "react";
import { Search, FileText, Calculator } from "lucide-react";
import { supabase } from "../utils/supabase-client";
import { ethers } from "ethers";
import { CONTRACT_ABI } from "../utils/contractABI";

const CONTRACT_ADDRESS = "0x8857C91f57f949b56EcE3EA1a03953b21e7129E2";

const MainCalculateTax = () => {
    const [gstin, setGstin] = useState("");
    const [company, setCompany] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [summary, setSummary] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [contract, setContract] = useState(null);
    const [wallet, setWallet] = useState("");

    // ✅ Initialize MetaMask + Contract
    useEffect(() => {
        const initContract = async () => {
            if (!window.ethereum) {
                alert("Please install MetaMask");
                return;
            }

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                setContract(instance);
                setWallet(address);
            } catch (err) {
                console.error("Wallet connect error:", err);
            }
        };

        initContract();
    }, []);

    // ✅ Fetch company details and invoices
    const fetchCompanyData = async () => {
        if (!gstin) {
            alert("Please enter a GSTIN");
            return;
        }

        setLoading(true);
        try {
            // 1️⃣ Fetch company info
            const { data: corpData, error: corpError } = await supabase
                .from("corp_users")
                .select("*")
                .eq("gstin", gstin)
                .single();

            if (corpError || !corpData) {
                alert("No company found for this GSTIN.");
                setCompany(null);
                setInvoices([]);
                setLoading(false);
                return;
            }

            setCompany(corpData);

            // 2️⃣ Fetch invoices within date range
            let query = supabase.from("invoices").select("*").eq("gstin", gstin);
            if (startDate && endDate) {
                query = query.gte("date", startDate).lte("date", endDate);
            }

            const { data: invoiceData, error: invoiceError } = await query;

            if (invoiceError) throw invoiceError;
            setInvoices(invoiceData || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Push invoices to blockchain
    const syncToBlockchain = async () => {
        if (!contract || invoices.length === 0) {
            alert("No invoices to sync!");
            return;
        }

        setLoading(true);
        try {
            for (const inv of invoices) {
                const amt = parseInt(inv.amount);
                if (inv.type.toLowerCase() === "income") {
                    const tx = await contract.addIncome(gstin, amt);
                    await tx.wait();
                } else if (inv.type.toLowerCase() === "expense") {
                    const tx = await contract.addExpense(gstin, amt);
                    await tx.wait();
                }
            }
            alert("✅ Invoices synced to blockchain successfully!");
        } catch (err) {
            console.error("Blockchain sync failed:", err);
            alert("Error syncing to blockchain.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Get on-chain financial summary
    const calculateTax = async () => {
        if (!contract || !gstin) {
            alert("Contract not ready or GSTIN missing.");
            return;
        }

        try {
            setLoading(true);
            const res = await contract.getFinancialSummary(gstin);

            setSummary({
                totalIncome: res.totalIncome?.toString(),
                totalExpense: res.totalExpense?.toString(),
                netProfit: res.netProfit?.toString(),
                gst: res.gst?.toString(),
                tds: res.tds?.toString(),
                corporateTax: res.corporateTax?.toString(),
                professionalTax: res.professionalTax?.toString(),
                tcs: res.tcs?.toString(),
                totalAnnualTaxes: res.totalAnnualTaxes?.toString(),
                totalAllTaxes: res.totalAllTaxes?.toString(),
            });
        } catch (err) {
            console.error("Tax calculation failed:", err);
            alert("Failed to calculate tax.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-bold text-indigo-700">Calculate Tax</h1>
                <p className="text-gray-600 mt-2">
                    Enter a GSTIN and date range to fetch data, sync invoices, and compute taxes on-chain.
                </p>
            </header>

            {/* GSTIN + Date Filter */}
            <section className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="Enter GSTIN (e.g., 27ABCDE1234F1Z5)"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <button
                    onClick={fetchCompanyData}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                    <Search size={18} />
                    {loading ? "Fetching..." : "Fetch Data"}
                </button>
            </section>

            {/* Company Details */}
            {company && (
                <section className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Company Details
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <p><strong>Company Name:</strong> {company.company_name}</p>
                        <p><strong>GSTIN:</strong> {company.gstin}</p>
                        <p><strong>Corporate ID:</strong> {company.id}</p>
                        <p><strong>Status:</strong> {company.is_active ? "Active" : "Inactive"}</p>
                    </div>
                </section>
            )}

            {/* Invoices */}
            {invoices.length > 0 && (
                <section className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Invoices ({invoices.length})
                    </h2>
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="py-2">Invoice ID</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.invoice_number} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{inv.invoice_number}</td>
                                    <td className="py-2">{inv.date}</td>
                                    <td className="py-2">₹{inv.amount}</td>
                                    <td
                                        className={`py-2 font-medium ${inv.type.toLowerCase() === "income"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {inv.type}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* Blockchain Actions */}
            {invoices.length > 0 && (
                <section className="flex flex-wrap gap-4 justify-end">
                    <button
                        onClick={syncToBlockchain}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        <FileText size={20} />
                        {loading ? "Syncing..." : "Sync to Blockchain"}
                    </button>

                    <button
                        onClick={calculateTax}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        <Calculator size={20} />
                        {loading ? "Calculating..." : "Calculate Tax"}
                    </button>
                </section>
            )}

            {/* Tax Summary */}
            {summary && (
                <section className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                        <Calculator size={20} />
                        Tax Summary
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
                        <p><strong>Total Expense:</strong> ₹{summary.totalExpense}</p>
                        <p><strong>Net Profit:</strong> ₹{summary.netProfit}</p>
                        <p><strong>GST:</strong> ₹{summary.gst}</p>
                        <p><strong>TDS:</strong> ₹{summary.tds}</p>
                        <p><strong>Corporate Tax:</strong> ₹{summary.corporateTax}</p>
                        <p><strong>Professional Tax:</strong> ₹{summary.professionalTax}</p>
                        <p><strong>TCS:</strong> ₹{summary.tcs}</p>
                        <p><strong>Total Annual Taxes:</strong> ₹{summary.totalAnnualTaxes}</p>
                        <p><strong>Total All Taxes:</strong> ₹{summary.totalAllTaxes}</p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MainCalculateTax;
