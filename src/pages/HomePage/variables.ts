import { z } from 'zod';

export const addPasswordSchema = z.object({
  website: z.string().nonempty('Website is required'),
  username: z.string().nonempty('Username / email is required'),
  password: z.string().nonempty('Password is required'),
});

export type AddPasswordSchema = z.infer<typeof addPasswordSchema>;
