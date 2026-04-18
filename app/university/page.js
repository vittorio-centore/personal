import LegacyPage from '../../components/LegacyPage';
import { getLegacyPage } from '../../lib/legacy-page';

export const metadata = {
  title: 'University - Vittorio\'s Website'
};

export default function UniversityPage() {
  const page = getLegacyPage('university.html');
  return <LegacyPage bodyHtml={page.bodyHtml} scripts={page.scripts} />;
}
