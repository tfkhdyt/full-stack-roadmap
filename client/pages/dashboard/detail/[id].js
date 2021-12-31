import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Alert, Toast } from '../../../config'
import Loading from '../../../components/Loading'
import BackToDashboard from '../../../components/BackToDashboard'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'

const cookies = new Cookies()

const fetcher = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return res.data
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

export default function Detail() {
  const router = useRouter()
  const { id } = router.query
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${id}`,
    fetcher
  )

  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
          }).then((res) => {
            if (res.isConfirmed) {
              router.push('/dashboard')
            }
          })
          break
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Data fetching gagal',
          }).then((res) => {
            if (res.isConfirmed) {
              router.push('/dashboard')
            }
          })
          break
      }
    }
  })

  const refreshData = () => {
    mutate()
  }

  const changeStatus = async () => {
    try {
      Alert.fire({
        title: 'Loading...',
        didOpen: () => {
          Alert.showLoading()
        },
      })
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${data.data._id}`,
        {
          accepted: !data.data.accepted,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
          },
        }
      )
      refreshData()
      Alert.close()
      Toast.fire({ title: 'Status changed successfully!' })
    } catch (err) {
      console.log(err)
      switch (err.response.status) {
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Change status failed!',
            text: 'There is an error on server',
          })
          break
        case 401:
          cookies.remove('token')
          router.push('/auth/login')
          break
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data not found',
          })
          break
        default:
          Alert.fire({
            icon: 'error',
            title: 'Change status failed!',
          })
          break
      }
    }
  }

  if (!data) return <Loading />

  return (
    <div>
      <Head>
        <title>{data.data.title} | Full Stack Roadmap</title>
      </Head>{' '}
      <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-4'>
        <p className='font-extrabold text-2xl flex justify-center'>Detail</p>
        <div>
          <BackToDashboard />
          {data && (
            <div
              className={`bg-${data.data.color} w-full rounded-md p-4 shadow-lg shadow-${data.data.color}/50 text-gray-800 space-y-1`}
            >
              <div>
                <span className='font-bold'>Order:</span>{' '}
                <span>{data.data.order}</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span className='font-bold'>Title:</span>{' '}
                <div className='flex space-x-1 items-center'>
                  <img
                    src={data.data.icon}
                    alt={`Icon ${data.data.icon}`}
                    className={`${
                      data.data.title == 'Express' ? 'w-5' : 'h-5'
                    }`}
                  />
                  <p>{data.data.title}</p>
                </div>
              </div>
              <div>
                <span className='font-bold'>Type:</span>{' '}
                <span>{data.data.type}</span>
              </div>
              <div>
                <p className='font-bold'>Description:</p>{' '}
                <p className='text-sm leading-snug text-justify'>
                  {data.data.description}
                </p>
              </div>
              <div>
                <span className='font-bold'>Color:</span>{' '}
                <span>{data.data.color}</span>
              </div>
              <div>
                <p className='font-bold'>Video's Link:</p>{' '}
                <Link href={data.data.linkVideo}>
                  <a
                    className='break-all text-sm leading-snug underline underline-offset-1'
                    target='_blank'
                  >
                    {data.data.linkVideo}
                  </a>
                </Link>
              </div>
              <div>
                <p className='font-bold'>Documentation's Link:</p>{' '}
                <Link href={data.data.linkDocs}>
                  <a
                    className='break-all text-sm leading-snug underline underline-offset-1'
                    target='_blank'
                  >
                    {data.data.linkDocs}
                  </a>
                </Link>
              </div>
              <div>
                <span className='font-bold'>Submitted By:</span>{' '}
                <span>{data.submitter}</span>
              </div>
              <div className='mb-4'>
                <span className='font-bold'>Status:</span>{' '}
                <span>
                  {data.data.accepted == true ? 'Accepted' : 'Pending'}
                </span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {data.role === 'admin' && (
                  <button
                    className={`px-3 py-2 w-20 ${
                      !data.data.accepted ? 'bg-green-600' : 'bg-zinc-500'
                    } rounded-md shadow-lg font-semibold text-gray-200`}
                    onClick={changeStatus}
                  >
                    {!data.data.accepted ? 'Accept' : 'Pend'}
                  </button>
                )}
                <Link href={`/dashboard/edit-roadmap/${data.data._id}`}>
                  <a className='p-2 w-20 bg-sky-600 rounded-md shadow-lg font-semibold text-gray-200 flex justify-center'>
                    Edit
                  </a>
                </Link>
                <button className='px-3 py-2 bg-rose-500 rounded-md shadow-lg font-semibold text-gray-200'>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
