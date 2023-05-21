import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(10, 'Password must be at least 10 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
