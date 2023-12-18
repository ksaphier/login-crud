import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const navStyle = {
    background:
      "linear-gradient(to top, transparent, rgba(226, 232, 240, 1) 50%, rgba(226, 232, 240, 1) 100%)",
  };

  return (
    <nav
      style={navStyle}
      className="bg-transparent text-white fixed top-0 w-full z-50 min-h-"
    >
      <div className="container mx-auto md:mt-4 flex justify-between bg-slate-100 pb-3 pt-2 md:px-6 max-w-full md:max-w-navbar md:rounded-3xl shadow-lg shadow-white">
        <Link to="/" className="md:text-2xl font-bold hover:text-slate-300 ml-4">
          Task Manager
        </Link>
        <ul className="flex items-center">
          {isAuthenticated ? (
            <>
              <li className="md:mx-4 mx-2">
                <span className="text-sm font-semibold">
                  Welcome {user.username}
                </span>
              </li>
              <li className="md:mx-4 mx-2">
                <Link to="/add-task" className="text-sm hover:text-gray-300">
                  Add Task
                </Link>
              </li>
              <li className="md:mx-4 mx-2">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="text-sm hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mx-4">
                <Link to="/login" className="text-sm hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li className="mx-4">
                <Link to="/register" className="text-sm hover:text-gray-300">
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
