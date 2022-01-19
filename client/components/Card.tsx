import { useState } from 'react'
// import Cookies from 'universal-cookie'
import Buttons from './Buttons'
import LinesAndDot from './LinesAndDot'

type CardProps = {
  id: number
  data: any
  state: any
}

type ProgressType = {
  progress: string[]
}

const Card = ({ id, data, state }: CardProps) => {
  const [progress, setProgress]: [ProgressType, any] = state
  const [isActive, setIsClicked] = useState(
    progress.progress.includes(data._id)
  )
  // const cookies = new Cookies()

  const baseColor = data.color
  let shadeColor = data.color.split('-')
  shadeColor[1] = Number(shadeColor[1]) + 200
  shadeColor = shadeColor.join('-')

  const handleProgressClick = (id: string) => {
    const isIdExists = progress.progress.some((value: string) => value === id)
    if (isIdExists) {
      setProgress({
        progress: progress.progress.filter((value: string) => value !== id),
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
          className={`bg-gradient-to-br from-${baseColor} to-${shadeColor} shadow-md shadow-${shadeColor} text-gray-800 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto space-y-2 selection:bg-gray-800 selection:text-${baseColor}`}
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
          <p
            className={`leading-snug text-sm lg:text-base md:text-justify tracking-wide`}
          >
            {data.description}
          </p>
          <Buttons
            linkVideo={data.linkVideo}
            linkDocs={data.linkDocs}
            color={data.color}
            shade={shadeColor}
            title={data.title}
          />
        </div>
        <LinesAndDot
          isActive={isActive}
          handleProgressClick={handleProgressClick}
          id={data._id}
        />
      </>
    )
  } else {
    return (
      <>
        <LinesAndDot
          isActive={isActive}
          handleProgressClick={handleProgressClick}
          id={data._id}
        />
        <div
          className={`bg-gradient-to-br from-${baseColor} to-${shadeColor} shadow-md shadow-${shadeColor} text-gray-800 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto space-y-2 selection:bg-gray-800 selection:text-${baseColor}`}
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
          <p className='leading-snug text-sm lg:text-base md:text-justify tracking-wide'>
            {data.description}
          </p>
          <Buttons
            linkVideo={data.linkVideo}
            linkDocs={data.linkDocs}
            color={data.color}
            shade={shadeColor}
            title={data.title}
          />
        </div>
      </>
    )
  }
}

export default Card
