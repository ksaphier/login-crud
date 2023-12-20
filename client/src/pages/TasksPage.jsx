import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/useTask";
import LoadingPage from "../components/LoadingPage";

function TasksPage() {
  const { getTasks, deleteTask, tasks, loading } = useTasks();

  const handleDelete = async (task) => {
    await deleteTask(task);
    getTasks();
  };

  const handleEdit = (task) => {
    console.log("Editing task:", task);
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-3xl px-4">
        <TaskCard tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default TasksPage;
