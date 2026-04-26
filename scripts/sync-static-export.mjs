import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out');
const publicDir = path.join(root, 'public');

const generatedPaths = [
  '_next',
  '_not-found',
  '404',
  'about',
  'contact',
  'mobile',
  'projects',
  'university',
  'index.html',
  'index.txt',
  '404.html',
  '__next.__PAGE__.txt',
  '__next._full.txt',
  '__next._head.txt',
  '__next._index.txt',
  '__next._tree.txt'
];

await fs.access(outDir);

for (const generatedPath of generatedPaths) {
  await fs.rm(path.join(publicDir, generatedPath), { force: true, recursive: true });
}

await fs.cp(outDir, publicDir, {
  recursive: true,
  filter: (source) => !source.startsWith(path.join(outDir, 'assets'))
});
