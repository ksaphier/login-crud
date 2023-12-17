import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputField from "../components/InputField";
import { validationMessages } from "../utils/formValidation";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow rounded-3xl p-8"
        >
          {loginErrors.map((error, index) => (
            <div
              key={index}
              className="bg-red-500 text-white text-center p-2 rounded-3xl mb-4"
            >
              {error}
            </div>
          ))}
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
            className="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
          >
            Log In
          </button>
          <div className="text-center">
            <p className="text-gray-600">Don’t have an account?</p>
            <Link to="/register" className="text-blue-400 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
