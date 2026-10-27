import { z } from 'zod';

export const projectStatusSchema = z.enum([
  'shipped',
  'in-development',
  'planned',
  'archived',
]);

export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(5),
  status: projectStatusSchema,
  problem: z.string().min(10),
  role: z.string().min(5),
  stack: z.array(z.string().min(1)).min(1),
  whatShipped: z.array(z.string().min(5)).optional(),
  whatLearned: z.array(z.string().min(5)).optional(),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
