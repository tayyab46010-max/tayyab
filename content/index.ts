import { profileSchema } from './schemas/profile.schema';
import { experienceSchema } from './schemas/experience.schema';
import { educationSchema } from './schemas/education.schema';
import { certificateSchema } from './schemas/certificate.schema';
import { projectSchema } from './schemas/project.schema';
import { profile } from './profile';
import { experiences } from './experiences';
import { education } from './education';
import { certificates } from './certificates';
import { projects } from './projects';

export const content = {
  profile: profileSchema.parse(profile),
  experiences: experiences.map((e) => experienceSchema.parse(e)),
  education: education.map((e) => educationSchema.parse(e)),
  certificates: certificates.map((c) => certificateSchema.parse(c)),
  projects: projects.map((p) => projectSchema.parse(p)),
};

export const certificateCount = content.certificates.length;

export const certificateDomains = [
  ...new Set(content.certificates.map((c) => c.domain)),
] as const;

export const certificateIssuers = [
  ...new Set(content.certificates.map((c) => c.issuer)),
] as const;

export const certificateYears = [
  ...new Set(
    content.certificates.map((c) => {
      const match = c.date.match(/^(\d{4})/);
      return match ? match[1] : c.date;
    })
  ),
].sort() as string[];

export { content as default };
export type Content = typeof content;
