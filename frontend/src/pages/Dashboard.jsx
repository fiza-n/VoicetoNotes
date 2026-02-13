import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskDashboard from "../components/TaskDashboard";  
import VoiceRecorder from "../components/VoiceRecorder";

export default function Dashboard() {
  const [user, setUser] = useState([
    {
      name: "Arbaz Khan",
      email: "arbaz@gmail.com"
    }
  ]);

  useEffect(() => {
    // fetch user info from backend
    fetch("/api/me")
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Header user={user} onLogout={() => console.log("logout")} />
        <VoiceRecorder/>
      <TaskDashboard />
    </div>
  );
}
