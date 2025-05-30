import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export interface TokenPayload {
  sub: string
  username: string
  scope: string
  iat: number
  exp: number
}
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname
  const publicRoutes = ['/auth/login', '/auth/register', '/']
  // const privateRoutes = ['/profile', '/admin']
  if (!token && !publicRoutes.includes(pathname)) {
    const pathCurrent = decodeURIComponent(request.nextUrl.pathname)
    const nextUrl = new URL(`/auth/login`, request.url)
    nextUrl.searchParams.set('next', pathCurrent)
    return NextResponse.redirect(nextUrl)
  }

  if (!token) return NextResponse.next()

  let payload: TokenPayload | null = null
  try {
    payload = jwt.decode(token) as TokenPayload
    console.log(payload)
    if (!payload) throw new Error('Token decode failed')
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp < now) {
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  const scopes = payload.scope.split(' ')
  if (pathname.startsWith('/admin') && !scopes.includes('ROLE_ADMIN')) {
    return NextResponse.redirect(new URL('/403', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/profile', '/settings'],
}
