import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'

export async function getServerSideProps({ query }) {
  try {
    // const res = await axios.get()
  } catch (err) {}
}

export default function Detail() {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query)
  })

  return (
    <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-3'>
      <p className='font-extrabold text-2xl flex justify-center'>Detail</p>
    </div>
  )
}
