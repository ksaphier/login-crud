import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-3xl px-4">
        {tasks.length === 0 ? (
          <div className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6"
            >
              <h1 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h1>
              <p className="text-gray-600 mt-2">{task.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TasksPage;
