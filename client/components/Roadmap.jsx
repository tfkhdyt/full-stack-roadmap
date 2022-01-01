import axios from 'axios'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import useSWR from 'swr'
import Cookies from 'universal-cookie'
import {Alert} from '../config'
import Card from './Card'
import Loading from './Loading'
// import { data } from '../public/data'

const cookies = new Cookies()

const fetcher = async (url) => {
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`
      }
    })
   return result.data.data 
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

export default function Roadmap() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/roadmaps`, fetcher)
  const router = useRouter()

  useEffect(async () => {
    if (error) {
      const err = await Alert.fire({
        icon: 'error',
        title: 'Gagal mengambil data',
        text: 'Terjadi kesalahan pada server',
        confirmButtonText: 'Refresh'
      })
      if (err.isConfirmed) {
        router.reload()
      }
    }
  })

  if (!data) return <Loading />

  return (
    <div className='flex flex-col justify-center'>
      <div className='mx-3 md:mx-16 lg:mx-56 xl:mx-64'>
        <div className='flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50'>
          {data.map((e, i) => (
            <div
              key={i}
              className={`flex ${
                (i + 1) % 2 !== 0 ? 'flex-row-reverse' : null
              } md:contents`}
            >
              <Card id={i + 1} data={e} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
