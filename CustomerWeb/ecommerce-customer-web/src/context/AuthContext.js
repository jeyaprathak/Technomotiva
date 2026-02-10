import { createContext, useState, useEffect } from "react";
import { loginUser, getProfile } from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile().then(res => setUser(res.data)).catch(() => logout());
    }
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

 const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
