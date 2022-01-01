import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import useSWR from 'swr'

import { Alert } from '../../../config'
import FormButton from '../../../components/FormButton'
import InputForm from '../../../components/InputForm'
import TextAreaForm from '../../../components/TextAreaForm'
import BackToDashboard from '../../../components/BackToDashboard'
import Loading from '../../../components/Loading'

const cookies = new Cookies()

const fetcher = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return res.data
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

export default function EditRoadmap() {
  const [order, setOrder] = useState()
  const [title, setTitle] = useState()
  const [type, setType] = useState()
  const [description, setDescription] = useState()
  const [icon, setIcon] = useState()
  const [color, setColor] = useState()
  const [linkVideo, setLinkVideo] = useState()
  const [linkDocs, setLinkDocs] = useState()
  const [accepted, setAccepted] = useState()
  const [isChanged, setIsChanged] = useState(false)

  const router = useRouter()
  const { id } = router.query
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${id}`,
    fetcher
  )

  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
          }).then((res) => {
            if (res.isConfirmed) {
              router.push('/dashboard')
            }
          })
          break
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Data fetching gagal',
          }).then((res) => {
            if (res.isConfirmed) {
              router.push('/dashboard')
            }
          })
          break
      }
    }
  })

  useEffect(() => {
    if (data && !isChanged) {
      setIsChanged(true)
      setOrder(data.data.order)
      setTitle(data.data.title)
      setType(data.data.type)
      setDescription(data.data.description)
      setIcon(data.data.icon)
      setColor(data.data.color)
      setLinkVideo(data.data.linkVideo)
      setLinkDocs(data.data.linkDocs)
      setAccepted(data.data.accepted)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    Alert.fire({
      title: 'Loading...',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Alert.showLoading()
      },
    })

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${data.data._id}`,
        {
          order,
          title,
          type,
          description,
          icon,
          color,
          linkVideo,
          linkDocs,
          accepted,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
          },
        }
      )
      .then((res) => {
        mutate()
        Alert.close()
        Alert.fire({
          icon: 'success',
          title: 'Update data berhasil!',
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/dashboard')
          }
        })
      })
      .catch((err) => {
        Alert.close()
        switch (err.response.status) {
          case 500:
            Alert.fire({
              icon: 'error',
              title: 'Update data gagal!',
              text: 'Terjadi kesalahan pada server',
            })
            break
          case 401:
            cookies.remove('token')
            router.push('/auth/login')
            break
          default:
            Alert.fire({
              icon: 'error',
              title: 'Update data gagal!',
            })
            break
        }
      })
  }

  if (!data) return <Loading />

  return (
    <div>
      <Head>
        <title>Edit {data.data.title} | Full Stack Roadmap</title>
      </Head>
      <div className='px-6 md:px-56 lg:px-96 py-3 pb-12 text-gray-200 space-y-3'>
        <p className='font-extrabold text-2xl flex justify-center'>
          Edit Roadmap
        </p>
        <div>
          <BackToDashboard />
          <form className='space-y-3' onSubmit={handleSubmit}>
            <div className={`${data.role !== 'admin' && 'hidden'}`}>
              {' '}
              <InputForm
                label='Order'
                id='order'
                onChange={(e) => setOrder(e.target.value)}
                placeholder='Example: HTML'
                value={order}
              />
            </div>

            <InputForm
              label='Title'
              id='title'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Example: HTML'
              value={title}
            />
            <InputForm
              label='Type'
              id='type'
              onChange={(e) => setType(e.target.value)}
              placeholder='Example: Markup Language'
              value={type}
            />
            <TextAreaForm
              label='Description'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Example: HTML adalah bla bla bla'
              value={description}
            />
            <InputForm
              label='Icon (link only)'
              id='icon'
              onChange={(e) => setIcon(e.target.value)}
              placeholder='Example: https://.../...svg'
              value={icon}
            />
            <InputForm
              label='Color (Tailwind CSS color only)'
              id='color'
              onChange={(e) => setColor(e.target.value)}
              placeholder='Example: orange-500 or [#69420]'
              value={color}
            />
            <InputForm
              label="Video's Link"
              id='linkVideo'
              onChange={(e) => setLinkVideo(e.target.value)}
              placeholder='Example: https://youtu.be/..'
              value={linkVideo}
            />
            <InputForm
              label="Documentation's Link"
              id='linkDocs'
              onChange={(e) => setLinkDocs(e.target.value)}
              placeholder='Example: https://.../..'
              value={linkDocs}
            />
            <div className={`${data.role !== 'admin' && 'hidden'}`}>
              {' '}
              <label htmlFor='accepted' className='text-gray-200 font-medium'>
                Status
              </label>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-1'>
                  <input
                    type='radio'
                    id='accept'
                    name='accepted'
                    value='true'
                    onChange={() => setAccepted(true)}
                    checked={accepted === true}
                  />{' '}
                  <label htmlFor='accept'>Accepted</label>
                </div>
                <div className='flex items-center space-x-1'>
                  <input
                    type='radio'
                    id='pending'
                    name='accepted'
                    value='false'
                    onChange={() => setAccepted(false)}
                    checked={accepted === false}
                  />{' '}
                  <label htmlFor='pending'>Pending</label>
                </div>
              </div>
            </div>

            <FormButton color='sky-400'>Edit</FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}
