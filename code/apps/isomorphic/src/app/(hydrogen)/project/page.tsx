import ProjectDashboard from '@/app/shared/project-dashboard';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Project Management Index'),
};

export default function ProjectDashboardPage() {
  return <ProjectDashboard />;
}
