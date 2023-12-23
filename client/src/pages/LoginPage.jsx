import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorMessages from "../components/ErrorMessages";
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
    <div className="flex h-screen bg-gray-800">
      <div className="m-auto w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 shadow rounded-3xl p-8">
          <ErrorMessages errors={loginErrors} />
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
          <Button
            text="Log In"
            type="submit"
          />
          <div className="text-center mt-6 text-gray-600">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-rose-400 hover:text-rose-300">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
