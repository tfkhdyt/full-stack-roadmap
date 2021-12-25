import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import useSWR from 'swr'

import { Alert } from '../../config'
import Loading from '../../components/Loading'

const cookies = new Cookies()
const token = cookies.get('token')

const fetcher = async (url) => {
  return Axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.data)
}

function Dashboard() {
  const [accepted, setAccepted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data, error } = useSWR('http://localhost:4000/roadmap', fetcher)

  useEffect(() => {
    if (error) {
      return Alert.fire({
        icon: 'error',
        text: 'Telah terjadi error saat mengambil data dari database',
      })
    }
    if (data) {
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
        cookies.remove('token')
        router.push('/auth/login')
      }
    })
  }

  const handleStatus = () => {
    setAccepted(!accepted)
  }

  return (
    <div>
      <Loading isLoading={isLoading} />
      <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-3'>
        <p className='font-extrabold text-2xl flex justify-center'>Dashboard</p>
        <div className='flex flex-wrap justify-center gap-2 text-sm'>
          <button className='font-semibold px-1.5 py-1 bg-sky-400 rounded shadow-md shadow-sky-400/50 hover:bg-sky-600 transition duration-500 ease-in-out text-gray-800'>
            Add Data
          </button>
          <button className='font-semibold px-1.5 py-1 bg-purple-400 rounded shadow-md shadow-purple-400/50 hover:bg-purple-600 transition duration-500 ease-in-out text-gray-800'>
            Edit Profile
          </button>
          <button
            className='font-semibold px-1.5 py-1 bg-red-400 rounded shadow-md shadow-red-400/50 hover:bg-red-500 transition duration-500 ease-in-out text-gray-800'
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
              className={`px-2 py-1 transition duration-500 ease-in-out rounded-md shadow-md font-semibold text-gray-800 ${
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
                    <div className='flex items-center space-x-2'>
                      <img
                        src={e.icon}
                        alt={`Icon ${e.title}`}
                        className={`h-5 ${
                          e.title == 'HTML' &&
                          '[marginLeft:-2px] [marginRight:-5px]'
                        }`}
                      />
                      <p className='font-bold text-lg text-gray-800'>
                        {e.title}
                      </p>
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 fill-gray-800'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                    </svg>
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
