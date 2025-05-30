// src/lib/validations.ts
import { z } from 'zod';

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase()
    .trim()
});

// Password validation schema
export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Password must contain at least one uppercase letter, one lowercase letter, and one number')
});

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema.shape.email,
  password: z.string().min(1, 'Password is required')
});

// Signup validation schema
export const signupSchema = z.object({
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .trim()
    .optional()
});

// Check email schema
export const checkEmailSchema = emailSchema;

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { 
      success: false, 
      errors: { general: 'Validation failed' } 
    };
  }
}

// Client-side validation helpers
export const validateEmail = (email: string): string | null => {
  const result = emailSchema.safeParse({ email });
  return result.success ? null : result.error.errors[0]?.message || 'Invalid email';
};

export const validatePassword = (password: string): string | null => {
  const result = passwordSchema.safeParse({ password });
  return result.success ? null : result.error.errors[0]?.message || 'Invalid password';
};

export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) return null; // Optional field
  
  if (name.trim().length < 2) return 'Name must be at least 2 characters long';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  
  return null;
};