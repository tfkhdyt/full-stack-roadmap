import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  return {
    props: {},
  }
}

function Dashboard() {
  const cookie = new Cookies()
  const router = useRouter()
  const [token] = useState(cookie.get('token') || null)

  useEffect(() => {
    if (!token) router.push('/auth/login')
  }, [token])

  return <div></div>
}

export default Dashboard
