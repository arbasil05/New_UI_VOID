import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/DashBoard";
import GovernmentDashboard from "./pages/GovDashboard";
import CalculateTax from "./pages/CalculateTax";
import { supabase } from "./utils/supabase-client";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error.message);
      setSession(data.session);
      setLoading(false);

      if (data.session) {
        const role = data.session.user.user_metadata?.role;
        // Only auto-redirect to a dashboard if the user is currently
        // on the root path (e.g. initial app load). This prevents
        // forced navigation when the user manually enters a route.
        if (location.pathname === "/") {
          if (role) navigate("/dashboard");
          else navigate("/gov-dashboard");
        }
      }
    };

    getInitialSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) {
          const role = newSession.user.user_metadata?.role;
          // Only navigate on auth state change if we're at the root.
          // This avoids hijacking in-progress navigation to other pages.
          if (location.pathname === "/") {
            if (role) navigate("/dashboard");
            else navigate("/gov-dashboard");
          }
        } else {
          navigate("/");
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  const role = session?.user?.user_metadata?.role;

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected corporate route */}
      <Route
        path="/dashboard"
        element={
          role ? <Dashboard session={session} /> : <Navigate to="/" />
        }
      />

      {/* Protected government route */}
      <Route
        path="/gov-dashboard"
        element={
          !role ? <GovernmentDashboard session={session} /> : <Navigate to="/" />
        }
      />

      {/* ✅ Fixed Calculate Tax route */}
      <Route
        path="/calculate-tax"
        element={
          !role ? (
            <CalculateTax session={session} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch all: redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
