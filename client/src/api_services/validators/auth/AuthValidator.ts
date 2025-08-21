import type { ValidationResult } from "../../../types/validation/ValidationResult";

export function dataValidationAuth(username?: string, password?: string): ValidationResult {
  if (!username || !password) {
    return { success: false, message: 'Username and password are required.' };
  }

  if (username.length < 3) {
    return { success: false, message: 'Username must contain at least 3 characters.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must contain at least 6 characters.' };
  }

  if (password.length > 20) {
    return { success: false, message: 'Password can contain only 20 characters.' };
  }

  return { success: true };
}
