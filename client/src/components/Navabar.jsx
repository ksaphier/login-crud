import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          Task Manager
        </Link>
        <ul className="flex items-center">
          {isAuthenticated ? (
            <>
              <li className="mx-4">
                <span className="text-sm font-semibold">Welcome {user.username}</span>
              </li>
              <li className="mx-4">
                <Link to="/add-task" className="text-sm hover:text-gray-300">
                  Add Task
                </Link>
              </li>
              <li className="mx-4">
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
