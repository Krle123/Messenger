import type { UserDto } from "../../../models/users/UserDto";

interface RowInUserTableProps {
  user: UserDto;
}

export function RowInUserTable({ user }: RowInUserTableProps) {
  return (
    <tr className="hover:bg-gray-100 transition">
      <td className="px-4 py-2">{user.id}</td>
      <td className="px-4 py-2">{user.username}</td>
      <td className="px-4 py-2">{user.role}</td>
    </tr>
  );
}
