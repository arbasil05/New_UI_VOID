import React, { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import CorpDashBoard from "./pages/CorpDashBoard";
import { supabase } from "./utils/supabase-client";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error.message);
      setSession(data.session);
      setLoading(false);
    };
    getInitialSession();


    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
      {session ? <CorpDashBoard session={session} /> : <AuthPage />}
    </>
  );
}

export default App;
