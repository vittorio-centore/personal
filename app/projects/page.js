import LegacyPage from '../../components/LegacyPage';
import { getLegacyPage } from '../../lib/legacy-page';

export const metadata = {
  title: 'Projects - Vittorio\'s Website'
};

export default function ProjectsPage() {
  const page = getLegacyPage('projects.html');
  return <LegacyPage bodyHtml={page.bodyHtml} scripts={page.scripts} />;
}
