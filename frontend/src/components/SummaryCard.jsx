export default function TaskSummary({ tasks = [] }) {
  const total = tasks.length;
  const high = tasks.filter(t => t.priority === "High").length;

  const today = new Date();
  function isDueToday(due) {
    if (!due) return false;
    const d = new Date(due);
    return (
      d.getFullYear() == today.getFullYear() &&
      d.getMonth() == today.getMonth() &&
      d.getDate() == today.getDate()
    );
  }

  const dueToday = tasks.filter(t => isDueToday(t.dueDate)).length;

  return (
    <div className="bg-black text-white w-50 p-4 rounded-xl mb-4">
      <h3 className="font-bold mb-2">Task Summary</h3>
      <p>Total tasks: {total}</p>
      <p>High priority: {high}</p>
      <p>Due today: {dueToday}</p>
    </div>
  );
}
