import { useEffect, useState } from 'react'
import Link from 'next/link'
import AuthButton from '../../components/AuthButton'
import AuthHeader from '../../components/AuthHeader'
import InputForm from '../../components/InputForm'

function Register() {
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Full Name\t: ${fullName}
Email\t: ${email}
Password\t: ${password}`)
  } 

  return (
    <div className='flex flex-col p-3 space-y-3 md:mx-48 lg:mx-56'>
      <div className='flex justify-center'>
        <AuthHeader />
      </div>
      <div className='px-6'>
        <form className='space-y-3' onSubmit={handleSubmit}>
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
            <a className='bg-sky-600 px-2 py-1 rounded-md text-xs mx-2 font-medium'>Login</a>
          </Link>{' '}
          sekarang!
        </p>
      </div>
    </div>
  )
}

export default Register
