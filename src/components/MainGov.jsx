import React, { useEffect, useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { supabase } from "../utils/supabase-client";

const MainContent = ({ session }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch all corporate users from Supabase
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data, error } = await supabase
                    .from("corp_users")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setCompanies(data || []);
            } catch (err) {
                console.error("Error fetching companies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div className="bg-white shadow rounded-2xl p-8 space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome, Government Officer
                </h2>
                <p className="text-gray-600">
                    Logged in as{" "}
                    <span className="font-semibold">{session?.user?.email}</span>
                </p>
            </header>

            {/* Company List */}
            <section>
                <h3 className="text-xl font-semibold text-indigo-700 mb-5 flex items-center gap-2">
                    <Building2 size={22} />
                    Registered Corporates
                </h3>

                {loading ? (
                    <p className="text-gray-500">Loading companies...</p>
                ) : companies.length === 0 ? (
                    <p className="text-gray-500 italic">No companies registered yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-gray-700 text-sm uppercase tracking-wide">
                                    <th className="py-3.5 px-6 text-left">Company Name</th>
                                    <th className="py-3.5 px-6 text-left">GSTIN</th>
                                    <th className="py-3.5 px-6 text-left">Email</th>
                                    <th className="py-3.5 px-6 text-left">Phone</th>
                                    <th className="py-3.5 px-6 text-left">Status</th>
                                    <th className="py-3.5 px-6 text-left">Created</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {companies.map((corp, idx) => (
                                    <tr
                                        key={corp.id}
                                        className={`${idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                                            } hover:bg-indigo-50 transition`}
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900">
                                            {corp.company_name}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">{corp.gstin}</td>
                                        <td className="py-4 px-6 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400" />
                                                <span>{corp.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-gray-400" />
                                                <span>{corp.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {corp.is_active ? (
                                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                                    <CheckCircle size={16} /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-500 font-medium">
                                                    <XCircle size={16} /> Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            {new Date(corp.created_at).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
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

export default MainContent;
