import { createContext, useCallback, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
} from "../api/tasks";
import PropTypes from "prop-types";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const createTask = async (task) => {
    setLoading(true);
    try {
      return await createTaskRequest(task).data;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteTask = async (task) => {
    setLoading(true);
    try {
      const res = await deleteTaskRequest(task._id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        getTasks,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
