// Import necessary hooks and PropTypes from React
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

// Import the API call for registration
import { registerRequest, loginRequest } from "../api/auth";

// Create a new context for authentication
export const AuthContext = createContext();

// AuthProvider component to provide authentication context to its children
export const AuthProvider = ({ children }) => {
  // State hooks for managing user, authentication status, and errors
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  // useCallback hook to memoize the signup function
  // This prevents the function from being recreated on every render
  const signup = useCallback(async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data); // Update user state
      setIsAuthenticated(true); // Update authentication state
    } catch (error) {
      setErrors(error.response.data); // Handle errors
    }
  }, []); // Empty dependency array means the function is recreated only when the component mounts

  const signin = useCallback(async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      const e = error.response.data;
      if (Array.isArray(e)) {
        return setErrors(e);
      }
      setErrors([e.message]); // Handle errors
    }
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  });

  // useMemo hook to memoize the context value
  // This optimizes performance by preventing unnecessary re-renders
  const value = useMemo(
    () => ({
      signup,
      signin,
      user,
      isAuthenticated,
      errors,
    }),
    [signup, signin, user, isAuthenticated, errors] // Dependency array for useMemo
  );

  // Context provider that passes the memoized value to its children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// PropTypes validation for the AuthProvider component
// Ensures that children prop is provided and is of the correct type
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'node' covers anything that can be rendered: numbers, strings, elements or an array containing these types
};
