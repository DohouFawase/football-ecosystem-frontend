import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // /* SÉCURITÉ ADMIN UNIQUEMENT */
  // Vérifier connexion utilisateur
  const sessionToken = request.cookies.get('auth-token')?.value
  const userSession = request.cookies.get('user-session')?.value
  
  if (!sessionToken || !userSession) {
    // Pas connecté → login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // /* VÉRIFICATION RÔLE ADMIN */
  let isAdmin = false
  try {
    const sessionData = JSON.parse(decodeURIComponent(userSession))
    isAdmin = sessionData.roles?.includes('admin') || false
  } catch {
    // Session corrompue → login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // /* BLOQUAGE ROUTE ADMIN */
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard/admin')) {
    if (!isAdmin) {
      // Non-admin → accès refusé
      return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url))
    }
  }
  
  // /* PROXY ABOUT → DASHBOARD */
  if (pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/dashboard/home', request.url))
  }
  
  // Autoriser tout le reste
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/about/:path*',
    '/admin/:path*',
    '/dashboard/admin/:path*'
  ],
}
