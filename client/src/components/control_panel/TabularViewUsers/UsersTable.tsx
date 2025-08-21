import { useEffect, useState } from "react";
import type { IUsersAPIService } from "../../../api_services/users/IUsersAPIService.ts";
import type { UserDto } from "../../../models/users/UserDto.ts";
import { RowInUserTable } from "./RowInUserTable.tsx";
import { useAuth } from "../../../hooks/auth/useAuthHook.ts";
import { DeleteValueByKey } from "../../../helpers/local_storage.ts";

interface UsersTableProps {
  usersApi: IUsersAPIService;
}

export function UsersTable({ usersApi }: UsersTableProps) {
  const [users, setUsers] = useState<UserDto[]>([]);
  const { token, logout } = useAuth();

   const handleLogout = () => {
    DeleteValueByKey("authToken");
    logout();
  };

  useEffect(() => {
    (async () => {
      const data = await usersApi.getAllUsers(token ?? "");
      setUsers(data);
    })();
  }, [token, usersApi]);

  return (
    <div className="bg-white/30 backdrop-blur-lg border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        User List
      </h2>
      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="text-gray-700 border-b border-gray-300">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <RowInUserTable key={user.id} user={user} />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-4">
                No users for view.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={handleLogout}
        className="mt-8 px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl ransition"
      >
        Exit control panel
      </button>
    </div>
  );
}
