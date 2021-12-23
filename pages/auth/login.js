import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import Cookies from 'universal-cookie'
import moment from 'moment'

import AuthButton from '../../components/AuthButton'
import AuthHeader from '../../components/AuthHeader'
import InputForm from '../../components/InputForm'

const MySwal = withReactContent(Swal)

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  const cookie = new Cookies()
  const [token] = useState(cookie.get('token') || null)

  useEffect(() => {
    if (token)
      router.push('/dashboard')
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    MySwal.fire({
      title: 'Loading...',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading()
      },
    })

    axios
      .post('http://localhost:4000/login', {
        email,
        password,
      })
      .then((res) => {
        MySwal.close()
        cookie.set('token', res.data.accessToken, {
          path: '/',
          maxAge: moment().add(1, 'months'),
        })
        MySwal.fire({
          icon: 'success',
          title: 'Login berhasil!',
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/dashboard')
          }
        })
      })
      .catch((err) => {
        MySwal.close()
        switch (err.response.status) {
          case 500:
            MySwal.fire({
              icon: 'error',
              title: 'Login gagal!',
              text: 'Terjadi kesalahan pada server',
            })
            break
          case 404:
            MySwal.fire({
              icon: 'error',
              title: 'Login gagal!',
              text: 'Akun tidak ditemukan ',
            })
            break
          case 401:
            MySwal.fire({
              icon: 'error',
              title: 'Login gagal!',
              text: 'Password salah',
            })
            break
          default:
            MySwal.fire({
              icon: 'error',
              title: 'Login gagal!',
            })
            break
        }
      })
  }

  return (
    <div className='flex flex-col p-3 space-y-3 md:mx-48 lg:mx-56'>
      <div className='flex justify-center'>
        <AuthHeader>Login</AuthHeader>
      </div>
      <div className='px-6'>
        <form method='POST' className='space-y-3' onSubmit={handleSubmit}>
          <InputForm
            label='Email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            label='Password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton type='login'>Login</AuthButton>
        </form>
      </div>
      <div className='px-6'>
        <p className='text-gray-200 text-sm mt-4 flex items-center font-light'>
          Belum punya akun?{' '}
          <Link href='/auth/register'>
            <a className='bg-green-600 px-2 py-1 rounded-md text-xs mx-2 font-medium'>
              Register
            </a>
          </Link>{' '}
          sekarang!
        </p>
      </div>
    </div>
  )
}

export default Login
