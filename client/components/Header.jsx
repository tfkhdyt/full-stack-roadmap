import Link from 'next/link'
import Config from '../config'

const Nav = ({ link, icon, label, isOpenInNewTab = false }) => {
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

export default function Header() {
  return (
    <div className='flex flex-col space-y-2 text-center selection:bg-sky-600 selection:text-gray-800 bg-gradient-to-bl from-blue-600 via-red-500 to-yellow-400 w-fit mx-auto text-transparent bg-clip-text animate-gradient-x'>
      <span className='font-extrabold text-xl lg:text-4xl cursor-text leading-none'>
        {Config.header}
      </span>
      <span className='flex justify-center items-center space-x-2'>
        <Nav
          link='https://github.com/tfkhdyt/full-stack-roadmap'
          label='Source Code'
          isOpenInNewTab={true}
        />
        <Nav link='/auth/login' label='Dashboard' />
      </span>
    </div>
  )
}
