import Head from 'next/head'
import Config from '../config'
import Header from './components/Header'
import Roadmap from './components/Roadmap'

export default function Home() {
  return (
    <>
      <Head>
        <title>{Config.title}</title>
      </Head>
      <div className='flex flex-col p-4 space-y-4'>
        <Header />
        <Roadmap />
      </div>
    </>
  )
}
