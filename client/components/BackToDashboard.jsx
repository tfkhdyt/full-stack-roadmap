import Link from 'next/link'

export default function BackToDashboard() {
  return (
    <Link href='/dashboard'>
      <a className='flex justify-start items-center space-x-1 my-2 italic text-sm w-fit'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 fill-cyan-500'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-cyan-500'>Back to dashboard</span>
      </a>
    </Link>
  )
}
