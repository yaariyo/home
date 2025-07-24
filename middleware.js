import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/test-smtp',
  '/api/login',
  '/api/logout',
  '/api/forgot-password',
  '/api/reset-password',
  '/api/register',
  '/api/test-smtp',
  '/api/session',
  '/verify-email',
  '/api/verify-email',
];

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const token = req.cookies.get('session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify JWT
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|assets|api/auth).*)'
  ]
}; 