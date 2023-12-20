import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/useTask";
import LoadingPage from "../components/LoadingPage";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask, loading } = useTasks();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createTask(data);
    navigate("/tasks");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-3xl p-8">
          <div className="mb-5">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Task title"
              {...register("title", { required: true })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-3xl focus:border-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Task details"
              {...register("desc")}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-3xl focus:border-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
