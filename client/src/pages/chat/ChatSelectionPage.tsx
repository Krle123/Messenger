import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoggedInUser } from "../../helpers/loggedInUser";
import { getLoggedInUser } from "../../helpers/loggedInUser";
import type { UserDto } from "../../models/users/UserDto";
import type { IUsersAPIService } from "../../api_services/users/IUsersAPIService";
import type { UnreadDto } from "../../models/msg/UnreadDto";
import type { IMsgAPIService } from "../../api_services/msg/IMsgAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { DeleteValueByKey } from "../../helpers/local_storage";

interface ChatSelectionProps {
  usersApi: IUsersAPIService;
  msgApi: IMsgAPIService;
}


export function ChatSelection({usersApi, msgApi}: ChatSelectionProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const { logout } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = () => {
    DeleteValueByKey("authToken");
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const loggedUser = getLoggedInUser();
    if (!loggedUser) {
      setError("You must be logged in to access this page.");
      return;
    }
    setCurrentUser(loggedUser);

    async function fetchUsers() {
      try {
        const allUsers = await usersApi.getAllUsers();
        const filteredUsers = allUsers.filter(
          (u) => u.role === loggedUser.role && u.id !== loggedUser.id
        );
        setUsers(filteredUsers);

        const unread = await msgApi.getUnreadCount(loggedUser.id);
        if (!unread.success || !unread.data) {
          setError(unread.message || "Failed to load unread messages.");
          return;
        }
        const unreadList: UnreadDto[] = unread.data;

        const counts: Record<number, number> = {};
        if (unreadList) {
          for (const u of unreadList) {
            counts[u.idSnd] = u.unreadCount;
          }
        }
        setUnreadCounts(counts);
        setError("");
        } catch (err) {
          console.error(err);
          setError("Failed to users.");
        }
    }

    fetchUsers();

      const interval = setInterval(fetchUsers, 200);
      return () => clearInterval(interval);
  }, []);

  const openChat = (user: UserDto) => {
    navigate(`/chat`, {
      state: { username: user.username, id: user.id },
    });
  };

  //if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!currentUser) return <div className="p-4">Loading...</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800/90">
      <div className="w-full max-w-md h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="grid grid-cols-3 items-center bg-gray-200 p-3">
          <button className="p-2 rounded-full hover:bg-gray-300 justify-self-start">
            <button onClick={handleLogout}>
              <img src="/back.png" alt="Back" className="w-5 h-5" />
            </button>
          </button>
          <h2 className="text-center font-semibold text-lg p-3 border-b bg-gray-100">
            Select a Chat
          </h2>
          <button className="p-2 rounded-full hover:bg-gray-300 justify-self-end">
            <a href="/account">
              <img src="/account.png" alt="Account" className="w-5 h-5" />
            </a>
          </button>
          <div className="w-9" />
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                onClick={() => openChat(user)}
              >
                  <div className="w-8 flex justify-center">
                    {unreadCounts[user.id] && unreadCounts[user.id] > 0 ? (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {unreadCounts[user.id]}
                      </span>
                    ) : (
                      <span className="w-6" />
                    )}
                  </div>
                <span className="flex-grow">{user.username}</span>
            </li>
            ))}
          </ul>
          {error && <p className="text-md text-center text-red-700/80 font-medium">{error}</p>}
        </div>
      </div>
    </main>
  );
}