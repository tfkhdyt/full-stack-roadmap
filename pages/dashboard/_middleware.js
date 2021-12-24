import { NextResponse } from 'next/server'

function Middleware(req) {
  const { token } = req.cookies

  if (!token) {
    const res = NextResponse.redirect('/auth/login')
    return res.cookie('msg', 'unauthenticated')
  }
}

export default Middleware
