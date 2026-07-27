/**
 * Returns the correct API URL prefixed with the Next.js basePath.
 * Use this for all client-side fetch() calls to /api/* routes.
 *
 * Example:
 *   apiUrl('/api/clubs')  =>  '/api/clubs'
 */
export function apiUrl(path: string): string {
  // Only use basePath if we are in production (e.g. GitHub Pages)
  const isDev = process.env.NODE_ENV === 'development';
  const base = isDev ? '' : (process.env.NEXT_PUBLIC_BASE_PATH ?? '');
  return `${base}${path}`;
}
