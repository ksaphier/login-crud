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

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8" style={{ height: 'calc(100vh)' }}>
      <div className="w-full max-w-3xl px-4">
        <TaskCard tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default TasksPage;
