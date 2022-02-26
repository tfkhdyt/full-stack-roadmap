import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
// import Cookies from 'universal-cookie'
import Head from 'next/head'
// import Link from 'next/link'
import useSWR from 'swr'
import { toast } from 'react-toastify'

import { Alert } from '../../config'
// import { SWRTypes } from '../../types/swr'
import { Data } from '../../types/data'
import Loading from '../../components/Loading'
import OptionButton from '../../components/OptionButton'
import Header, { Nav } from '../../components/Header'
import Layout from '../../components/Layout'
import LazyShow from '../../components/LazyShow'
import BackToTop from '../../components/BackToTop'

// const cookies = new Cookies()

const fetcher = async (url: string) => {
  const res = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    .catch((err: any) => {
      const error: { status: number } | any = new Error(err.message)
      error.status = err.response.status
      throw error
    })
  return res.data
}

const Dashboard = () => {
  const router = useRouter()
  const [accepted, setAccepted] = useState(true)

  const { data, error, mutate } = useSWR<any[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmaps`,
    fetcher
  )
  const user = useSWR<string>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/role`,
    fetcher
  )

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        router.push('/auth/login')
      } else if (error.status >= 400) {
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
      Cookies.remove('token')
      toast.success(`Logout berhasil!`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      try {
        router.replace('/auth/login')
      } catch (err) {
        router.reload()
      }
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
        <div className='relative space-y-3 px-6 py-3 text-gray-200 md:px-56 lg:px-64'>
          <Header>
            <div className='flex flex-col'>
              <div className='cursor-text text-2xl font-extrabold leading-none lg:text-4xl'>
                Dashboard
              </div>
            </div>
            <span className='flex items-center justify-center space-x-3'>
              <Nav link='/dashboard/add-roadmap' label='Add Data' />
              <Nav link='#' label='Edit Profile' />
              <Nav link='/' label='Back To Home' />
              <div className='group text-sm'>
                <button
                  className='flex items-center space-x-1 transition duration-200 ease-in-out group-hover:text-sky-600'
                  onClick={handleLogOut}
                >
                  <span className='font-semibold'>Logout</span>
                </button>
              </div>
            </span>
          </Header>
          <div className='pt-10'>
            <div className='mb-4 flex items-center justify-start space-x-2 text-sm'>
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
            className={`grid grid-cols-1 gap-4 ${
              data &&
              data.filter((e) => e.accepted == accepted).length !== 0 &&
              'md:grid-cols-2'
            }`}
          >
            {data && data.filter((e) => e.accepted == accepted).length == 0 && (
              <LazyShow
                className='text-center text-lg font-semibold text-gray-200'
                align='top'
              >
                Data kosong
              </LazyShow>
            )}
            {data &&
              user &&
              data
                .filter((e) => e.accepted == accepted)
                .map((e: Data, i: number) => {
                  let align: string
                  if (i % 2 == 0) align = 'left'
                  else align = 'right'
                  const baseColor = e.color
                  let shadeColor: (string | number)[] | string =
                    baseColor.split('-')
                  shadeColor[1] = Number(shadeColor[1]) + 200
                  shadeColor = shadeColor.join('-')
                  return (
                    <LazyShow align={align} key={e._id}>
                      <div
                        className={`rounded-md bg-gradient-to-br from-${baseColor} to-${shadeColor} shadow-md shadow-${shadeColor} flex items-center justify-between p-3 lg:cursor-pointer`}
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
                          role={user.data!}
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
