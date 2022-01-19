import { NextResponse, NextRequest } from 'next/server'

const Middleware = (req: NextRequest) => {
  const { token } = req.cookies

  if (!token) {
    return NextResponse.redirect('/auth/login')
  }
}

export default Middleware
