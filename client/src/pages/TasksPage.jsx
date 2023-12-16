import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard"

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-3xl px-4">
        {tasks.length === 0 ? (
          <TaskCard title={'No Task'} desc={'Add a new task! Click in the right top corner'} key={'0'} />
        ) : (
          tasks.map((task) => (
            <TaskCard title={task.title} desc={task.desc} key={task._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksPage;
