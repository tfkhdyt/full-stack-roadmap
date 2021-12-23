import { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

import AuthButton from '../../components/AuthButton'
import AuthHeader from '../../components/AuthHeader'
import InputForm from '../../components/InputForm'

const MySwal = withReactContent(Swal)

function Register() {
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(password)
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
      .post('http://localhost:4000/register', {
        fullName,
        email,
        password,
      })
      .then((res) => {
        MySwal.close()
        MySwal.fire({
          icon: 'success',
          title: 'Registration success!',
        })
      })
      .catch((err) => {
        MySwal.close()
        MySwal.fire({
          icon: 'error',
          title: 'Registration failed!',
        })
      })
  }

  return (
    <div className='flex flex-col p-3 space-y-3 md:mx-48 lg:mx-56'>
      <div className='flex justify-center'>
        <AuthHeader />
      </div>
      <div className='px-6'>
        <form method='POST' className='space-y-3' onSubmit={handleSubmit}>
          <InputForm
            label='Full Name'
            id='fullName'
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <AuthButton>Register</AuthButton>
        </form>
      </div>
      <div className='px-6'>
        <p className='text-gray-200 text-sm mt-4 flex items-center font-light'>
          Sudah punya akun?{' '}
          <Link href='/auth/login'>
            <a className='bg-sky-600 px-2 py-1 rounded-md text-xs mx-2 font-medium'>
              Login
            </a>
          </Link>{' '}
          sekarang!
        </p>
      </div>
    </div>
  )
}

export default Register
