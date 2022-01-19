import { ReactNode } from 'react'

type FormButtonProps = {
  color: string
  children: ReactNode
}

const FormButton = ({ color, children }: FormButtonProps) => {
  return (
    <div className='mt-4'>
      <button
        type='submit'
        className={`w-full text-gray-800 bg-${color} rounded-md py-2.5 font-semibold mt-2 hover:brightness-75 transition duration-500 ease-in-out`}
      >
        {children}
      </button>
    </div>
  )
}

export default FormButton
