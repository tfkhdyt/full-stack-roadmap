import { NextResponse } from 'next/server'
import Swal from 'sweetalert2'

function Middleware(req) {
  const { token, msg } = req.cookies

  if (token)
    return NextResponse.redirect('/dashboard')
}

export default Middleware
