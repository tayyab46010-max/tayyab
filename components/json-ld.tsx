import { content } from '@/content';

export function PersonJsonLd() {
  const { profile, education: edu, certificates: certs } = content;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': '#person',
    name: profile.name,
    url: 'https://tayyab.co',
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    knowsAbout: [
      'Software Engineering',
      'Frontend Development',
      'UI/UX Design',
      'Webflow Development',
      'Shopify Development',
      'WordPress Development',
      'Custom E-commerce Setup',
      'Odoo E-commerce',
      'AI with Python',
      'Artificial Intelligence',
      'Data Analytics',
      'Digital Marketing',
      'SEO',
      'Graphic Design',
      'Inventory Management',
      'Warehouse Operations',
      'Business Development',
    ],
    alumniOf: edu.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
      ...(e.campus ? { department: e.campus } : {}),
    })),
    hasCredential: certs.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: c.issuer,
      },
      ...(c.date ? { dateCreated: c.date } : {}),
      ...(c.id ? { identifier: c.id } : {}),
      ...(c.verifyUrl
        ? {
            credentialCategory: 'verified',
            url: c.verifyUrl,
          }
        : {}),
    })),
    sameAs: [
      profile.links.linkedin,
      profile.links.github,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tayyab Ali',
    url: 'https://tayyab.co',
    description:
      'Personal portfolio of Tayyab Ali — software engineering student, business development.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function ProfessionalServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tayyab Ali — Web Development & UI/UX Design',
    url: 'https://tayyab.co',
    description:
      'Custom e-commerce stores (Shopify, Webflow, WordPress, Odoo), dropshipping setups, and clean front-end web apps built by Tayyab Ali.',
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sialkot',
      addressCountry: 'Pakistan',
    },
    founder: {
      '@type': 'Person',
      name: 'Tayyab Ali',
      url: 'https://tayyab.co',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Shopify Store Development',
          description: 'Custom Shopify store setup, theme customization, and dropshipping configurations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Webflow Development',
          description: 'Responsive Webflow sites with custom interactions and CMS.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WordPress Development',
          description: 'Custom WordPress themes, plugins, and e-commerce with WooCommerce.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom E-commerce Setup (Odoo)',
          description: 'Odoo-based e-commerce configuration and custom module setup.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Frontend Web App Development',
          description: 'React and Next.js web applications with modern UI/UX.',
        },
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/tayyab-ali-68980b404',
      'https://github.com/tayyab46010-max',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://tayyab.co${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
