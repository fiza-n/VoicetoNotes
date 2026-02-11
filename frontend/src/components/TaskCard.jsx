import { useState } from "react";
import cross from "../assets/cross.svg"
import complete from "../assets/completed.svg"


export default function TaskCard({ task, onDelete, onComplete }) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete?.(task.id);
  };
  

  return (
    <div className="bg-black p-4 w-xl flex justify-between rounded-2xl mb-6 all-ease-in-out duration-200"
    //   style={{
    //     background: "#1e1e1e",
    //     padding: 16,
    //     borderRadius: 12,
    //     marginBottom: 12,
    //     color: "#fff",
    //     border: completed ? "2px solid #4caf50" : "2px solid transparent",
    //     opacity: completed ? 0.7 : 1,
    //     transition: "all 0.2s ease",
    //   }}
    >
      {/* Title */}
      <h3 className="m-0 text-white text-lg "
        // style={{
        //   margin: 0,
        //   color: completed ? "#4caf50" : "#fff",
        //   textDecoration: completed ? "line-through" : "none",
        // }}
      >
        {task.title}
      </h3>
    
      {/* Metadata row */}
      <div className="flex gap-3 mt-2 text-sm opacity-80 text-white"
        // style={{
        //   display: "flex",
        //   gap: 12,
        //   marginTop: 8,
        //   fontSize: 14,
        //   opacity: 0.8,
        // }}
      >
        {task.dueDate && <span>📅 {task.dueDate}</span>}
        {task.priority && <span>⚡ {task.priority}</span>}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 12,
        }}
      >
        {!completed && (
          <button className="bg-white border-[none] p-2 rounded-lg cursor-pointer"
            onClick={handleComplete}
           
          >
            <img src={complete} width={20} height={20} alt="complete" />
          </button>
        )}

        <button className="bg-white border-[none] p-3 rounded-lg cursor-pointer"
          onClick={() => onDelete?.(task.id)}
      
        >
          <img src={cross} width={20} height={20} alt="delete" />
        </button>
      </div>
    </div>
  );
}
