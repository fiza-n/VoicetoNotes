
import { supabase } from "../lib/supabaseClient";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskDashboard from "../components/TaskDashboard";
import loadingGif from "../assets/loading.gif";
import VoiceRecorder from "../components/VoiceRecorder";
import {
  getTasks,
  addTask,
  deleteTask as deleteTaskService,
  completeTask as completeTaskService,
} from "../services/taskService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

 
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData?.session) {
          navigate("/login");
          return;
        }

        const { data: userData } = await supabase.auth.getUser();

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single();

        setUser(profileData || userData.user);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);


  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;

      try {
        const data = await getTasks();
        setTasks(data || []);
      } catch (err) {
        console.error("Task fetch error:", err);
      }
    };

    fetchTasks();
  }, [user]);


  const handleVoiceStop = async (audioBlob) => {
    if (!user?.id) return;

    try {
      // Upload audio to Supabase storage
      const fileName = `voice-${Date.now()}.webm`;

      const { error: uploadError } = await supabase.storage
        .from("voice-notes")
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("voice-notes")
        .getPublicUrl(fileName);

      const publicURL = publicUrlData.publicUrl;

      // Send URL to backend
      const res = await axios.post("/api/process-voice", {
        url: publicURL,
      });

      const newTasks = res.data.tasks || [];

      // Insert tasks into DB
      const inserted = await Promise.all(
        newTasks.map((task) =>
          addTask({ ...task, user_id: user.id })
        )
      );

      setTasks((prev) => [...prev, ...inserted.flat()]);
    } catch (err) {
      console.error("Voice processing error:", err);
    }
  };

  // ✅ 4. Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteTaskService(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ 5. Complete Task
  const completeTask = async (id) => {
    try {
      await completeTaskService(id);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: true } : t
        )
      );
    } catch (err) {
      console.error("Complete error:", err);
    }
  };

  // ✅ Prevent flicker
  if (loading) return <div className="flex justify-center items-center mt-50" >{<img src={loadingGif} alt="" width={200} height={200}/>}</div>;


  return (
    <div>
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
            tasks={tasks || []}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        </>
      )}
    </div>
  );
}
