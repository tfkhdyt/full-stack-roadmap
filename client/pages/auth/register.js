import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { Alert } from '../../config'
import AuthHeader from '../../components/AuthHeader'
import FormButton from '../../components/FormButton'
import InputForm from '../../components/InputForm'

function Register() {
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(password)
    Alert.fire({
      title: 'Loading...',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Alert.showLoading()
      },
    })

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        fullName,
        email,
        password,
      })
      .then((res) => {
        Alert.close()
        Alert.fire({
          icon: 'success',
          title: 'Registrasi berhasil!',
          text: 'Pergi ke halaman login?',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/auth/login')
          }
        })
      })
      .catch((err) => {
        Alert.close()
        console.log(err)
        Alert.fire({
          icon: 'error',
          title: 'Registrasi gagal!',
        })
      })
  }

  return (
    <div>
      <Head>
        <title>Register | Full Stack Roadmap</title>
      </Head>
      <div className='flex flex-col p-3 space-y-3 md:mx-48 lg:mx-96 md:min-h-screen md:grid md:place-items-center'>
        <div className='lg:flex lg:flex-col'>
          <div className='flex justify-center'>
            <AuthHeader>Registration</AuthHeader>
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
              <FormButton color='green-600'>Register</FormButton>
            </form>
          </div>
          <div className='px-6'>
            <p className='text-gray-200 text-sm mt-4 flex justify-center items-center font-light'>
              Sudah punya akun?{' '}
              <Link href='/auth/login'>
                <a className='bg-sky-600 px-2 py-1 rounded-md text-xs mx-2 font-medium text-gray-800'>
                  Login
                </a>
              </Link>{' '}
              sekarang!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
