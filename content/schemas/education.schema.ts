import { z } from 'zod';

export const educationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  campus: z.string().optional(),
  start: z.string().regex(/^\d{4}$/),
  end: z.string().regex(/^\d{4}$/).or(z.literal('present')),
});

export type Education = z.infer<typeof educationSchema>;
