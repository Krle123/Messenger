import type { ValidationResult } from "../../../types/validation/ValidationResult";

export function dataValidationAccount(firstName: string, lastName: string, phone: string): ValidationResult {
    
    const nameRegex = /^[A-Z][a-z]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (firstName === '')
        return { success: true };
    if (lastName === '')
        return { success: true };
    if (phone === '')
        return { success: true };
    if (firstName.length < 2)
    {
        return { success: false, message: 'First name must contain at least 2 characters.' };
    }
    if (firstName.length > 50)
    {
        return { success: false, message: 'First name must contain at most 50 characters.' };
    }
    if (!nameRegex.test(firstName)) 
    {
        return { success: false, message: 'First name must start with a capital letter and contain only letters.' };
    }
    if (lastName.length < 2)
    {
        return { success: false, message: 'Last name must contain at least 2 characters.' };
    }
    if (lastName.length > 50)
    {
        return { success: false, message: 'Last name must contain at most 50 characters.' };
    }
    if (!nameRegex.test(lastName)) 
    {
        return { success: false, message: 'Last name must start with a capital letter and contain only letters.' };
    }
    if (phone.length < 10 || phone.length > 15)
    {
        return { success: false, message: 'Phone number must contain between 10 and 15 characters.' };
    }
    if (!phoneRegex.test(phone)) 
    {
        return { success: false, message: 'Phone number must contain only numbers.' };
    }
    return { success: true };
}