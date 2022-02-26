import Cookies from 'universal-cookie'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
// import ProgressBar from 'react-scroll-progress-bar'

import { Nav } from '../components/Header'
import BackToTop from '../components/BackToTop'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Roadmap from '../components/Roadmap'
import Config from '../config'
import Layout from '../components/Layout'

const cookies = new Cookies()

const fetcher = async (url: string) => {
  const result = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    .catch((err) => {
      const error: { status: boolean } | any = new Error(err.message)
      error.status = err.response.status
      throw error
    })
  return result.data
}

/*const legacyFetcher = async (url: string) => {
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return result.data
  } catch (err: any) {
    const error: { status: boolean } | any = new Error(err.message)
    error.status = err.response.status
    throw error
  }
  }*/

const Home = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmaps/public`,
    fetcher
  )

  if (!data) return <Loading title={Config.title} />

  return (
    <>
      {/*<ProgressBar bgcolor='#ffffff' />*/}
      <Layout>
        <Head>
          <title>{Config.title}</title>
        </Head>
        <div className='relative flex flex-col space-y-3 p-4'>
          <Header>
            <div className='flex flex-col'>
              <div className='-mb-1.5 mr-0.5 text-right text-[0.5rem] font-bold leading-none tracking-wider'>
                TFKHDYT
              </div>
              <div className='cursor-text text-2xl font-extrabold leading-none lg:text-4xl'>
                Full Stack Roadmap
              </div>
            </div>
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
