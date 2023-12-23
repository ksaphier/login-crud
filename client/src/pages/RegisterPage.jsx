import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorMessages from "../components/ErrorMessages";
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
    <div className="flex h-screen bg-gray-800">
      <div className="m-auto w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={onSubmit} className="bg-gray-900 shadow rounded-3xl p-8">
          <ErrorMessages errors={registerErrors} />
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
          <Button
            text="Register"
            type="submit"
          />
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/login" className="text-rose-400 hover:text-rose-300">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
