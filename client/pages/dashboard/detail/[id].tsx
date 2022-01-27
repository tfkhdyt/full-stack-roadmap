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
import deleteData from '../../../utils/deleteData'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'

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
    const error: { error: number } | any = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

const Detail = () => {
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
      Toast.fire({
        title: 'Ubah status berhasil!',
      })
    } catch (err: any) {
      // console.log(err)
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

  const handleDelete = async (id: string) => {
    const confirm = await Alert.fire({
      icon: 'question',
      title: 'Apakah Anda yakin ingin menghapus data ini?',
      text: 'Data yang telah dihapus tidak dapat dikembalikan',
      showCancelButton: true,
    })
    if (!confirm.isConfirmed) return
    Alert.fire({
      title: 'Loading...',
      didOpen: () => {
        Alert.showLoading()
      },
    })
    try {
      await deleteData(id)
      Alert.close()
      Toast.fire({
        title: 'Data berhasil dihapus!',
      })
      router.push('/dashboard')
    } catch (err) {
      switch (err) {
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Delete data gagal!',
            text: 'Terjadi kesalahan pada server',
          })
          break
        case 401:
          cookies.remove('token')
          router.push('/auth/login')
          break
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
          })
          break
        default:
          Alert.fire({
            icon: 'error',
            title: 'Delete data gagal!',
          })
          break
      }
    }
  }

  if (!data) return <Loading title='Detail | Full Stack Roadmap' />

  return (
    <Layout>
      <div>
        <Head>
          <title>{data.data.title} | Full Stack Roadmap</title>
        </Head>{' '}
        <div className='space-y-3 px-6 py-3 text-gray-200 md:px-56 lg:px-80'>
          <Header>
            <p className='flex justify-center text-2xl font-extrabold'>
              Detail
            </p>
          </Header>
          <div>
            <BackToDashboard />
            {data && (
              <div
                className={`bg-${data.data.color} w-full rounded-md p-4 shadow-lg shadow-${data.data.color}/50 space-y-1 text-gray-800`}
              >
                <div>
                  <span className='font-bold'>Order:</span>{' '}
                  <span>{data.data.order}</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <span className='font-bold'>Title:</span>{' '}
                  <div className='flex items-center space-x-1'>
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
                  <p className='text-justify text-sm leading-snug'>
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
                      className={`w-20 px-3 py-2 ${
                        !data.data.accepted ? 'bg-green-600' : 'bg-zinc-500'
                      } rounded-md font-semibold text-gray-200 shadow-lg`}
                      onClick={changeStatus}
                    >
                      {!data.data.accepted ? 'Accept' : 'Pend'}
                    </button>
                  )}
                  <Link href={`/dashboard/edit-roadmap/${data.data._id}`}>
                    <a className='flex w-20 justify-center rounded-md bg-sky-600 p-2 font-semibold text-gray-200 shadow-lg'>
                      Edit
                    </a>
                  </Link>
                  <button
                    className='rounded-md bg-rose-500 px-3 py-2 font-semibold text-gray-200 shadow-lg'
                    onClick={() => handleDelete(data.data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Detail
