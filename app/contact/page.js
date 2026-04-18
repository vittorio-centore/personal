import LegacyPage from '../../components/LegacyPage';
import { getLegacyPage } from '../../lib/legacy-page';

export const metadata = {
  title: 'Contact - Vittorio\'s Website'
};

export default function ContactPage() {
  const page = getLegacyPage('contact.html');
  return <LegacyPage bodyHtml={page.bodyHtml} scripts={page.scripts} />;
}
