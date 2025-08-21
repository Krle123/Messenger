import type { AuthResponse } from "../../types/auth/AuthResponse";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  login(username: string, password: string): Promise<AuthResponse>;
  registration(username: string, password: string, role: string): Promise<AuthResponse>;
}