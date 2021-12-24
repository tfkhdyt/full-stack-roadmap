import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  return {
    props: {},
  }
}

function Dashboard() {
  const cookies = new Cookies()
  const MySwal = withReactContent(Swal)
  const router = useRouter()

  const handleLogOut = () => {
    MySwal.fire({
      icon: 'question',
      title: 'Apakah anda yakin ingin logout?',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed || res.isDismissed) {
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
