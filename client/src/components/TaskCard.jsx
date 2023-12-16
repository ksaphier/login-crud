import PropTypes from "prop-types";

function TaskCard({ title, desc, key }) {
  return (
    <div className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6" key={key}>
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.string,
  desc: PropTypes.string,
};

export default TaskCard;
