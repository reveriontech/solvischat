import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = spawn(process.execPath, [path.join(root, 'server', 'index.js')], {
  cwd: root,
  stdio: 'inherit',
});
const client = spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')], {
  cwd: root,
  stdio: 'inherit',
});

const shutdown = () => {
  server.kill();
  client.kill();
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
server.on('exit', (code, signal) => {
  if (signal) shutdown();
  else if (code !== 0 && code !== null) process.exit(code);
});
client.on('exit', (code, signal) => {
  if (signal) shutdown();
  else if (code !== 0 && code !== null) process.exit(code);
});
