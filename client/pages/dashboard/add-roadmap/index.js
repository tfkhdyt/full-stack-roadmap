import { useRouter } from 'next/router'
import { useState } from 'react'
import Axios from 'axios'
import Head from 'next/head'
import Cookies from 'universal-cookie'

import { Alert } from '../../../config'
import FormButton from '../../../components/FormButton'
import InputForm from '../../../components/InputForm'
import TextAreaForm from '../../../components/TextAreaForm'

const cookies = new Cookies()

function AddRoadmap() {
  const [title, setTitle] = useState()
  const [type, setType] = useState()
  const [description, setDescription] = useState()
  const [icon, setIcon] = useState()
  const [color, setColor] = useState()
  const [linkVideo, setLinkVideo] = useState()
  const [linkDocs, setLinkDocs] = useState()
  const router = useRouter()

  const handleSubmit = async (e) => {
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

    Axios.post(
      'http://localhost:4000/roadmap',
      {
        title,
        type,
        description,
        icon,
        color,
        linkVideo,
        linkDocs,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
        },
      }
    )
      .then((res) => {
        Alert.close()
        Alert.fire({
          icon: 'success',
          title: 'Add data berhasil!',
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
              title: 'Add data gagal!',
              text: 'Terjadi kesalahan pada server',
            })
            break
          case 401:
            cookies.remove('token')
            router.push('/auth/login')
          default:
            Alert.fire({
              icon: 'error',
              title: 'Add data gagal!',
            })
            break
        }
      })
  }

  return (
    <div>
      <Head>
        <title>Add Data | Full Stack Roadmap</title>
      </Head>
      <div className='px-6 md:px-56 lg:px-96 py-3 pb-12 text-gray-200 space-y-3'>
        <p className='font-extrabold text-2xl flex justify-center'>
          Add Roadmap
        </p>
        <div>
          <form className='space-y-3' onSubmit={handleSubmit}>
            <InputForm
              label='Title'
              id='title'
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputForm
              label='Type'
              id='type'
              onChange={(e) => setType(e.target.value)}
            />
            <TextAreaForm
              label='Description'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputForm
              label='Icon (link only)'
              id='icon'
              onChange={(e) => setIcon(e.target.value)}
            />
            <InputForm
              label='Color (Tailwind CSS color only)'
              id='color'
              onChange={(e) => setColor(e.target.value)}
            />
            <InputForm
              label="Video's Link"
              id='linkVideo'
              onChange={(e) => setLinkVideo(e.target.value)}
            />
            <InputForm
              label="Documentation's Link"
              id='linkDocs'
              onChange={(e) => setLinkDocs(e.target.value)}
            />
            <FormButton color='sky-400'>Submit</FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRoadmap
