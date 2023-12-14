import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md rounded px-6 py-4 my-4"
        >
          <h1 className="text-xl font-bold text-gray-800">{task.title}</h1>
          <p className="text-gray-600">{task.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default TasksPage;
