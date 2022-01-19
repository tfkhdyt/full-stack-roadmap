import { NextResponse, NextRequest } from 'next/server'

const middleware = (req: NextRequest) => {
  const { token } = req.cookies

  if (req.url == '/auth') return NextResponse.redirect('/auth/login')
  if (token) return NextResponse.redirect('/dashboard')
}

export default middleware
