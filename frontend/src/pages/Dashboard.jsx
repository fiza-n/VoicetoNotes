import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskDashboard from "../components/TaskDashboard";  
import VoiceRecorder from "../components/VoiceRecorder";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      // 1️⃣ Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error(sessionError);
        return;
      }

      if (!sessionData.session) {
        navigate("/login");
        return;
      }

      // 2️⃣ Get user info
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error(userError);
        return;
      }

      setUser(userData.user); // object: { id, email, ... }
    };

    getUser();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const getUserProfile = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    navigate("/login");
    return;
  }

  const userId = sessionData.session.user.id;

 const { data: profileData, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id) // or session.user.id
  .single();

setUser(profileData);

};


  return (
    <div>
      <Header user={user} onLogout={async () => {
        await supabase.auth.signOut();
        navigate("/login");
      }} />
      <VoiceRecorder />
      <TaskDashboard />
    </div>
  );
}
