import React, { useState } from "react";
import { Building2, Shield } from "lucide-react";
import CorporateLoginForm from "../components/CorporateLoginForm";
import CorporateSignupForm from "../components/CorporateSignupForm";
import GovernmentLoginForm from "../components/GovernmentLogin";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState("corporate");
    const [isSignup, setIsSignup] = useState(false);


    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Taxchain</h1>
                    <p className="text-gray-600">Blockchain-based Tax Calculation Platform</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-10">
                    {/* Tabs */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => {
                                setActiveTab("corporate");
                                setIsSignup(false);
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${activeTab === "corporate"
                                ? "bg-indigo-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Building2 size={20} />
                            Corporate
                        </button>

                        <button
                            onClick={() => {
                                setActiveTab("government");
                                setIsSignup(false);
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${activeTab === "government"
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Shield size={20} />
                            Government
                        </button>
                    </div>

                    {/* Conditional rendering */}
                    {activeTab === "corporate" && !isSignup && (
                        <CorporateLoginForm onSignupClick={() => setIsSignup(true)} />
                    )}

                    {activeTab === "corporate" && isSignup && (
                        <CorporateSignupForm
                            onLoginClick={() => setIsSignup(false)}
                        />
                    )}

                    {activeTab === "government" && <GovernmentLoginForm />}
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    <p>© 2024 Tax Management System. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
