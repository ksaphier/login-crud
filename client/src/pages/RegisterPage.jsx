import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={onSubmit} className="bg-white shadow rounded-3xl p-8">
          {registerErrors.map((error, index) => (
            <div key={index} className="bg-red-500 text-white text-center p-2 rounded-3xl mb-4">
              {error}
            </div>
          ))}
          <div className="mb-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              {...register("username", { required: true })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-3xl focus:border-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-300 mb-3"
            />
            {errors.username && <p className="text-red-500 text-sm mb-3">Username is required</p>}
          </div>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-3xl focus:border-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-300 mb-3"
            />
            {errors.email && <p className="text-red-500 text-sm mb-3">Email is required</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-3xl focus:border-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-300 mb-3"
            />
            {errors.password && <p className="text-red-500 text-sm mb-3">Password is required</p>}
          </div>
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
