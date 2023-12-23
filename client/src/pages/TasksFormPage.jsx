import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/useTask";
import LoadingPage from "../components/LoadingPage";
import Button from "../components/Button";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import InputField from "../components/InputField";

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask, loading } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("desc", task.desc);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
      } else {
        setValue("date", dayjs.utc(new Date()).format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      date: dayjs.utc(data.date).format(),
    };
    if (params.id) {
      await updateTask(params.id, taskData);
    } else {
      await createTask(taskData);
    }
    navigate("/tasks");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="m-auto w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          {params.id ? "Edit Task" : "Create a New Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 shadow rounded-3xl p-8">
          <InputField
            name="title"
            type="text"
            placeholder="Task title"
            register={register}
            validation={{ required: true }}
            className="border-rose-400 focus:border-rose-400"
          />
          <InputField
            name="desc"
            type="textarea"
            placeholder="Task details"
            register={register}
            validation={{ required: true }}
            className="border-rose-400 focus:border-rose-400"
          />
          <InputField
            name="date"
            type="date"
            placeholder="Date"
            register={register}
            className="border-rose-400 focus:border-rose-400"
          />
          <Button
            text={params.id ? "Save Task" : "Create Task"}
            type="submit"
            additionalClasses="w-full bg-orange-500 hover:bg-orange-600"
          />
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
