import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";

function TaskFormPage() {
  // Using React Hook Form for form handling
  const { register, handleSubmit } = useForm();

  const { createTask } = useTasks();
  
  const onSubmit = (data) => createTask(data);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("title")} // This line is for React Hook Form
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("desc")} // This line is for React Hook Form
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskFormPage;
