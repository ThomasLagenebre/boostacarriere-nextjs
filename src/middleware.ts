import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const authPages = ['/login', '/register'];
  const protectedPages = ['/dashboard'];

  const { pathname } = request.nextUrl;

  // Check authentication status
  try {
    const token = request.cookies.get('auth_token')?.value;
    const isAuthenticated = !!token;

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && authPages.some(page => pathname.startsWith(page))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Protect routes for authenticated users only
    if (protectedPages.some(page => pathname.startsWith(page)) && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  } catch (error) {
    console.error('Auth check failed:', error);
    if (protectedPages.some(page => pathname.startsWith(page))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*',
    '/register/:path*',
    '/dashboard/:path*',
  ],
}; 