import { useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import taskIcon from "../assets/tasklistIcon.svg";
import SummaryCard from "./SummaryCard";


export default function TaskDashboard() {
  const [tasks, setTasks] = useState([
    {
        id:'td1',
        title:'Call Ahmed',
        priority: 'High',
        dueDate: '2026-02-14'
    },
  
  ]);
   

 const handleVoiceResponse = async (audioBlob) => {
  const tasksFromAPI = await processVoice(audioBlob);
  setTasks(prev => [...prev, ...tasksFromAPI]);
};

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completeTask = (id) => {
    console.log("completed:", id);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      
      <h2 className="flex justify-center items-center text-2xl font-bold "> <img src={taskIcon} height={20} width={20} alt="" /> Your Tasks </h2>
    <div className="flex justify-center flex-col gap-0 items-center mt-4">
      {tasks.length === 0 && <div className="bg-black p-4 w-xl text-white text-center rounded-2xl mb-12 all-ease-in-out duration-200"><p className="font-bold text-lg">No tasks yet…</p></div> }

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onComplete={completeTask}
        />
      ))}
      </div>
      {tasks.length !== 0 && <SummaryCard tasks = {tasks} />}
    </div>
  );
}
