import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  const task0 = { title: "No Task", desc: "", _id: "0" };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-3xl px-4">
        {tasks.length === 0 ? (
          <TaskCard task={task0} id={task0._id} />
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} id={task._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksPage;
