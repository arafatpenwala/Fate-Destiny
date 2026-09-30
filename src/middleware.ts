import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic in-memory rate limiting (Note: In a distributed serverless environment like Vercel, 
// this map resets per function instance. For robust production rate-limiting, use Redis/Upstash).
type RateLimit = { count: number; expiresAt: number };
const rateLimitMap = new Map<string, RateLimit>();

function checkRateLimit(ip: string, path: string, limit: number, windowMs: number): boolean {
  const key = `${ip}:${path}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false; // Rate limit exceeded
  }

  record.count += 1;
  return true;
}

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Clone the request headers so we can modify them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Enforce HTTPS and HSTS
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const path = request.nextUrl.pathname;

  // 1. Block Suspicious Paths
  const suspiciousPaths = ['.env', 'wp-admin', 'phpmyadmin', '.git', 'config.php'];
  if (suspiciousPaths.some(p => path.toLowerCase().includes(p))) {
    console.warn(JSON.stringify({ level: 'SECURITY', event: 'SUSPICIOUS_TRAFFIC', ip, path, timestamp: new Date().toISOString() }));
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Rate Limiting for APIs
  if (path.startsWith('/api/')) {
    let allowed = true;
    
    // AI Generation (Chat) - Strict limit (e.g., 10 req / min)
    if (path.startsWith('/api/chat')) {
      allowed = checkRateLimit(ip, '/api/chat', 10, 60000);
    } 
    // Lead Creation / Account - Strict limit (e.g., 5 req / min)
    else if (path.startsWith('/api/leads')) {
      allowed = checkRateLimit(ip, '/api/leads', 5, 60000);
    }
    // Generic API Limits (e.g., 60 req / min)
    else {
      allowed = checkRateLimit(ip, 'generic_api', 60, 60000);
    }

    if (!allowed) {
      console.warn(JSON.stringify({ level: 'SECURITY', event: 'RATE_LIMIT_EXCEEDED', ip, path, timestamp: new Date().toISOString() }));
      return new NextResponse(JSON.stringify({ error: "Too many requests, please try again later." }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
