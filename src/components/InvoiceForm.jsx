import React, { useState } from "react";
import { supabase } from "../utils/supabase-client";
import { FileText, Calendar, Hash, IndianRupee, Layers, Fingerprint } from "lucide-react";
import toast from "react-hot-toast";

const InvoiceForm = ({ session }) => {
    const [formData, setFormData] = useState({
        date: "",
        gstin: "",
        invoice_number: "",
        amount: "",
        type: "income",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { date, gstin, invoice_number, amount, type } = formData;

            if (!date || !gstin || !invoice_number || !amount || !type) {
                toast.error("Please fill all fields");
                setLoading(false);
                return;
            }

            const { error } = await supabase.from("invoices").insert([
                {
                    gstin,
                    date,
                    invoice_number,
                    amount: parseFloat(amount),
                    type,
                },
            ]);

            if (error) throw error;

            toast.success("Invoice filed successfully!");
            setFormData({
                date: "",
                gstin: "",
                invoice_number: "",
                amount: "",
                type: "income",
            });
        } catch (err) {
            console.error("Error filing invoice:", err);
            toast.error("Failed to file invoice");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mt-4">
            <h2 className="text-xl font-semibold text-indigo-700 mb-5 flex items-center gap-2">
                <FileText size={20} /> File New Invoice
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Calendar size={14} /> Invoice Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                        required
                    />
                </div>

                {/* GSTIN */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Fingerprint size={14} /> GSTIN
                    </label>
                    <input
                        type="text"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="Enter your GSTIN"
                        className="w-full border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-400 outline-none text-sm uppercase tracking-wide"
                        required
                    />
                </div>

                {/* Invoice Number */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Hash size={14} /> Invoice Number
                    </label>
                    <input
                        type="text"
                        name="invoice_number"
                        value={formData.invoice_number}
                        onChange={handleChange}
                        placeholder="Enter invoice number"
                        className="w-full border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <IndianRupee size={14} /> Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                        required
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Layers size={14} /> Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md text-sm transition"
                >
                    {loading ? "Submitting..." : "Submit Invoice"}
                </button>
            </form>
        </div>
    );
};

export default InvoiceForm;
