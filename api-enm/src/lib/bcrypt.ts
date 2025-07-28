import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

let impl: any;
try {
  // Prefer native bcrypt if available
  impl = require('bcrypt');
} catch {
  // Fallback to pure JS in CI
  impl = require('bcryptjs');
  console.warn('Using bcryptjs fallback');
}

export default impl;
