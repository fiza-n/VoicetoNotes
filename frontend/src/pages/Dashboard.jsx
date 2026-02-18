import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskDashboard from "../components/TaskDashboard";  
import VoiceRecorder from "../components/VoiceRecorder";
import { fetchUser } from "../services/userService";

export default function Dashboard() {
  const [user, setUser] = useState({
  fname: "Arbaz",
  lname:"khan",
  email: "arbaz@gmail.com"
});


  
useEffect(() => {
  fetchUser()
    .then(setUser)
    .catch(console.error);
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
