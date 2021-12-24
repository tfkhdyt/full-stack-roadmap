import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'

import { Alert } from '../../config'

export async function getServerSideProps() {
  return {
    props: {},
  }
}

function Dashboard() {
  const cookies = new Cookies()
  const router = useRouter()

  const handleLogOut = () => {
    Alert.fire({
      icon: 'question',
      title: 'Apakah anda yakin ingin logout?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        cookies.remove('token')
        router.push('/auth/login')
      }
    })
  }

  return (
    <div className='px-6 md:px-56 lg:px-64 py-3 space-y-5 text-gray-200'>
      <p className='font-extrabold text-2xl flex justify-center'>Dashboard</p>
      <div className='flex justify-between'>
        <button className='bg-teal-600 px-3 py-2 rounded-md text-sm shadow-lg shadow-teal-600/25 hover:bg-teal-800 transition duration-500 ease-in-out'>
          Add Data
        </button>
        <button
          className='bg-red-500 px-3 py-2 rounded-md text-sm shadow-lg shadow-red-500/25 hover:bg-red-700 transition duration-500 ease-in-out'
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default Dashboard
