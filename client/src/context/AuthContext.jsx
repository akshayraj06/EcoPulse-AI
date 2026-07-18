import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContextValue";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";

const getStoredUser = () => {
  const rawUser = localStorage.getItem("ecopulse_user");
  return rawUser ? JSON.parse(rawUser) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("ecopulse_token")));

  useEffect(() => {
    const token = localStorage.getItem("ecopulse_token");

    if (!token) {
      return;
    }

    getCurrentUser()
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("ecopulse_user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("ecopulse_token");
        localStorage.removeItem("ecopulse_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (data, remember) => {
    setUser(data.user);
    localStorage.setItem("ecopulse_token", data.token);
    localStorage.setItem("ecopulse_user", JSON.stringify(data.user));
    localStorage.setItem("ecopulse_remember", remember ? "true" : "false");
  };

  const login = useCallback(async (credentials, remember = true) => {
    const data = await loginUser(credentials);
    saveSession(data, remember);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await registerUser(payload);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ecopulse_token");
    localStorage.removeItem("ecopulse_user");
    localStorage.removeItem("ecopulse_remember");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
