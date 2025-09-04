import type { ValidationResult } from "../../../types/validation/ValidationResult";

export function dataValidationMessage(messageContent: string): ValidationResult {
    
    if (messageContent.length > 500)
    {
        return { success: false, message: 'Message can contain only 500 characters.' };
    }
    return { success: true };
}