import { jwtDecode } from "jwt-decode";
import { ReadValueByKey } from "./local_storage";


export interface LoggedInUser {
  id: number;
  username: string;
  role?: string;
}

export function getLoggedInUser(): LoggedInUser {
  const token = ReadValueByKey("authToken");
  if (token)
  {
    try {
      const decoded = jwtDecode<LoggedInUser>(token);
      return decoded;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  }
  return { id: 0, username: "" };
}