import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Load server/.env by absolute path so it works regardless of the cwd the
 * server is started from. `override: true` makes .env the source of truth even
 * if a stale OPENAI_API_KEY is already set in the shell environment.
 *
 * Must be imported before any module that reads process.env.
 */
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(serverRoot, '.env'), override: true });
