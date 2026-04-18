import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/vittorioc/personal_website';

const PATH_REWRITES = [
  ['href="index.html"', 'href="/"'],
  ['href="projects.html"', 'href="/projects"'],
  ['href="university.html"', 'href="/university"'],
  ['href="about.html"', 'href="/about"'],
  ['href="contact.html"', 'href="/contact"'],
  ["href='index.html'", "href='/'"],
  ["href='projects.html'", "href='/projects'"],
  ["href='university.html'", "href='/university'"],
  ["href='about.html'", "href='/about'"],
  ["href='contact.html'", "href='/contact'"],
  ['href="assets/', 'href="/assets/'],
  ['src="assets/', 'src="/assets/'],
  ["href='assets/", "href='/assets/"],
  ["src='assets/", "src='/assets/"],
  ['src="script.js"', 'src="/script.js"'],
  ["src='script.js'", "src='/script.js'"],
  ['src="assets/js/tabs.js"', 'src="/assets/js/tabs.js"'],
  ["src='assets/js/tabs.js'", "src='/assets/js/tabs.js'"]
];

export function getLegacyPage(filename) {
  const fullPath = path.join(ROOT, filename);
  const html = fs.readFileSync(fullPath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);

  let bodyHtml = bodyMatch ? bodyMatch[1] : html;
  const scripts = [];

  for (const [from, to] of PATH_REWRITES) {
    bodyHtml = bodyHtml.split(from).join(to);
  }

  bodyHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    scripts.push(match);
    return '';
  });

  return {
    title: titleMatch ? titleMatch[1] : "Vittorio's Website",
    bodyHtml,
    scripts
  };
}
