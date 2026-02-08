import { useState } from "react";
import { loginAdmin } from "../API/service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await loginAdmin({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border">
        <h2 className="text-2xl font-bold text-center mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
         Technomotiva
        </p>

        <div className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
