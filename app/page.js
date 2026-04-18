import LegacyPage from '../components/LegacyPage';
import { getLegacyPage } from '../lib/legacy-page';

export const metadata = {
  title: "Vittorio's Website"
};

export default function HomePage() {
  const page = getLegacyPage('index.html');
  return <LegacyPage bodyHtml={page.bodyHtml} scripts={page.scripts} />;
}
