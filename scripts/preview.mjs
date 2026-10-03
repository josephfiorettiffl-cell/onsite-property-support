import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
};

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/api/request') {
    response.writeHead(501, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'Email delivery is available on Vercel, not in the local preview.' }));
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405).end();
    return;
  }

  let filename;
  try {
    const requested = decodeURIComponent(pathname);
    filename = resolve(root, `.${requested === '/' ? '/index.html' : requested}`);
    if (filename !== root && !filename.startsWith(root + sep)) throw new Error('Invalid path');
    if (!extname(filename)) filename += '.html';
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
    const body = await readFile(filename);
    response.writeHead(200, { 'content-type': `${types[extname(filename)] || 'application/octet-stream'}; charset=utf-8` });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Marketing preview: http://127.0.0.1:${port}/`);
});
