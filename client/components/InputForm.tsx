import { useEffect, useState, ChangeEvent } from 'react'

type InputFormProps = {
  label: string
  id: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  order?: number
  value?: string | number
}

const InputForm = ({ label, id, onChange, ...rest }: InputFormProps) => {
  const [type, setType] = useState<string>('text')

  useEffect(() => {
    if (id === 'email') setType('email')
    else if (id === 'password') setType('password')
  }, [])

  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='text-gray-200 font-medium'>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className='w-full py-2 px-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out bg-gray-700 text-gray-200'
        onChange={onChange}
        {...rest}
        required
      />
    </div>
  )
}

export default InputForm
