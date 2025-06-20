import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { EndpointAPI } from '@/api/EndpointAPI'

export interface TokenPayload {
  sub: string
  username: string
  scope: string
  iat: number
  exp: number
}

export async function middleware(request: NextRequest) {
  const baseUrl = EndpointAPI.BaseUrl
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const pathname = request.nextUrl.pathname
  const publicRoutes = ['/auth/login', '/auth/register', '/']

  if (!token && !refreshToken && !publicRoutes.includes(pathname)) {
    const pathCurrent = decodeURIComponent(request.nextUrl.pathname)
    const nextUrl = new URL(`/auth/login`, request.url)
    nextUrl.searchParams.set('next', pathCurrent)
    return NextResponse.redirect(nextUrl)
  }

  let payload: TokenPayload | null = null
  try {
    const introspectResponse = await fetch(`${baseUrl}/auth/introspect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    })

    const result = await introspectResponse.json()
    if (!result.success) {
      const res = NextResponse.redirect(new URL('/403', request.url))
      // res.cookies.set('token', '', { path: '/', expires: new Date(0) })
      // res.cookies.set('refreshToken', '', { path: '/', expires: new Date(0) })
      return res
    }

    if (token) {
      payload = jwt.decode(token) as TokenPayload
    }
  } catch {
    const res = NextResponse.redirect(new URL('/auth/login', request.url))
    return res
  }

  const now = Math.floor(Date.now() / 1000)
  if (payload && payload.exp < now) {
    try {
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      })

      if (!response.ok) {
        const res = NextResponse.redirect(new URL('/auth/login', request.url))
        res.cookies.set('token', '', { path: '/', expires: new Date(0) })
        res.cookies.set('refreshToken', '', { path: '/', expires: new Date(0) })
        return res
      }

      const result = await response.json()
      const { token: newToken, refreshToken: newRefreshToken } = result.data

      const res = NextResponse.next()
      res.cookies.set('token', newToken, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
      })
      res.cookies.set('refreshToken', newRefreshToken, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
      })
      return res
    } catch {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  const scopes = payload?.scope.split(' ')
  if (pathname.startsWith('/admin') && !scopes?.includes('ROLE_ADMIN')) {
    return NextResponse.redirect(new URL('/403', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/product-detail/:path'],
}
