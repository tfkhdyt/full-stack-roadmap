import { NextResponse, NextRequest } from 'next/server'

const middleware = (req: NextRequest) => {
  const { token } = req.cookies

  if (req.url == '/auth') {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }
  if (token) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }
}

export default middleware
