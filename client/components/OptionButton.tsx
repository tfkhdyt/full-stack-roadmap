import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

import { Alert } from '../config'
import { Data } from '../types/data'
import Link from 'next/link'
import deleteData from '../utils/deleteData'

const cookies = new Cookies()

type OptionButtonProps = {
  data: Data
  role: string
  mutate: () => void
}

const OptionButton = ({ data, role, mutate }: OptionButtonProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isOpened &&
        ref.current &&
        !ref.current.contains(e.target as HTMLElement)
      ) {
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
      toast.success(`Ubah status berhasil!`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } catch (err: any) {
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

  const handleDelete = async (id: string) => {
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
      toast.success(`Data berhasil dihapus!`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
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
          isOpened && 'rounded-md bg-gray-900/50'
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
        className={`absolute right-0 mt-2 w-36 rounded-md bg-slate-700 p-2 shadow-md shadow-xl shadow-slate-700/50 ${
          isOpened ? 'opacity-100' : 'pointer-events-none opacity-0'
        } z-50 space-y-2 transition duration-200 ease-in-out`}
      >
        {role === 'admin' && (
          <button
            className='block w-full rounded-md px-4 py-2 text-left text-sm text-gray-200 transition duration-500 ease-in-out hover:bg-slate-600 hover:text-white'
            onClick={changeStatus}
          >
            {data.accepted ? 'Pend' : 'Accept'}
          </button>
        )}
        <Link href={`/dashboard/edit-roadmap/${data._id}`}>
          <a className='block w-full rounded-md px-4 py-2 text-left text-sm text-gray-200 transition duration-500 ease-in-out hover:bg-slate-600 hover:text-white'>
            Edit Data
          </a>
        </Link>
        <button
          className='block w-full rounded-md px-4 py-2 text-left text-sm text-gray-200 transition duration-500 ease-in-out hover:bg-slate-600 hover:text-white'
          onClick={() => handleDelete(data._id)}
        >
          Delete Data
        </button>
      </div>
    </div>
  )
}

export default OptionButton
