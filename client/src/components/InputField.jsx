import PropTypes from "prop-types";

const InputField = ({ name, register, validation, error, ...rest }) => {
  return (
    <div className="mb-10 relative">
      <input
        {...register(name, validation)}
        {...rest}
        className={`h-10 block w-full px-4 py-2 text-gray-700 bg-white border ${
          error ? "border-orange-500" : "border-gray-300"
        } rounded-3xl focus:ring focus:ring-rose-300 mb-3`}
      />
      {/* Error message or placeholder to maintain consistent spacing */}
      <p
        className={`text-rose-500 text-sm absolute bottom-0 transform translate-y-[1.5rem] ${
          error ? "visible" : "invisible"
        }`}
      >
        {error ? error.message : "Error placeholder"}
      </p>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.object,
};

export default InputField;
