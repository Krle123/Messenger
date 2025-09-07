import { useEffect, useState } from "react";
import { DeleteValueByKey } from "../../helpers/local_storage";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../api_services/users/UsersAPIService";
import { getLoggedInUser } from "../../helpers/loggedInUser";

export function UserInfo() {
  const { logout } = useAuth();
  const navigate = useNavigate();
 

  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
      const loggedUser = getLoggedInUser();
      if (!loggedUser) {
        setError("You must be logged in to access this page.");
        return;
      }
      setId(loggedUser.id);
      setUsername(loggedUser.username);
      setRole(loggedUser.role);
      usersApi.getUserById(loggedUser.id).then(user => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setError("");
      
      }).catch(err => {
        setError("Failed to fetch user details.");
        console.error("Error fetching user details:", err);
      });
  }, []);
      

  const handleLogout = () => {
    DeleteValueByKey("authToken");
    logout();
    navigate('/login');
  };

  const handleSave =  async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await usersApi.updateUser({id, username, role, firstName, lastName, phone});
    if (response.success) {
      navigate('/select');
    }
    else {
      setError(response.message);
      setFirstName("");
      setLastName("");
      setPhone("");
    }
  };

  const handleCancel = () => {
    navigate('/select');
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Account Settings</h1>

      <div className="space-y-4 text-lg text-gray-800">
        <div>
          <label htmlFor="user-username" className="block font-semibold mb-1">Username:</label>
          <input
            id="user-username"
            type="text"
            value={username}
            readOnly
            className="w-full bg-gray-300/80 text-gray-400 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="user-firstname" className="block font-semibold mb-1">First Name:</label>
          <input
            id="user-firstname"
            type="text"
            value={firstName ?? ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-gray-300/80 text-gray-900 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="user-lastname" className="block font-semibold mb-1">Last Name:</label>
          <input
            id="user-lastname"
            type="text"
            value={lastName ?? ""}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-300/80 text-gray-900 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="user-phone" className="block font-semibold mb-1">Phone:</label>
          <input
            id="user-phone"
            type="text"
            value={phone ?? ""}
            onChange={(e) => setPhone(e.target.value)}
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
            className="w-full bg-gray-300/80 text-gray-400 uppercase px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-md text-center text-red-700/80 font-medium">{error}</p>}
      <div className="flex justify-center gap-4 mt-8">
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
