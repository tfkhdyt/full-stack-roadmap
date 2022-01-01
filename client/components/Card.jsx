import Buttons from './Buttons'

export default function Card({ id, data }) {
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
          />
        </div>
        <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
          <div className='h-full w-6 flex items-center justify-center'>
            <div className='h-full w-1 bg-sky-800 pointer-events-none'></div>
          </div>
          <div className='w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-sky-500 shadow'></div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='col-start-5 col-end-6 mr-10 md:mx-auto relative'>
          <div className='h-full w-6 flex items-center justify-center'>
            <div className='h-full w-1 bg-sky-800 pointer-events-none'></div>
          </div>
          <div className='w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-sky-500 shadow'></div>
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
          />
        </div>
      </>
    )
  }
}
