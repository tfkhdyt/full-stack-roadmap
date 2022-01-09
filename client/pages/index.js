import Config from '../config'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'

import BackToTop from '../components/BackToTop'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Roadmap from '../components/Roadmap'
import { Nav } from '../components/Header'

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

  if (!data) return <Loading title={Config.title} />

  return (
    <>
      <Head>
        <title>{Config.title}</title>
      </Head>
      <div className='flex flex-col p-4 space-y-3'>
        <Header>
          <span className='font-extrabold text-xl lg:text-4xl cursor-text leading-none'>
            {Config.header}
          </span>
          <span className='flex justify-center items-center space-x-3'>
            <Nav
              link='https://github.com/tfkhdyt/full-stack-roadmap'
              label='Source Code'
              isOpenInNewTab={true}
            />
            <Nav link='/auth/login' label='Dashboard' />
          </span>
        </Header>
        <Roadmap data={data} error={error} />
      </div>
      <BackToTop />
    </>
  )
}
