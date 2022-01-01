import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Alert } from '../config'
import Card from './Card'
// import { data } from '../public/data'

export default function Roadmap({ data, error }) {
  const router = useRouter()

  useEffect(async () => {
    if (error) {
      const err = await Alert.fire({
        icon: 'error',
        title: 'Gagal mengambil data',
        text: 'Terjadi kesalahan pada server',
        confirmButtonText: 'Refresh',
      })
      if (err.isConfirmed) {
        router.reload()
      }
    }
  })

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
