import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

type NavProps = {
  link: string
  label: string
  isOpenInNewTab?: boolean
}

interface IHeader {
  children: ReactNode
  noBlur?: boolean
}

export const Nav = ({ link, label, isOpenInNewTab = false }: NavProps) => {
  return (
    <div className='group text-sm'>
      <Link href={link} scroll={false}>
        <a
          className='flex items-center space-x-1 transition duration-200 ease-in-out group-hover:text-sky-600'
          target={isOpenInNewTab ? '_blank' : ''}
        >
          <span className='font-semibold'>{label}</span>
        </a>
      </Link>
    </div>
  )
}

const Header = ({ children, noBlur = false }: IHeader) => {
  const colors: string[] = [
    'red',
    'green',
    'blue',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'orange',
    'amber',
    'yellow',
    'lime',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ]

  const getRandomIndex = (): number => {
    return Math.floor(Math.random() * colors.length)
  }

  const getRandomColor = () => {
    return {
      from: colors[getRandomIndex()],
      via: colors[getRandomIndex()],
      to: colors[getRandomIndex()],
    }
  }

  interface IGradient {
    from: string
    via: string
    to: string
  }

  /*const chosen = useRef(
    JSON.parse(sessionStorage.getItem('gradient') as string) || {}
    )*/

  const [chosen, setChosen] = useState<IGradient>({
    from: '',
    via: '',
    to: '',
  })

  useEffect(() => {
    if (window) {
      const session = sessionStorage.getItem('gradient')
      if (session == null) {
        const gradient = getRandomColor()
        setChosen(gradient)
        sessionStorage.setItem('gradient', JSON.stringify(gradient))
      } else {
        const gradient: IGradient = JSON.parse(
          sessionStorage.getItem('gradient') as string
        )
        setChosen(gradient)
      }
    }
  }, [])

  return (
    chosen && (
      <div
        className={
          !noBlur
            ? 'fixed inset-x-0 top-0 z-[100] w-screen bg-gray-800/80 backdrop-blur-md'
            : undefined
        }
      >
        <div
          className={`flex flex-col space-y-1 bg-gradient-to-br text-center selection:bg-sky-600 selection:text-gray-800 from-${chosen.from}-300 via-${chosen.via}-600 to-${chosen.to}-800 mx-auto w-fit animate-gradient-x bg-clip-text py-1 text-transparent`}
        >
          {children}
        </div>
      </div>
    )
  )
}

export default Header
