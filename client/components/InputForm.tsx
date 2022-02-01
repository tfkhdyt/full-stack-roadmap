import { useEffect, useState, ChangeEvent } from 'react'

type InputFormProps = {
  label: string
  id: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  order?: number
  value?: string | number
  ref?: any
}

const InputForm = ({ label, id, onChange, ...rest }: InputFormProps) => {
  const [type, setType] = useState<string>('text')

  useEffect(() => {
    if (id === 'email') setType('email')
    else if (id === 'password') setType('password')
  }, [])

  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='font-medium text-gray-200'>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className='w-full rounded-md bg-gray-700 py-2 px-3 text-gray-200 outline-none transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400'
        onChange={onChange}
        {...rest}
        required
      />
    </div>
  )
}

export default InputForm
