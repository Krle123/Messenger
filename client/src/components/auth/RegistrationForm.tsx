import { useState } from "react";
import { data, Link } from "react-router-dom";
import { dataValidationAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export function RegistrationForm({ authApi }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = dataValidationAuth(username, password);
    if (!validation.success) {
      setError(validation.message ?? "Invalid data");
      return;
    }
    
    const response = await authApi.registration(username, password, role);
    if (response.success && response.data) {
      login(response.data);
    } else {
      setError(response.message);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-lg shadow-md rounded-3xl p-10 w-full max-w-md border border-black-400">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registration</h1>
      <form onSubmit={submitForm} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         <input
          type="text"
          placeholder="Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-md text-center text-red-700/80 font-medium">{error}</p>}
        <button
          type="submit"
          className="w-full  bg-blue-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl  transition"
        >
          Register
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
