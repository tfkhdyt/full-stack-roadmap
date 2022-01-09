import Config from '../config'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'

import BackToTop from '../components/BackToTop'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Roadmap from '../components/Roadmap'

const cookies = new Cookies()

const fetcher = async (url) => {
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return result.data.data
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

export default function Home() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmaps`,
    fetcher
  )

  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>{Config.title}</title>
      </Head>
      <div className='flex flex-col p-4'>
        <Header />
        <Roadmap data={data} error={error} />
      </div>
      <BackToTop />
    </>
  )
}
