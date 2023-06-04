import { z } from 'zod';
import { PASSWORD_REGEX } from '../RegistrationPage/variables';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(10, 'Password must be at least 10 characters long')
    .regex(
      PASSWORD_REGEX,
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
