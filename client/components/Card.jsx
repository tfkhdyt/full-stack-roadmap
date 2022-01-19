import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Buttons from './Buttons'

export default function Card({ id, data, state }) {
  const [progress, setProgress] = state
  const [isClicked, setIsClicked] = useState(
    progress.progress.includes(data._id)
  )
  const cookies = new Cookies()

  const handleProgressClick = (id) => {
    const isIdExists = progress.progress.some((value) => value === id)
    if (isIdExists) {
      setProgress({
        progress: progress.progress.filter((value) => value !== id),
      })
      setIsClicked(false)
    } else {
      setProgress({
        progress: [...progress.progress, id],
      })
      setIsClicked(true)
    }
  }

  if (id % 2 !== 0) {
    return (
      <>
        <div
          className={`bg-${data.color} shadow-md shadow-${data.color} text-gray-800 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto space-y-2 selection:bg-gray-800 selection:text-${data.color}`}
        >
          <p className={`font-semibold italic text-xs`}>{data.type}</p>
          <p className='font-bold text-xl flex items-center space-x-1'>
            <img
              src={data.icon}
              alt={`Foto ${data.title}`}
              className={`${data.title === 'Express' ? 'h-3' : 'h-5'}`}
            />
            <span>{data.title}</span>
          </p>
          <p className={`leading-snug text-sm lg:text-base md:text-justify`}>
            {data.description}
          </p>
          <Buttons
            linkVideo={data.linkVideo}
            linkDocs={data.linkDocs}
            color={data.color}
            title={data.title}
          />
        </div>
        <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
          <div className={`h-full w-6 flex items-center justify-center`}>
            <div className='h-full w-1 bg-sky-700 pointer-events-none'></div>
          </div>
          <div
            className={`w-9 h-9 -ml-1.5 absolute top-1/2 -mt-3 rounded-full grid place-items-center ${
              isClicked
                ? 'bg-green-600'
                : 'bg-gray-800 border-solid border-[0.225rem] border-sky-700'
            }`}
            onClick={() => handleProgressClick(data._id)}
          >
            {isClicked && (
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
      </>
    )
  } else {
    return (
      <>
        <div className='col-start-5 col-end-6 mr-10 md:mx-auto relative'>
          <div className='h-full w-6 flex items-center justify-center'>
            <div className='h-full w-1 bg-sky-700 pointer-events-none'></div>
          </div>
          <div
            className={`w-9 h-9 -ml-1.5 absolute top-1/2 -mt-3 rounded-full grid place-items-center ${
              isClicked
                ? 'bg-green-600'
                : 'bg-gray-800 border-solid border-[0.225rem] border-sky-700'
            }`}
            onClick={() => handleProgressClick(data._id)}
          >
            {isClicked && (
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
        <div
          className={`bg-${data.color} shadow-md shadow-${data.color} text-gray-800 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto space-y-2 selection:bg-gray-800 selection:text-${data.color}`}
        >
          <p className={`font-semibold italic text-xs`}>{data.type}</p>
          <p className='font-bold text-xl flex items-center space-x-1'>
            <img
              src={data.icon}
              alt={`Foto ${data.title}`}
              className={`${data.title === 'Express' ? 'h-3' : 'h-5'}`}
            />
            <span>{data.title}</span>
          </p>
          <p className='leading-snug text-sm lg:text-base md:text-justify'>
            {data.description}
          </p>
          <Buttons
            linkVideo={data.linkVideo}
            linkDocs={data.linkDocs}
            color={data.color}
            title={data.title}
          />
        </div>
      </>
    )
  }
}
