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
import Layout from '../../components/Layout'
import LazyShow from '../../components/LazyShow'
import BackToTop from '../../components/BackToTop'

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
    <Layout>
      <div>
        <Head>
          <title>Dashboard | Full Stack Roadmap</title>
        </Head>
        <div className='space-y-3 px-6 py-3 text-gray-200 md:px-56 lg:px-64'>
          <Header>
            <p className='flex justify-center text-2xl font-extrabold'>
              Dashboard
            </p>
          </Header>
          <div className='flex flex-wrap justify-center gap-2 text-sm'>
            <Link href='/dashboard/add-roadmap' scroll={false}>
              <a className='rounded bg-sky-600 px-1.5 py-1 font-semibold text-gray-200 shadow-md shadow-sky-600/50 transition duration-500 ease-in-out hover:bg-sky-700'>
                Add Data
              </a>
            </Link>
            <button className='rounded bg-purple-500 px-1.5 py-1 font-semibold text-gray-200 shadow-md shadow-purple-500/50 transition duration-500 ease-in-out hover:bg-purple-600'>
              Edit Profile
            </button>
            <Link href='/' scroll={false}>
              <a className='rounded bg-teal-700 px-1.5 py-1 font-semibold text-gray-200 shadow-md shadow-emerald-700/50 transition duration-500 ease-in-out hover:bg-emerald-800'>
                Go To Home
              </a>
            </Link>
            <button
              className='rounded bg-red-400 px-1.5 py-1 font-semibold text-gray-200 shadow-md shadow-red-400/50 transition duration-500 ease-in-out hover:bg-red-500'
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
          <div>
            <div className='mt-10 mb-4 flex items-center justify-start space-x-2 text-sm'>
              <div className='font-semibold'>Filter : </div>
              <button
                onClick={handleStatus}
                className={`rounded-md px-2 py-1 font-semibold text-gray-200 shadow-md transition duration-500 ease-in-out ${
                  accepted
                    ? 'bg-emerald-600 shadow-emerald-600/50'
                    : 'bg-slate-400 shadow-slate-400/50'
                }`}
              >
                {accepted ? 'Accepted' : 'Pending'}
              </button>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
              data &&
              data.data.filter((e) => e.accepted == accepted).length !== 0 &&
              'md:grid-cols-2'
            }`}
          >
            {data &&
              data.data.filter((e) => e.accepted == accepted).length == 0 && (
                <LazyShow
                  className='text-center text-lg font-semibold text-gray-200'
                  align='top'
                >
                  Data kosong
                </LazyShow>
              )}
            {data &&
              data.data
                .filter((e) => e.accepted == accepted)
                .map((e: Data, i: number) => {
                  let align: string
                  if (i % 2 == 0) align = 'left'
                  else align = 'right'
                  return (
                    <LazyShow align={align} key={e._id}>
                      <div
                        className={`rounded-md bg-${e.color} shadow-md shadow-${e.color} flex items-center justify-between p-3 lg:cursor-pointer`}
                      >
                        <div
                          className='flex flex-1 items-center space-x-2'
                          onClick={() =>
                            handleDetail(`/dashboard/detail/${e._id}`)
                          }
                        >
                          <img
                            src={e.icon}
                            alt={`Icon ${e.title}`}
                            className='w-5'
                          />
                          <p className='text-lg font-semibold text-gray-800'>
                            {e.title}
                          </p>
                        </div>
                        {/* option button */}
                        <OptionButton
                          data={e}
                          role={data.role}
                          mutate={mutate}
                        />
                        {/* ---------- */}
                      </div>
                    </LazyShow>
                  )
                })}
          </div>
          <BackToTop />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
