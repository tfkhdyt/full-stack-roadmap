import { NextResponse } from 'next/server'
import Cookies from 'universal-cookie'

function middleware(req) {
  const { token, logout } = req.cookies
  const cookies = new Cookies()

  if (token) return NextResponse.redirect('/dashboard')
}

export default middleware
