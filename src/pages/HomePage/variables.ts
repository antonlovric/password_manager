import { z } from 'zod';

export const addPasswordSchema = z.object({
  website: z.string().nonempty('Website is required'),
  username: z.string().nonempty('Username / email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(10, 'Password must be at least 10 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
    ),
});

export type AddPasswordSchema = z.infer<typeof addPasswordSchema>;
