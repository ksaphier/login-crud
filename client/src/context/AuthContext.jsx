import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateAuthState = (authenticated, userData) => {
    setIsAuthenticated(authenticated);
    setUser(userData);
  };

  const signup = useCallback(async (user) => {
    setLoading(true);
    try {
      const res = await registerRequest(user);
      updateAuthState(true, res.data);
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const signin = useCallback(async (user) => {
    setLoading(true);
    try {
      const res = await loginRequest(user);
      updateAuthState(true, res.data);
    } catch (error) {
      const e = error.response.data;
      Array.isArray(e) ? setErrors(e) : setErrors([e.message]);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutRequest();
      updateAuthState(false, null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        if (isMounted) {
          updateAuthState(false, null);
        }
      } else {
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (isMounted) {
            updateAuthState(!!res.data, res.data);
          }
        } catch (error) {
          if (isMounted) {
            updateAuthState(false, null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    }

    checkLogin();
    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      signup,
      signin,
      logout,
      loading,
      user,
      isAuthenticated,
      errors,
    }),
    [signup, signin, logout, loading, user, isAuthenticated, errors]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
