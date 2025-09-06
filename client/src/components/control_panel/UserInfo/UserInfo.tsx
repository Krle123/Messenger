import { jwtDecode } from "jwt-decode";
import { ReadValueByKey, DeleteValueByKey } from "../../../helpers/local_storage";
import { useAuth } from "../../../hooks/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
import type { JwtTokenClaims } from "../../../types/auth/JwtTokenClaims";

export function UserInfo() {
  const token = ReadValueByKey("authToken");
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  const { id, username, role } = jwtDecode<JwtTokenClaims>(token);

  const handleLogout = () => {
    DeleteValueByKey("authToken");
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Control Panel</h1>

      <div className="space-y-3 text-lg text-gray-800">
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl  transition"
      >
        Log Out
      </button>
    </div>
  );
}
