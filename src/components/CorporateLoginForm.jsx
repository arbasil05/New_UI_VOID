import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { supabase } from "../utils/supabase-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CorporateLoginForm = ({ onSignupClick, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = formData;

        if (!email || !password) {
            toast.error("Please enter both email and password");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

          
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            const session = sessionData?.session;

            if (!session) {
                toast.error("Failed to load session data.");
                return;
            }

            console.log("✅ Logged in session:", session);

            toast.success("Login successful!");

            // ✅ Now the session has `user.user_metadata.gstin`
            if (onLoginSuccess) onLoginSuccess(session);
        } catch (err) {
            console.error("Login error:", err.message);
            toast.error(`Login failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form className="space-y-5" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Corporate Login</h2>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={onSignupClick}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    Don't have an account? Sign up
                </button>
            </div>
        </form>
    );
};

export default CorporateLoginForm;
