import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
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
        className={`p-3 rounded-full bg-sky-400 fixed bottom-4 right-6 shadow-lg transition-opacity duration-500 ease-in-out ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } active:bg-sky-600`}
        onClick={showButton ? handleClick : null}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 fill-gray-800'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 10l7-7m0 0l7 7m-7-7v18'
          />
        </svg>
      </button>
    </>
  )
}
