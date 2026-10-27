import type { Profile } from './schemas/profile.schema';

export const profile: Profile = {
  name: 'Tayyab Ali',
  title: 'Software Engineering Student',
  location: {
    city: 'Sialkot',
    country: 'Pakistan',
  },
  email: 'tayyab46010@gmail.com',
  phone: '+92 330 7128836',
  whatsapp: 'https://wa.me/923307128836',
  summary:
    'Software engineering student with hands-on experience in warehouse operations, inventory management, and business development. Built full-stack applications (TayyabGPT, Shagaf Gents Saloon) that combine technical execution with client-facing problem solving. Seeking a business development or operations role where data-driven thinking, vendor coordination, and technical fluency drive measurable growth.',
  links: {
    linkedin: 'https://www.linkedin.com/in/tayyab-ali-68980b404',
    github: 'https://github.com/tayyab46010-max',
  },
  languages: [
    { name: 'Urdu', proficiency: 'Native' },
    { name: 'Punjabi', proficiency: 'Native' },
    { name: 'English', proficiency: 'Professional working proficiency' },
  ],
  photos: [
    { src: '/images/1profile.jpg', alt: 'Tayyab Ali — studio portrait' },
    { src: '/images/2profile.jpg', alt: 'Tayyab Ali — seated portrait' },
    { src: '/images/3profile.jpg', alt: 'Tayyab Ali — armchair portrait' },
    { src: '/images/4profile.jpg', alt: 'Tayyab Ali — outdoor portrait' },
    { src: '/images/5profile.jpg', alt: 'Tayyab Ali — porch portrait' },
    { src: '/images/6profile.jpg', alt: 'Tayyab Ali — concrete wall portrait' },
  ],
  headline: 'Software Engineer & Business Development — bridging clean code, data-driven operations, and client growth.',
};
