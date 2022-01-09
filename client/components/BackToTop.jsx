import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 175) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const handleClick = () => {
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <button
        className={`p-3 rounded-full bg-sky-600 fixed bottom-4 left-7 shadow-md shadow-sky-700/50 transition-opacity duration-400 ease-in-out ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } active:bg-sky-800`}
        onClick={showButton ? handleClick : null}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 15l7-7 7 7'
          />
        </svg>
      </button>
    </>
  )
}
