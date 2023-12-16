import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { validationMessages } from "../utils/formValidation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={onSubmit} className="bg-white shadow rounded-3xl p-8">
          {registerErrors.map((error, index) => (
            <div
              key={index}
              className="bg-red-500 text-white text-center p-2 rounded-3xl mb-4"
            >
              {error}
            </div>
          ))}
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            register={register}
            validation={{
              required: validationMessages.required,
            }}
            error={errors.username}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            validation={{
              required: validationMessages.required,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: validationMessages.email,
              },
            }}
            error={errors.email}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            validation={{
              required: validationMessages.required,
              minLength: {
                value: 6,
                message: validationMessages.minLength(8),
              },
            }}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
