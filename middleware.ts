import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Extraire le sous-domaine
  const subdomain = hostname.split('.')[0];

  // Liste des sous-domaines réservés
  const reservedSubdomains = ['www', 'app', 'api', 'admin'];

  // Si c'est un sous-domaine d'organisation (pas www, app, etc.)
  if (subdomain && !reservedSubdomains.includes(subdomain) && hostname.includes('.')) {
    // Redirige vers la route dynamique
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};