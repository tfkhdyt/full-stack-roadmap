import { NextResponse } from 'next/server'

function Middleware(req) {
  const { token, logout } = req.cookies

  if (!token) {
    return NextResponse.redirect('/auth/login')
  }
}

export default Middleware
