
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
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

import Cookies from "js-cookie";

// Create a new context for authentication
export const AuthContext = createContext();

// AuthProvider component to provide authentication context to its children
export const AuthProvider = ({ children }) => {
  // State hooks for managing user, authentication status, errors, and loading status
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to update authentication state
  const updateAuthState = (authenticated, userData) => {
    setIsAuthenticated(authenticated);
    setUser(userData);
  };

  // useCallback hook to memoize the signup function
  const signup = useCallback(async (user) => {
    try {
      const res = await registerRequest(user);
      updateAuthState(true, res.data); // Update user and authentication state
    } catch (error) {
      setErrors(error.response.data); // Handle errors
    }
  }, []);

  // useCallback hook for signin function
  const signin = useCallback(async (user) => {
    try {
      const res = await loginRequest(user);
      updateAuthState(true, res.data); // Update user and authentication state
    } catch (error) {
      const e = error.response.data;
      Array.isArray(e) ? setErrors(e) : setErrors([e.message]);
    }
  }, []);

  // useEffect hook for clearing errors
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // useEffect hook for checking login status
  useEffect(() => {
    let isMounted = true; // flag to check if component is mounted

    async function checkLogin() {
      setLoading(true);
      const cookies = Cookies.get();

      if (!cookies.token) {
        if (isMounted) {
          updateAuthState(false, null);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (isMounted) {
          updateAuthState(!!res.data, res.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          updateAuthState(false, null);
          setLoading(false);
        }
      }
    }

    checkLogin();

    return () => {
      isMounted = false; // set flag to false when component unmounts
    };
  }, []);

  // useMemo hook to memoize the context value
  const value = useMemo(
    () => ({
      signup,
      signin,
      loading,
      user,
      isAuthenticated,
      errors,
    }),
    [signup, signin, loading, user, isAuthenticated, errors]
  );

  // Context provider that passes the memoized value to its children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// PropTypes validation for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
