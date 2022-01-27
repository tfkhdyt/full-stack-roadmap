import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { Alert } from '../../config'
import FormButton from '../../components/FormButton'
import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import Layout from '../../components/Layout'

const Register = () => {
  const [fullName, setFullName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        fullName,
        email,
        password,
      })
      Alert.close()
      const res = await Alert.fire({
        icon: 'success',
        title: 'Registrasi berhasil!',
        text: 'Pergi ke halaman login?',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      })

      if (res.isConfirmed) {
        router.push('/auth/login')
      }
    } catch (err: any) {
      Alert.close()
      console.log(err.response.data)
      const msg = err.response.data.errors
        .map((e: any) => {
          return e.msg
        })
        .join(',\n')
      Alert.fire({
        icon: 'error',
        title: 'Registrasi gagal!',
        text: err.response.data.errors && msg,
      })
    }
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Register | Full Stack Roadmap</title>
        </Head>
        <div className='flex flex-col space-y-3 p-3 md:mx-48 md:grid md:min-h-screen md:place-items-center lg:mx-96'>
          <div className='lg:flex lg:flex-col'>
            <div className='flex justify-center'>
              <Header>
                <p className='text-2xl font-bold'>Registration</p>
              </Header>
            </div>
            <div className='px-6'>
              <form method='POST' className='space-y-3' onSubmit={handleSubmit}>
                <InputForm
                  label='Full Name'
                  id='fullName'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFullName(e.target.value)
                  }
                />
                <InputForm
                  label='Email'
                  id='email'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <InputForm
                  label='Password'
                  id='password'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <FormButton color='green-600'>Register</FormButton>
              </form>
            </div>
            <div className='px-6'>
              <p className='mt-4 flex items-center justify-center text-sm font-light text-gray-200'>
                Sudah punya akun?{' '}
                <Link href='/auth/login'>
                  <a className='mx-2 rounded-md bg-sky-600 px-2 py-1 text-xs font-medium text-gray-800'>
                    Login
                  </a>
                </Link>{' '}
                sekarang!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
