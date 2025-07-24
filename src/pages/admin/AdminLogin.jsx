import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // 🔒 prevent reload

    if (password === import.meta.env.VITE_ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin", { replace: true }); 
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e293b] p-6 rounded-xl shadow-md w-[300px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-[#1b212b] mb-4 border text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
