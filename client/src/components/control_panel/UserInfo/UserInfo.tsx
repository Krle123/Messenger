import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { ReadValueByKey, DeleteValueByKey } from "../../../helpers/local_storage";
import { useAuth } from "../../../hooks/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
import type { JwtTokenClaims } from "../../../types/auth/JwtTokenClaims";

export function UserInfo() {
  const token = ReadValueByKey("authToken");
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  const { id: initialId, username: initialUsername, role } = jwtDecode<JwtTokenClaims>(token);

  const id = initialId; // ID is not editable
  const [username, setUsername] = useState(initialUsername);
  const [isDirty, setIsDirty] = useState(false);

  const handleLogout = () => {
    DeleteValueByKey("authToken");
    logout();
    navigate('/login');
  };
  const handleSave = () => {

    
  };

  const handleCancel = () => {
    setUsername(initialUsername);
    navigate('/select');
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Account Settings</h1>

      <div className="space-y-4 text-lg text-gray-800">
        <div>
          <label htmlFor="user-id" className="block font-semibold mb-1">ID:</label>
          <input
            id="user-id"
            type="text"
            value={id}
            readOnly 
            className="w-full bg-gray-300/80 text-gray-500 uppercase px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="user-username" className="block font-semibold mb-1">Username:</label>
          <input
            id="user-username"
            type="text"
            value={username}
            onChange={onUsernameChange}
            className="w-full bg-gray-300/80 text-gray-900 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="user-role" className="block font-semibold mb-1">Role:</label>
          <input
            id="user-role"
            type="text"
            value={role?.toUpperCase()}
            readOnly
            className="w-full bg-gray-300/80 text-gray-500 uppercase px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleLogout}
          className="px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl transition"
        >
          Log Out
        </button>
        <button
          onClick={handleSave}
          className="px-4 bg-blue-700/60 hover:bg-blue-700/70 text-white py-2 rounded-xl transition"
          style={{ marginLeft: "12px" }}
        >
          Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="px-4 bg-blue-700/60 hover:bg-blue-700/70 text-white py-2 rounded-xl transition"
          style={{ marginLeft: "12px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
