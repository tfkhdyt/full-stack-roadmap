import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import Link from 'next/link'

import { Alert } from '../../../config'
import InputForm from '../../../components/InputForm'
import TextAreaForm from '../../../components/TextAreaForm'
import FormButton from '../../../components/FormButton'

const cookies = new Cookies()

function AddRoadmap() {
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState()
  const [type, setType] = useState()
  const [description, setDescription] = useState()
  const [icon, setIcon] = useState()
  const [color, setColor] = useState()
  const [linkVideo, setLinkVideo] = useState()
  const [linkDocs, setLinkDocs] = useState()
  const router = useRouter()

  const handleSubmit = () => {}

  return (
    <div>
      <div className='px-6 md:px-56 lg:px-64 py-3 pb-12 text-gray-200 space-y-3'>
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
