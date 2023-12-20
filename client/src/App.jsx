import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TasksFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navabar";
import ProtectedRoute from "./ProtectedRoute";
import PropTypes from "prop-types";

function AuthProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
}

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AuthProviderWithNavigate>
          <Navbar />
          <div className="bg-slate-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </div>
        </AuthProviderWithNavigate>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;

AuthProviderWithNavigate.propTypes = {
  children: PropTypes.node.isRequired,
};
