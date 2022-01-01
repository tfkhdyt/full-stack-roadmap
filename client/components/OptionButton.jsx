import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Alert, Toast } from '../config'
import Link from 'next/link'
import deleteData from '../utils/deleteData'

const cookies = new Cookies()

export default function OptionButton({ data, role, mutate }) {
  const [isOpened, setIsOpened] = useState(false)
  const ref = useRef()
  const router = useRouter()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpened && ref.current && !ref.current.contains(e.target)) {
        setIsOpened(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isOpened])

  const handleClick = () => {
    setIsOpened(!isOpened)
  }

  const refreshData = () => {
    // router.replace(router.asPath)
    mutate()
  }

  const changeStatus = async () => {
    try {
      Alert.fire({
        title: 'Loading...',
        didOpen: () => {
          Alert.showLoading()
        },
      })
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${data._id}`,
        {
          accepted: !data.accepted,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
          },
        }
      )
      refreshData()
      Alert.close()
      Toast.fire({
        title: 'Ubah status berhasil!',
      })
    } catch (err) {
      // console.log(err)
      switch (err.response.status) {
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Ubah status gagal!',
            text: 'Terjadi kesalahan pada server',
          })
          break
        case 401:
          cookies.remove('token')
          router.push('/auth/login')
          break
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
          })
          break
        default:
          Alert.fire({
            icon: 'error',
            title: 'Ubah status gagal!',
          })
          break
      }
    }
  }

  const handleDelete = async (id) => {
    const confirm = await Alert.fire({
      icon: 'question',
      title: 'Apakah Anda yakin ingin menghapus data ini?',
      text: 'Data yang telah dihapus tidak dapat dikembalikan',
      showCancelButton: true,
    })
    if (!confirm.isConfirmed) return
    Alert.fire({
      title: 'Loading...',
      didOpen: () => {
        Alert.showLoading()
      },
    })
    try {
      await deleteData(id)
      Alert.close()
      refreshData()
      Toast.fire({
        title: 'Data berhasil dihapus!',
      })
    } catch (err) {
      switch (err) {
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Delete data gagal!',
            text: 'Terjadi kesalahan pada server',
          })
          break
        case 401:
          cookies.remove('token')
          router.push('/auth/login')
          break
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
          })
          break
        default:
          Alert.fire({
            icon: 'error',
            title: 'Delete data gagal!',
          })
          break
      }
    }
  }

  return (
    <div className='relative' ref={ref}>
      <button
        className={`block p-2 ${
          isOpened && 'bg-gray-900/50 rounded-md'
        } transition duration-200 ease-in-out`}
        onClick={handleClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-5 w-5 ${
            isOpened ? `fill-${data.color}` : 'fill-gray-800'
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
        </svg>
      </button>

      <div
        className={`absolute right-0 w-36 p-2 mt-2 bg-slate-700 shadow-md shadow-slate-700/50 rounded-md shadow-xl ${
          isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition duration-200 ease-in-out z-50 space-y-2`}
      >
        {role === 'admin' && (
          <button
            className='block px-4 py-2 w-full text-sm text-gray-200 hover:bg-slate-600 hover:text-white rounded-md text-left transition duration-500 ease-in-out'
            onClick={changeStatus}
          >
            {data.accepted ? 'Pend' : 'Accept'}
          </button>
        )}
        <Link href={`/dashboard/edit-roadmap/${data._id}`}>
          <a className='block px-4 py-2 w-full text-sm text-gray-200 hover:bg-slate-600 hover:text-white rounded-md text-left transition duration-500 ease-in-out'>
            Edit Data
          </a>
        </Link>
        <button
          className='block px-4 py-2 w-full text-sm text-gray-200 hover:bg-slate-600 hover:text-white rounded-md text-left transition duration-500 ease-in-out'
          onClick={() => handleDelete(data._id)}
        >
          Delete Data
        </button>
      </div>
    </div>
  )
}
