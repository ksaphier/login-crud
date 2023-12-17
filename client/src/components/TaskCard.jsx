import PropTypes from "prop-types";
function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{task.title}</h1>
        <p className="text-gray-600 mt-2">{task.desc}</p>
        <p className="text-gray-600 mt-2">
          {new Date(task.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    date: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default TaskCard;
