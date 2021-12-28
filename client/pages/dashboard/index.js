import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import Link from 'next/link'

import { Alert } from '../../config'
import Loading from '../../components/Loading'
import OptionButton from '../../components/OptionButton'

export async function getServerSideProps({ req }) {
  const cookies = new Cookies(req.headers.cookie)
  try {
    const res = await axios.get(`${process.env.API_URL}/roadmap`, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return {
      props: {
        status: res.status,
        error: null,
        data: res.data.data,
        role: res.data.role,
        referer: req.headers.referer || null,
      },
    }
  } catch (err) {
    return {
      props: {
        status: err.response.status,
        error: err,
        data: null,
      },
    }
  }
}

function Dashboard({ status, error, data, role, referer }) {
  const cookies = new Cookies()
  const router = useRouter()
  const [accepted, setAccepted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 401) {
      router.push('/auth/login')
    } else if (status === 500) {
      Alert.fire({
        icon: 'error',
        title: 'Data fetching failed!',
      })
    } else if (data) {
      setIsLoading(false)
    }
  })

  const handleLogOut = () => {
    Alert.fire({
      icon: 'question',
      title: 'Apakah anda yakin ingin logout?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        Alert.fire({
          toast: true,
          position: 'top-right',
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Logout success!',
          background: '#0c4a6e',
          hideClass: {
            popup: 'opacity-0 transition duration-200 ease-in-out'
          },
          didOpen: () => {
            cookies.remove('token', { path: '/' })
            if (!cookies.get('token')) router.push('/auth/login')
          },
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__backInRight animate__fast',
          },
          hideClass: {
            popup: 'animate__animated animate__backOutRight animate__fast',
          },
        })
      }
    })
  }

  const handleStatus = () => {
    setAccepted(!accepted)
  }

  const handleDetail = (url) => {
    Alert.fire({
      title: 'Loading...',
      didOpen: () => {
        Alert.showLoading()
      },
    })
    router.push(url)
  }

  useEffect(() => {
    if (referer) {
      const ref = new URL(referer)
      if (!['/login', '/auth/login'].includes(ref.pathname)) Alert.close()
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Dashboard | Full Stack Roadmap</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-3'>
        <p className='font-extrabold text-2xl flex justify-center'>Dashboard</p>
        <div className='flex flex-wrap justify-center gap-2 text-sm'>
          <Link href='/dashboard/add-roadmap'>
            <a className='font-semibold px-1.5 py-1 bg-sky-600 rounded shadow-md shadow-sky-600/50 hover:bg-sky-700 transition duration-500 ease-in-out text-gray-200'>
              Add Data
            </a>
          </Link>
          <button className='font-semibold px-1.5 py-1 bg-purple-500 rounded shadow-md shadow-purple-500/50 hover:bg-purple-600 transition duration-500 ease-in-out text-gray-200'>
            Edit Profile
          </button>
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
            data
              .filter((e) => e.accepted == accepted)
              .map((e, i) => {
                return (
                  <div
                    key={e._id}
                    className={`rounded-md bg-${e.color} shadow-md shadow-${e.color}/50 p-3 flex justify-between items-center`}
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
                    <OptionButton data={e} role={role} />
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
