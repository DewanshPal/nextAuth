import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  //public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || ''

  //redirect to home if user is logged in and tries to access login or signup page
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  //redirect to login if user is not logged in and tries to access a protected route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 

export const config = {
  // Match all paths
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}