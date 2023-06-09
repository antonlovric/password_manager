import { z } from 'zod';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
export const schema = z
  .object({
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().nonempty('Last name is required'),
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    phoneNumber: z.string().nonempty('Phone number is required'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(12, 'Password must be at least 12 characters long')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
      ),
    confirmPassword: z.string().nonempty('Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type RegistrationSchema = z.infer<typeof schema>;
