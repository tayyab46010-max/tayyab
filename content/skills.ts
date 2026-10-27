export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming & Engineering',
    description: 'Foundations from Cisco Networking Academy and university coursework.',
    skills: ['C++', 'Python (AI applications)', 'Networking Fundamentals', 'WordPress'],
  },
  {
    title: 'Data & Analytics',
    description: 'Applied daily in warehouse operations and validated by DigiSkills certification.',
    skills: ['Data Analytics', 'Business Intelligence', 'High-Accuracy Data Entry', 'Inventory Reporting'],
  },
  {
    title: 'Design & User Experience',
    description: 'Certified design training applied to interface and product work.',
    skills: ['UI/UX Design', 'Graphic Design'],
  },
  {
    title: 'Marketing & Growth',
    description: 'DigiSkills-certified digital marketing disciplines.',
    skills: ['Digital Marketing', 'SEO', 'Affiliate Marketing', 'E-Commerce Management', 'Freelancing'],
  },
  {
    title: 'Business & Operations',
    description: 'Operational experience from pharmaceutical and FMCG supply chains.',
    skills: [
      'Office Management',
      'Business Communication',
      'Business Email',
      'Virtual Assistance',
      'Startup Strategy',
    ],
  },
];
