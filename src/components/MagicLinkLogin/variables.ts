import { z } from 'zod';

export const magicLinkSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
});

export type MagicLinkSchema = z.infer<typeof magicLinkSchema>;
