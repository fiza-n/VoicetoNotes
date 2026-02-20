import { supabase } from "../lib/supabaseClient";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskDashboard from "../components/TaskDashboard";  
import VoiceRecorder from "../components/VoiceRecorder";
import { getTasks, addTask, deleteTask as deleteTaskService, completeTask as completeTaskService } from "../services/taskService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

 const [loading, setLoading] = useState(true);

useEffect(() => {
  const getUser = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error(sessionError);
      setLoading(false);
      return;
    }

    if (!sessionData.session) {
      navigate("/login");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error(userError);
      setLoading(false);
      return;
    }

    const userId = userData.user.id;
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setUser(profileError ? userData.user : profileData);
    setLoading(false);
  };

  getUser();
}, [navigate]);


  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [user]);

  
  const handleVoiceStop = async (audioBlob) => {
    if (!user?.id) return;

    try {
      
      const fileName = `voice-${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from("voice-notes")
        .upload(fileName, audioBlob);
      if (uploadError) throw uploadError;

      const { publicURL, error: urlError } = supabase.storage
        .from("voice-notes")
        .getPublicUrl(fileName);
      if (urlError) throw urlError;

      
      const res = await axios.post("/api/process-voice", { url: publicURL });

    
      const insertedTasks = await Promise.all(
        res.data.tasks.map(task => addTask({ ...task, user_id: user.id }))
      );

      setTasks(prev => [...prev, ...insertedTasks.flat()]);
    } catch (err) {
      console.error("Error processing voice:", err);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await deleteTaskService(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };


  const completeTask = async (id) => {
    try {
      await completeTaskService(id);
      setTasks(prev =>
        prev.map(t => t.id === id ? { ...t, completed: true } : t)
      );
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    
    {user && (
        <>
        <Header
        user={user}
        onLogout={async () => {
          await supabase.auth.signOut();
          navigate("/login");
        }}
      />
      <VoiceRecorder onStop={handleVoiceStop} />
      <TaskDashboard
      tasks={tasks}
      deleteTask={deleteTask}
      completeTask={completeTask}
      />
      </>
  )}
    
  );
}
