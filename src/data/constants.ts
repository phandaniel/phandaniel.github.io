export const PHILOSOPHIES = [
  {
    id: '01',
    title: 'Architecture',
    desc: 'Building robust foundations with modular, scalable, and maintainable systems.',
  },
  {
    id: '02',
    title: 'Performance',
    desc: 'Optimizing for speed and efficiency to ensure sub-second response times.',
  },
  {
    id: '03',
    title: 'Precision',
    desc: 'A meticulous approach to UI detail, ensuring every pixel serves a purpose.',
  },
] as const;

const CORE_STACK = ['Astro', 'TypeScript', 'Tailwind CSS', 'Node.js'] as const;
const ADDITIONAL_STACK = ['React', 'Next.js', 'PostgreSQL', 'Docker'] as const;

export const TECH_STACK = [...CORE_STACK, ...ADDITIONAL_STACK];

export const SITE_METADATA = {
  title: 'Daniel Phan',
  author: 'Daniel Phan',
  defaultDescription:
    'Daniel Phan - Digital Craftsman & Software Engineer focused on minimalist, high-performance web applications.',
  siteUrl: 'https://phandaniel.github.io',
  location: 'Washington, D.C. Metro',
  status: 'Building the digital forge',
} as const;
