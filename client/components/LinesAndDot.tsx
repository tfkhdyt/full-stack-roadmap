import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

type LinesAndDotProps = {
  isActive: boolean
  handleProgressClick: any
  id: string
  name: string
}

const LinesAndDot = ({
  isActive,
  handleProgressClick,
  id,
  name,
}: LinesAndDotProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (name: string) => {
    if (!isActive) {
      toast.success(`${name} has been marked as done!`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else {
      toast.info(
        `${name}'${
          name.charAt(name.length - 1).toLowerCase() !== 's' ? 's' : ''
        } mark has been removed!`,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        }
      )
    }
    setIsClicked(true)
  }

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isClicked])

  useEffect(() => {
    if (!isActive) {
      setIsClicked(false)
    }
  }, [isActive])

  return (
    <div className='relative col-start-5 col-end-6 mr-10 md:mx-auto'>
      <div className={`flex h-full w-6 items-center justify-center`}>
        <div className='pointer-events-none h-full w-1 bg-sky-700'></div>
      </div>
      <div
        className={`absolute top-1/2 -ml-1.5 -mt-3 grid h-9 w-9 place-items-center rounded-full ${
          isActive
            ? 'bg-gradient-to-br from-green-600 to-green-700'
            : 'border-[0.225rem] border-solid border-sky-700 bg-gray-800'
        } ${isClicked && isActive && 'pointer-events-none animate-pop-out'}`}
        onClick={() => {
          handleClick(name)
          handleProgressClick(id)
        }}
      >
        {isActive && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default LinesAndDot
