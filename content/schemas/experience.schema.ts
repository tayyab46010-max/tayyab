import { z } from 'zod';

export const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  start: z.string().regex(/^\d{4}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}$/).or(z.literal('present')),
  description: z.string().min(20),
  highlights: z.array(z.string().min(5)).min(1),
});

export type Experience = z.infer<typeof experienceSchema>;
