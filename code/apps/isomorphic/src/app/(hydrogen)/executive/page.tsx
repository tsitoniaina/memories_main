import { metaObject } from '@/config/site.config';
import ExecutiveDashboard from '@/app/shared/executive';

export const metadata = {
  ...metaObject('Executive Index'),
};

export default function ExecutiveDashboardPage() {
  return <ExecutiveDashboard />;
}
