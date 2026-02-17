// app/context/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/apiFacade";

interface AdminUser {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------
  // 🔥 Load token from localStorage on start
  // -------------------------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("nowex_admin_token");

    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // -------------------------------------
  // 🔥 Fetch /me
  // -------------------------------------
  const fetchCurrentUser = async (jwt: string) => {
    try {
      const data = await api.getCurrentAdmin(jwt);

      setUser({
        id: data.id,
        username: data.username,
        role: data.role || "admin",
      });
    } catch (err) {
      console.error("Failed to fetch admin:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // 🔐 Login
  // -------------------------------------
  const login = async (username: string, password: string) => {
    const data = await api.login(username, password);

    localStorage.setItem("nowex_admin_token", data.access_token);
    setToken(data.access_token);

    setUser({
      id: data.admin_id,
      username: data.username,
      role: data.role,
    });
  };

  // -------------------------------------
  // 🔓 Logout
  // -------------------------------------
  const logout = () => {
    localStorage.removeItem("nowex_admin_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// -------------------------------------
// 🔥 Custom Hook
// -------------------------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
