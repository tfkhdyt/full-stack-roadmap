import { NextResponse } from 'next/server'

function middleware(req) {
  const { token } = req.cookies

  console.log('req.url =', req.url)

  if (req.url == '/auth') return NextResponse.redirect('/auth/login')
  if (token) return NextResponse.redirect('/dashboard')
}

export default middleware
