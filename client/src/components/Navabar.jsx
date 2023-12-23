import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const navStyle = {
    background: "linear-gradient(to top, transparent, rgba(30 41 59, 1) 50%)",
  };

  return (
    <nav style={navStyle} className="bg-slate-800 text-white fixed top-0 w-full z-50">
      <div className="container mx-auto md:mt-4 flex justify-between items-center bg-gray-900 px-3 md:max-w-4/5 md:rounded-3xl shadow-[0_8px_60px_-15px_rgba(209,213,219,0.25)] hover:shadow-[0_8px_60px_-15px_rgba(209,213,219,0.5)] h-16"> {/* Adjusted height and shadow color */}
        <Link to={isAuthenticated ? "/tasks" : "/"} className="text-2xl font-bold hover:text-rose-400 md:ml-4">
          Task Manager
        </Link>
        <ul className="flex items-center">
          {isAuthenticated ? (
            <>
              <li className="flex items-center">
                <span className="text-sm font-semibold px-4">Welcome {user.username}</span>
              </li>
              <li className="flex items-center">
                <Link to="/add-task" className="text-sm hover:text-gray-100 hover:bg-orange-500 px-4 py-2 rounded-3xl">
                  Add Task
                </Link>
              </li>
              <li className="flex items-center">
                <button onClick={logout} className="text-sm hover:text-gray-100 hover:bg-orange-500 px-4 py-2 rounded-3xl">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center">
                <Link to="/login" className="text-sm hover:text-gray-100 hover:bg-orange-500 px-4 py-2 rounded-3xl">
                  Login
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/register" className="text-sm hover:text-gray-100 hover:bg-orange-500 px-4 py-2 rounded-3xl">
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
