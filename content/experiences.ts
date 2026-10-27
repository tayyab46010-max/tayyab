import type { Experience } from './schemas/experience.schema';

export const experiences: Experience[] = [
  {
    role: 'Inventory / Stock Officer',
    company: 'Trimed Pvt. Ltd',
    location: 'Sialkot',
    start: '2024-08',
    end: 'present',
    description:
      'Spearhead pharmaceutical inventory operations — orchestrating stock flow, vendor coordination, and documentation systems that ensure traceability and reduce operational overhead.',
    highlights: [
      'Orchestrated daily inventory receiving and issue across warehouse operations, streamlining stock flow for pharmaceutical distribution',
      'Implemented documentation workflows that improved record traceability and reduced stock discrepancies',
      'Coordinated with logistics partners and vendors to ensure on-time fulfillment, minimizing supply chain delays',
    ],
  },
  {
    role: 'KPO Executive',
    company: "Lay's Warehouse (PepsiCo-owned brand)",
    location: 'Sambrial',
    start: '2024-01',
    end: '2024-07',
    description:
      'Drove high-volume data accuracy for a PepsiCo-owned regional warehouse — maintaining 99.8% precision across logistics documentation that directly reduced waste and prevented stockouts.',
    highlights: [
      'Sustained 99.8% data accuracy across high-volume logistics documentation, directly reducing operational waste and preventing costly stockouts',
      'Optimized supply-chain data flow for a major regional warehouse, enabling faster inventory turnover and fulfillment cycles',
      'Processed and reconciled inventory records for a high-throughput distribution operation, supporting seamless warehouse throughput',
    ],
  },
];
