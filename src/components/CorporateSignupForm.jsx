import React, { useState } from "react";
import { User, FileText, Lock, Building2, Mail, Phone } from "lucide-react";
import { supabase } from "../utils/supabase-client";
import toast from "react-hot-toast";

const CorporateSignupForm = ({ onLoginClick }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        gstin: "",
        company_name: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { username, password, gstin, company_name, email, phone } = formData;

        if (!username || !password || !gstin || !email) {
            toast.error("Please fill all required fields");
            setLoading(false);
            return;
        }

        try {
            // 🧠 Step 1️⃣: Check if GSTIN already exists
            const { data: existingGSTIN, error: gstError } = await supabase
                .from("corp_users")
                .select("gstin")
                .eq("gstin", gstin)
                .maybeSingle();

            if (gstError) throw gstError;

            if (existingGSTIN) {
                toast.error("This GSTIN is already registered.");
                setLoading(false);
                return;
            }

            // 🪄 Step 2️⃣: Create user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: "corporate",
                        gstin,
                        username,
                        company_name,
                    },
                },
            });

            if (authError) throw authError;

            // 🧾 Step 3️⃣: Insert into corp_users table
            const { error: insertError } = await supabase.from("corp_users").insert([
                {
                    username,
                    gstin,
                    company_name,
                    email,
                    phone,
                    is_active: true,
                },
            ]);

            if (insertError) throw insertError;

            toast.success("Corporate account created successfully!");
            setFormData({
                username: "",
                password: "",
                gstin: "",
                company_name: "",
                email: "",
                phone: "",
            });
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(err.message || "Something went wrong during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Corporate Signup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <User size={16} className="inline mr-2" /> Username *
                    </label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <FileText size={16} className="inline mr-2" /> GSTIN *
                    </label>
                    <input
                        name="gstin"
                        type="text"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="29ABCDE1234F1Z5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 uppercase"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Lock size={16} className="inline mr-2" /> Password *
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Building2 size={16} className="inline mr-2" /> Company Name
                    </label>
                    <input
                        name="company_name"
                        type="text"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Mail size={16} className="inline mr-2" /> Email *
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="company@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Phone size={16} className="inline mr-2" /> Phone
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="text-center mt-3">
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    Already have an account? Login
                </button>
            </div>
        </form>
    );
};

export default CorporateSignupForm;
