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
    <div className="bg-zinc-800 flex h-[calc(100vh)] items-center justify-center">
      <div className="bg-zinc-500 max-w-md p-8 rounded-3xl">
        <h1 className="text-center mb-4 text-xl">Register</h1>
        {registerErrors.map((error) => (
          <div key={error} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-full my-2"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-full my-2"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-full my-2"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-zinc-600 hover:bg-zinc-400 text-white px-4 py-2 rounded-full mt-4"
          >
            Register
          </button>
        </form>
        <p className="flex mt-4 justify-evenly">
          Already have an account?
          <Link to="/login" className="text-sky-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
