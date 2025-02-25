import type { NavigationItem } from '../NavBar/NavBar';
import { routes } from 'wasp/client/router';
import { BlogUrl, DocsUrl } from '../../../shared/common';

export const appNavigationItems: NavigationItem[] = [
  // { name: 'AI Scheduler (Demo App)', to: routes.DemoAppRoute.to },
  // { name: 'File Upload (AWS S3)', to: routes.FileUploadRoute.to },
  { name: 'Dashboard', to: routes.DashboardRoute.to },
  // { name: 'Applications', to: routes.ApplicationsPageRoute.to },
  //{ name: 'Pricing', to: routes.PricingPageRoute.to },
  //{ name: 'Documentation', to: DocsUrl },
  //{ name: 'Blog', to: BlogUrl },
];
