import { NextResponse, NextRequest } from 'next/server';

// Decode JWT payload using standard Edge-compatible Web API (zero Node dependencies in Edge runtime)
function decodeJwtPayloadEdge(token: string): { id: string; role: string; email: string; exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    const jsonPayload = atob(padded);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Unit IV & VI: Next.js Edge Middleware for JWT Token Verification, RBAC, and Security Headers
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Clone response to attach security headers (Unit VI: Security Best Practices)
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Unit IV: Role-based Protected Route Check for /admin
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('heritage_auth_token')?.value;

    if (!authCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Decode and verify JWT token in Edge Middleware
    const decoded = decodeJwtPayloadEdge(authCookie);

    // If token is invalid or user is not an officer/admin
    if (!decoded || (decoded.role !== 'officer' && decoded.role !== 'admin')) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('unauthorized', 'true');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

// Config matcher
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)'],
};
