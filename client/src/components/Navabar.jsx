import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const navStyle = {
    background:
      "linear-gradient(to top, transparent, rgba(226, 232, 240, 1) 50%)",
  };

  return (
    <nav
      style={navStyle}
      className="bg-transparent text-white fixed top-0 w-full z-50"
    >
      <div className="container mx-auto md:mt-4 flex justify-between bg-slate-100 py-3 md:px-3 max-w-full md:max-w-navbar md:rounded-3xl shadow-[0_8px_60px_-15px_rgba(12,144,167,0.25)] hover:shadow-[0_8px_60px_-15px_rgba(12,144,167,0.5)]">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="md:text-2xl font-bold hover:text-slate-300 ml-4"
        >
          Task Manager
        </Link>
        <ul className="flex items-center">
          {isAuthenticated ? (
            <>
              <li className="">
                <span className="text-sm font-semibold px-4 py-2">
                  Welcome {user.username}
                </span>
              </li>
              <li className="">
                <Link
                  to="/add-task"
                  className="text-sm hover:text-gray-900 hover:bg-cyan-400 px-4 py-2 rounded-3xl"
                >
                  Add Task
                </Link>
              </li>
              <li className="">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="text-sm hover:text-gray-900 hover:bg-cyan-400 px-4 py-2 rounded-3xl"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="">
                <Link
                  to="/login"
                  className="text-sm hover:text-gray-900 hover:bg-cyan-400 px-4 py-2 rounded-3xl"
                >
                  Login
                </Link>
              </li>
              <li className="">
                <Link
                  to="/register"
                  className="text-sm hover:text-gray-900 hover:bg-cyan-400 px-4 py-2 rounded-3xl"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
