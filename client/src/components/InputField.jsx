import PropTypes from "prop-types";

const InputField = ({ name, register, validation, error, ...rest }) => {
  return (
    <div className="mb-10 relative">
      <input
        {...register(name, validation)}
        {...rest}
        className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
          error ? "border-red-900" : "border-gray-300"
        } rounded-3xl focus:ring focus:ring-blue-300 mb-3`}
      />
      <p
        className={`text-red-900 text-sm absolute bottom-0 transform translate-y-[1.5rem] ${
          error ? "visible" : "invisible"
        }`}
      >
        {error ? error.message : "Placeholder"}
      </p>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.object,
  // Include other PropTypes as needed
};

export default InputField;
