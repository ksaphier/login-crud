import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="bg-zinc-800 flex h-[calc(100vh)] items-center justify-center">
      <div className="bg-zinc-500 max-w-md p-8 rounded-3xl">
        <h1 className="text-center mb-4 text-xl">Login</h1>
        {loginErrors.map((error, index) => (
          <div
            key={`${error}-${index}`} // Unique key using error and index
            className="bg-red-500 p-2 text-white rounded-full my-2 text-center"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
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
            Log in
          </button>
        </form>
        <p className="flex mt-4 justify-evenly">
          Don`t have an account?
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
