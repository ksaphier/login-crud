import PropTypes from "prop-types";
function TaskCard({ task }) {

  return (
    <div className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6">
      <h1 className="text-xl font-semibold text-gray-800">{task.title}</h1>
      <p className="text-gray-600 mt-2">{task.desc}</p>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
  }),
};

export default TaskCard;
