import LegacyPage from '../../components/LegacyPage';
import { getLegacyPage } from '../../lib/legacy-page';

export const metadata = {
  title: 'About - Vittorio\'s Website'
};

export default function AboutPage() {
  const page = getLegacyPage('about.html');
  return <LegacyPage bodyHtml={page.bodyHtml} scripts={page.scripts} />;
}
