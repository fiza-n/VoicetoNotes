export default function TaskSummary({ tasks }) {
  const total = tasks.length;
  const high = tasks.filter(t => t.priority === "High").length;
  const dueToday = tasks.filter(t => t.dueDate === "Today").length;

  return (
    <div className="bg-black text-white p-4 rounded-xl mb-4">
      <h3 className="font-bold mb-2">Task Summary</h3>
      <p>Total tasks: {total}</p>
      <p>High priority: {high}</p>
      <p>Due today: {dueToday}</p>
    </div>
  );
}
