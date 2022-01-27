import { useRouter } from 'next/router'
import { useState, FormEvent, ChangeEvent } from 'react'
import Axios from 'axios'
import Head from 'next/head'
import Cookies from 'universal-cookie'

import { Alert } from '../../../config'
import FormButton from '../../../components/FormButton'
import InputForm from '../../../components/InputForm'
import TextAreaForm from '../../../components/TextAreaForm'
import BackToDashboard from '../../../components/BackToDashboard'
import SelectForm from '../../../components/SelectForm'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'

const cookies = new Cookies()

const AddRoadmap = () => {
  const [title, setTitle] = useState<string>()
  const [type, setType] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [icon, setIcon] = useState<string>()
  const [color, setColor] = useState<string>()
  const [intensity, setIntensity] = useState<number>()
  const [linkVideo, setLinkVideo] = useState<string>()
  const [linkDocs, setLinkDocs] = useState<string>()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*alert(`Color: ${color}
Intensity: ${intensity}`)*/
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
      `${process.env.NEXT_PUBLIC_API_URL}/roadmap`,
      {
        title,
        type,
        description,
        icon,
        color: `${color}-${intensity}`,
        linkVideo,
        linkDocs,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
        },
      }
    )
      .then(() => {
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
            break
          default:
            Alert.fire({
              icon: 'error',
              title: 'Add data gagal!',
            })
            break
        }
      })
  }

  const handleColor = (e: string) => setColor(e)
  const handleIntensity = (e: number) => setIntensity(e)

  return (
    <Layout>
      <div>
        <Head>
          <title>Add Data | Full Stack Roadmap</title>
        </Head>
        <div className='space-y-3 px-6 py-3 pb-12 text-gray-200 md:px-56 lg:px-96'>
          <Header>
            <p className='flex justify-center text-2xl font-extrabold'>
              Add Roadmap
            </p>
          </Header>
          <div>
            <BackToDashboard />
            <form className='space-y-3' onSubmit={handleSubmit}>
              <InputForm
                label='Title'
                id='title'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder='Example: HTML'
              />
              <InputForm
                label='Type'
                id='type'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setType(e.target.value)
                }
                placeholder='Example: Markup Language'
              />
              <TextAreaForm
                label='Description'
                id='description'
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder='Example: HTML adalah bla bla bla'
              />
              <InputForm
                label='Icon (link only)'
                id='icon'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIcon(e.target.value)
                }
                placeholder='Example: https://.../...svg'
              />
              {/*<InputForm
              label='Color (Tailwind CSS color only)'
              id='color'
              onChange={(e) => setColor(e.target.value)}
              placeholder='Example: orange-500 or [#69420]'
            />*/}
              <SelectForm
                label='Color'
                id='color'
                handleColor={handleColor}
                handleIntensity={handleIntensity}
              />
              <InputForm
                label="Video's Link"
                id='linkVideo'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLinkVideo(e.target.value)
                }
                placeholder='Example: https://youtu.be/..'
              />
              <InputForm
                label="Documentation's Link"
                id='linkDocs'
                onChange={(e) => setLinkDocs(e.target.value)}
                placeholder='Example: https://.../..'
              />
              <FormButton color='sky-400'>Submit</FormButton>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddRoadmap
