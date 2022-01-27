import { ChangeEvent } from 'react'

type TextAreaFormProps = {
  label: string
  id: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value?: string
}

const TextAreaForm = ({ label, id, onChange, ...rest }: TextAreaFormProps) => {
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='font-medium text-gray-200'>
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        className='block h-28 w-full resize-none rounded-md bg-gray-700 py-2 px-3 text-gray-200 outline-none transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400'
        spellCheck
        onChange={onChange}
        {...rest}
        required
      ></textarea>
    </div>
  )
}

export default TextAreaForm
