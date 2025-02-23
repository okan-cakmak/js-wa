import type { NavigationItem } from '../client/components/NavBar/NavBar';
import { routes } from 'wasp/client/router';
import { DocsUrl, BlogUrl } from '../shared/common';
import daBoiAvatar from '../client/static/da-boi.webp';
import avatarPlaceholder from '../client/static/avatar-placeholder.webp';

export const landingPageNavigationItems: NavigationItem[] = [
  // { name: 'Features', to: '#features' },
  // { name: 'Pricing', to: routes.PricingPageRoute.to },
  // { name: 'Documentation', to: DocsUrl },
  // { name: 'Blog', to: BlogUrl },
];

export const features = [
  {
    name: 'High-Performance WebSocket API',
    description: 'Built for speed and reliability. Our optimized WebSocket infrastructure handles your real-time communication needs with minimal latency.',
    icon: '⚡',
    href: DocsUrl,
  },
  {
    name: 'Robust Scaling',
    description: 'Handle millions of concurrent connections with our battle-tested infrastructure. Built to scale with your application needs.',
    icon: '📈',
    href: DocsUrl,
  },
  {
    name: 'Global Network',
    description: 'Deploy your WebSocket connections across our global network for optimal performance and reliability wherever your users are.',
    icon: '🌍',
    href: DocsUrl,
  },
  {
    name: 'Developer-First',
    description: 'Simple, powerful APIs with comprehensive SDKs for all major languages. Start building real-time features in minutes.',
    icon: '👩‍💻',
    href: DocsUrl,
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Lead Developer @ TechCorp',
    avatarSrc: avatarPlaceholder,
    socialUrl: '#',
    quote: 'JetSocket delivers the performance and reliability we need. Our real-time features have never been more stable.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO @ GameStream',
    avatarSrc: avatarPlaceholder,
    socialUrl: '#',
    quote: 'The developer experience is unmatched. Their SDKs and documentation made implementation a breeze.',
  },
  {
    name: 'Emily Thompson',
    role: 'Senior Engineer @ ScaleUp',
    avatarSrc: avatarPlaceholder,
    socialUrl: '#',
    quote: 'We handle millions of concurrent connections with rock-solid stability. JetSocket just works.',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'How does JetSocket compare to Pusher?',
    answer: 'JetSocket offers superior performance, better pricing, and a more developer-friendly experience. Our optimized infrastructure ensures reliable real-time communication at scale.',
  },
  {
    id: 2,
    question: 'What programming languages do you support?',
    answer: 'We support all major languages including JavaScript, Python, Ruby, Go, Java, and more through our comprehensive SDKs.',
  },
  {
    id: 3,
    question: 'Can I migrate from Pusher easily?',
    answer: 'Yes! Our API is designed to be compatible with Pusher, making migration simple. Most teams complete migration in less than a day.',
  },
  {
    id: 4,
    question: 'What kind of support do you offer?',
    answer: 'We offer 24/7 technical support, detailed documentation, and dedicated account managers for enterprise customers.',
  },
];

export const footerNavigation = {
  app: [
    { name: 'Documentation', href: DocsUrl },
    { name: 'Blog', href: BlogUrl },
    { name: 'Status', href: '#' },
    { name: 'Changelog', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Contact', href: '#' },
  ],
};
