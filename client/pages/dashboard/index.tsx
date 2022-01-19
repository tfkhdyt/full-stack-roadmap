import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { Alert, Toast } from '../../config'
import { SWRTypes } from '../../types/swr'
import { Data } from '../../types/data'
import Loading from '../../components/Loading'
import OptionButton from '../../components/OptionButton'
import Header from '../../components/Header'

const cookies = new Cookies()

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return res.data
  } catch (err: any) {
    const error: { status: number } | any = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

const Dashboard = () => {
  const router = useRouter()
  const [accepted, setAccepted] = useState(true)

  const { data, error, mutate } = useSWR<SWRTypes, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmap`,
    fetcher
  )

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        router.push('/auth/login')
      } else if (error.status === 500) {
        Alert.fire({
          icon: 'error',
          title: 'Data fetching failed!',
        })
      }
    }
  })

  const handleLogOut = async () => {
    const res = await Alert.fire({
      icon: 'question',
      title: 'Apakah anda yakin ingin logout?',
      showCancelButton: true,
    })

    if (res.isConfirmed) {
      Toast.fire({
        title: 'Logout success!',
      })
      cookies.remove('token', { path: '/' })
      router.push('/auth/login')
    }
  }

  const handleStatus = () => {
    setAccepted(!accepted)
  }

  const handleDetail = (url: string) => {
    router.push(url)
  }

  if (!data) return <Loading title='Dashboard | Full Stack Roadmap' />

  return (
    <div>
      <Head>
        <title>Dashboard | Full Stack Roadmap</title>
      </Head>
      <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-3'>
        <Header>
          <p className='font-extrabold text-2xl flex justify-center'>
            Dashboard
          </p>
        </Header>
        <div className='flex flex-wrap justify-center gap-2 text-sm'>
          <Link href='/dashboard/add-roadmap'>
            <a className='font-semibold px-1.5 py-1 bg-sky-600 rounded shadow-md shadow-sky-600/50 hover:bg-sky-700 transition duration-500 ease-in-out text-gray-200'>
              Add Data
            </a>
          </Link>
          <button className='font-semibold px-1.5 py-1 bg-purple-500 rounded shadow-md shadow-purple-500/50 hover:bg-purple-600 transition duration-500 ease-in-out text-gray-200'>
            Edit Profile
          </button>
          <Link href='/'>
            <a className='font-semibold px-1.5 py-1 bg-teal-700 rounded shadow-md shadow-emerald-700/50 hover:bg-emerald-800 transition duration-500 ease-in-out text-gray-200'>
              Go To Home
            </a>
          </Link>
          <button
            className='font-semibold px-1.5 py-1 bg-red-400 rounded shadow-md shadow-red-400/50 hover:bg-red-500 transition duration-500 ease-in-out text-gray-200'
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
        <div>
          <div className='flex justify-start items-center space-x-2 mt-10 mb-4 text-sm'>
            <div className='font-semibold'>Filter : </div>
            <button
              onClick={handleStatus}
              className={`px-2 py-1 transition duration-500 ease-in-out rounded-md shadow-md font-semibold text-gray-200 ${
                accepted
                  ? 'bg-emerald-600 shadow-emerald-600/50'
                  : 'bg-slate-400 shadow-slate-400/50'
              }`}
            >
              {accepted ? 'Accepted' : 'Pending'}
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {data &&
            data.data
              .filter((e) => e.accepted == accepted)
              .map((e: Data) => {
                return (
                  <div
                    key={e._id}
                    className={`rounded-md bg-${e.color} shadow-md shadow-${e.color} p-3 flex justify-between items-center lg:cursor-pointer`}
                  >
                    <div
                      className='flex items-center space-x-2 flex-1'
                      onClick={() => handleDetail(`/dashboard/detail/${e._id}`)}
                    >
                      <img
                        src={e.icon}
                        alt={`Icon ${e.title}`}
                        className='w-5'
                      />
                      <p className='font-semibold text-lg text-gray-800'>
                        {e.title}
                      </p>
                    </div>
                    {/* option button */}
                    <OptionButton data={e} role={data.role} mutate={mutate} />
                    {/* ---------- */}
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
