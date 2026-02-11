import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  const deleteTask = id => {
    console.log("Delete:", id);
  };

  const completeTask = id => {
    console.log("Complete:", id);
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onComplete={completeTask}
        />
      ))}
    </div>
  );
}
