import { z } from 'zod';

export const certificateDomainSchema = z.enum([
  'software',
  'data',
  'design',
  'marketing',
  'office',
  'communication',
]);

export type CertificateDomain = z.infer<typeof certificateDomainSchema>;

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  id: z.string().optional(),
  domain: certificateDomainSchema,
  verifyUrl: z.string().url().optional(),
  thumbnail: z.string().optional(),
});

export type Certificate = z.infer<typeof certificateSchema>;
