
import PropTypes from 'prop-types';

function ErrorMessages({ errors }) {
  if (!errors.length) {
    return null;
  }

  return (
    <div>
      {errors.map((error, index) => (
        <div key={index} className="bg-rose-500 text-gray-100 text-center p-2 rounded-3xl mb-10">
          {error}
        </div>
      ))}
    </div>
  );
}

ErrorMessages.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ErrorMessages;
