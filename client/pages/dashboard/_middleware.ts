import { NextResponse, NextRequest } from 'next/server'

const Middleware = (req: NextRequest) => {
  const { token } = req.cookies

  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }
}

export default Middleware
