import Link from 'next/link'

export const Nav = ({ link, icon, label, isOpenInNewTab = false }) => {
  return (
    <div className='group text-sm'>
      <Link href={link}>
        <a
          className='group-hover:text-sky-600 flex items-center space-x-1 transition duration-200 ease-in-out'
          target={isOpenInNewTab && '_blank'}
        >
          <span className='font-semibold'>{label}</span>
        </a>
      </Link>
    </div>
  )
}

export default function Header({ children }) {
  return (
    <div className='flex flex-col space-y-3 text-center selection:bg-sky-600 selection:text-gray-800 bg-gradient-to-bl from-blue-600 via-red-500 to-yellow-400 w-fit mx-auto text-transparent bg-clip-text animate-gradient-x'>
      {children}
    </div>
  )
}
