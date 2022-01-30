import Cookies from 'universal-cookie'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
import ProgressBar from 'react-scroll-progress-bar'

import { Nav } from '../components/Header'
import BackToTop from '../components/BackToTop'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Roadmap from '../components/Roadmap'
import Config from '../config'
import Layout from '../components/Layout'

const cookies = new Cookies()

const fetcher = async (url: string) => {
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return result.data.data
  } catch (err: any) {
    const error: { status: boolean } | any = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

const Home = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmaps`,
    fetcher
  )

  if (!data) return <Loading title={Config.title} />

  return (
    <>
      <ProgressBar bgcolor='#fcd34d' />
      <Layout>
        <Head>
          <title>{Config.title}</title>
        </Head>
        <div className='flex flex-col space-y-3 p-4'>
          <Header>
            <span className='cursor-text text-xl font-extrabold leading-none lg:text-4xl'>
              {Config.header}
            </span>
            <span className='flex items-center justify-center space-x-3'>
              <Nav
                link='https://github.com/tfkhdyt/full-stack-roadmap'
                label='Source Code'
                isOpenInNewTab={true}
              />
              <Nav
                link='https://donate.tfkhdyt.my.id'
                label='Donate'
                isOpenInNewTab={true}
              />
              <Nav link='/dashboard' label='Dashboard' />
            </span>
          </Header>
          <Roadmap data={data} error={error} />
        </div>
        <BackToTop />
      </Layout>
    </>
  )
}

export default Home
