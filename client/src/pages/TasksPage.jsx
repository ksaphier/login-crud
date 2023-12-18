import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  const handleDelete = (task) => {
    console.log("Deleting task:", task);
  };

  const handleEdit = (task) => {
    console.log("Editing task:", task);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-3xl px-4">
        <TaskCard
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default TasksPage;
