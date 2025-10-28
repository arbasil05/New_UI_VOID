import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { supabase } from "../utils/supabase-client";
import toast from "react-hot-toast";

const GovernmentLoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("Invalid credentials");
        console.error("Login error:", error.message);
      } else {
        toast.success("Login successful!");
        if (onLoginSuccess) onLoginSuccess(data.session);
      }
    } catch (err) {
      toast.error("Something went wrong during login");
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Government Login</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <User size={16} className="inline mr-2" />
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your government email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Lock size={16} className="inline mr-2" />
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition 
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center mt-4 text-sm text-gray-600">
        <p>For government access, contact your administrator</p>
      </div>
    </form>
  );
};

export default GovernmentLoginForm;
