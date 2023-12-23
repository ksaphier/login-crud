import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Button from "../components/Button";

dayjs.extend(utc);

function TaskCard({ tasks, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="bg-gray-900 shadow-md rounded-3xl px-6 py-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-100">No Tasks</h1>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-900 shadow-md rounded-3xl pl-6 pr-4 py-4 mb-6"
        >
          <div>
            <h1 className="text-xl font-semibold text-gray-100">
              {task.title}
            </h1>
            <p className="text-gray-100 mt-2">{task.desc}</p>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <p className="text-gray-100">
              {dayjs(task.date).utc().format("DD/MM/YYYY")}
            </p>
            <div className="flex items-center">
              <Link
                to={`/tasks/${task._id}`}
                className="mr-2 bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-3xl"
              >
                Edit
              </Link>
              <Button
                text="Delete"
                onClick={() => onDelete(task)}
                additionalClasses="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-3xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

TaskCard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      desc: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
