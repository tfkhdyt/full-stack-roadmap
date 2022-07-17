import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

import { Alert } from '../config'
import Card from './Card'

type RoadmapProps = {
  data: any
  error: any
}

const Roadmap = ({ data, error }: RoadmapProps) => {
  const cookies = new Cookies()
  const router = useRouter()
  const [progress, setProgress] = useState(
    cookies.get('progress') || { progress: [] }
  )

  useEffect(() => {
    // console.log(progress)
    cookies.set('progress', progress, {
      maxAge: 3000000,
      path: '/',
    })
  }, [progress.progress])

  useEffect(() => {
    (async () => {
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
    })()
  })

  return (
    <div className='flex flex-col justify-center pt-8'>
      <div className='mx-3 md:mx-16 lg:mx-56 xl:mx-64'>
        <div className='mx-auto flex grid-cols-9 flex-col p-2 text-blue-50 md:grid'>
          {data.map((e: any, i: number) => (
            <div
              key={i}
              className={`flex ${
                (i + 1) % 2 !== 0 ? 'flex-row-reverse' : null
              } md:contents`}
            >
              <Card id={i + 1} data={e} state={[progress, setProgress]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Roadmap
