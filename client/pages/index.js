import Head from 'next/head'
import Config from '../config'
import Cookies from 'universal-cookie'
import axios from 'axios'
import useSWR from 'swr'

import Header from '../components/Header'
import Roadmap from '../components/Roadmap'
import BackToTop from '../components/BackToTop'
import MetaTags from '../components/MetaTags'
import Loading from '../components/Loading'

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
        <MetaTags />
        <title>{Config.title}</title>
      </Head>
      <div className='flex flex-col p-4 space-y-4'>
        <Header />
        <Roadmap data={data} error={error} />
      </div>
      <BackToTop />
    </>
  )
}
