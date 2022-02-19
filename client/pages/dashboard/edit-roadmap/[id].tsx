// import library
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'

// import config and components
import { Alert } from '../../../config'
import BackToDashboard from '../../../components/BackToDashboard'
import FormButton from '../../../components/FormButton'
import Header from '../../../components/Header'
import InputForm from '../../../components/InputForm'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import SelectForm from '../../../components/SelectForm'
import TextAreaForm from '../../../components/TextAreaForm'

// cookies instantiation
const cookies = new Cookies()

// fetcher function
const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return res.data
  } catch (err: any) {
    const error: { status: number } | any = new Error(err.message)
    error.status = err.response.status
    throw error
  }
}

// EditRoadmap components
const EditRoadmap = () => {
  // states
  const [order, setOrder] = useState<number>()
  const [title, setTitle] = useState<string>()
  const [type, setType] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [icon, setIcon] = useState<string>()
  const [color, setColor] = useState<string>()
  const [intensity, setIntensity] = useState<number>()
  const [linkVideo, setLinkVideo] = useState<string>()
  const [linkDocs, setLinkDocs] = useState<string>()
  const [accepted, setAccepted] = useState<boolean>()
  const [isChanged, setIsChanged] = useState<boolean>(false)

  // router hooks
  const router = useRouter()

  // get id from query
  const { id } = router.query

  // fetch data
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/roadmap/${id}`,
    fetcher
  )

  // life cycle
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
      setColor(data.data.color.split('-')[0])
      setIntensity(data.data.color.split('-')[1])
      setLinkVideo(data.data.linkVideo)
      setLinkDocs(data.data.linkDocs)
      setAccepted(data.data.accepted)
    }
  })

  useEffect(() => {
    mutate()
  }, [])

  // submit event handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          color: `${color}-${intensity}`,
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
      .then(() => {
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

  // color handler
  const handleColor = (e: string) => setColor(e)

  // intensity handler
  const handleIntensity = (e: number) => setIntensity(e)

  // loading
  if (!data) return <Loading title='Edit Data | Full Stack Roadmap' />

  return (
    <Layout>
      <div>
        <Head>
          <title>Edit {data.data.title} | Full Stack Roadmap</title>
        </Head>
        <div className='space-y-3 px-6 py-3 pb-12 text-gray-200 md:px-56 lg:px-96'>
          <Header>
            <p className='flex justify-center text-2xl font-extrabold'>
              Edit Roadmap
            </p>
          </Header>
          <div className='pt-2'>
            <BackToDashboard />
            <form className='space-y-3' onSubmit={handleSubmit}>
              <div className={`${data.role !== 'admin' && 'hidden'}`}>
                {' '}
                <InputForm
                  label='Order'
                  id='order'
                  onChange={(e) => setOrder(Number(e.target.value))}
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
              {/*<InputForm
              label='Color (Tailwind CSS color only)'
              id='color'
              onChange={(e) => setColor(e.target.value)}
              placeholder='Example: orange-500 or [#69420]'
              value={color}
            />*/}
              <SelectForm
                label='Color'
                id='color'
                handleColor={handleColor}
                handleIntensity={handleIntensity}
                defaultColor={data.data.color.split('-')[0]}
                defaultIntensity={data.data.color.split('-')[1]}
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
                <label htmlFor='accepted' className='font-medium text-gray-200'>
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
    </Layout>
  )
}

export default EditRoadmap
