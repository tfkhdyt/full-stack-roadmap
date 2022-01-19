import { useState, useEffect } from 'react'

type LinesAndDotProps = {
  isActive: boolean
  handleProgressClick: any
  id: string
}

const LinesAndDot = ({
  isActive,
  handleProgressClick,
  id,
}: LinesAndDotProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
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

  return (
    <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
      <div className={`h-full w-6 flex items-center justify-center`}>
        <div className='h-full w-1 bg-sky-700 pointer-events-none'></div>
      </div>
      <div
        className={`w-9 h-9 -ml-1.5 absolute top-1/2 -mt-3 rounded-full grid place-items-center ${
          isActive
            ? 'bg-gradient-to-br from-green-600 to-green-700'
            : 'bg-gray-800 border-solid border-[0.225rem] border-sky-700'
        } ${isClicked && isActive && 'animate-pop-out pointer-events-none'}`}
        onClick={() => {
          handleClick()
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
