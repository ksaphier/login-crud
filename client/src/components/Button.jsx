import PropTypes from 'prop-types';

const Button = ({ text, type, onClick, additionalClasses }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-10 w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-3xl hover:bg-orange-600 focus:outline-none focus:bg-orange-400 ${additionalClasses}`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  additionalClasses: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  additionalClasses: '',
};

export default Button;
