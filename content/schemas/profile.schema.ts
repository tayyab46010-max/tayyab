import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s-]+$/),
  whatsapp: z.string().url(),
  summary: z.string().min(20),
  links: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  languages: z
    .array(
      z.object({
        name: z.string().min(1),
        proficiency: z.string().min(1),
      })
    )
    .optional(),
  photos: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
      })
    )
    .optional(),
  headline: z.string().min(10),
});

export type Profile = z.infer<typeof profileSchema>;
