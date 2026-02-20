import TaskCard from "./TaskCard";
import SummaryCard from "./SummaryCard";
import taskIcon from "../assets/tasklistIcon.svg";

export default function TaskDashboard({ tasks, deleteTask, completeTask }) {
  return (
    <div className="flex justify-center items-center flex-col">
      {/* Header */}
      <h2 className="flex justify-center items-center text-2xl font-bold">
        <img src={taskIcon} height={20} width={20} alt="" /> Your Tasks
      </h2>

      {/* Task List */}
      <div className="flex justify-center flex-col gap-0 items-center mt-4 w-full max-w-xl">
        {tasks.length === 0 && (
          <div className="bg-black p-4 w-full text-white text-center rounded-2xl mb-12 all-ease-in-out duration-200">
            <p className="font-bold text-lg">No tasks yet…</p>
          </div>
        )}

        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onComplete={completeTask}
          />
        ))}
      </div>

      {/* Summary */}
      {tasks.length !== 0 && <SummaryCard tasks={tasks} />}
    </div>
  );
}