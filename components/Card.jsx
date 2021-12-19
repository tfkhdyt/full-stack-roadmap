import Image from "next/image"

export default function Card({ id, data }) {
  let card
  if (id % 2 !== 0) {
    card = (
      <div className='flex flex-row-reverse md:contents'>
        <div className={`${data.bgColor} shadow-lg shadow-${data.shadColor} ${data.textColor} col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto`}>
          <h2 className='font-medium italic text-xs mb-1'>{data.type}</h2>
          <h3 className='font-semibold text-lg mb-1 flex items-center'>
            <Image src={data.icon} height='20' width='20'/>
            {data.title}
          </h3>
          <p className='leading-tight text-sm'>
            {data.description}
          </p>
        </div>
        <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
          <div className='h-full w-6 flex items-center justify-center'>
            <div className='h-full w-1 bg-blue-800 pointer-events-none'></div>
          </div>
          <div className='w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow'></div>
        </div>
      </div>
    )
  } else {
    card = (
      <div className='flex md:contents'>
        <div className='col-start-5 col-end-6 mr-10 md:mx-auto relative'>
          <div className='h-full w-6 flex items-center justify-center'>
            <div className='h-full w-1 bg-blue-800 pointer-events-none'></div>
          </div>
          <div className='w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow'></div>
        </div>
        <div className={`${data.bgColor} shadow-lg shadow-${data.shadColor} ${data.textColor} col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto`}>
          <h2 className='font-medium italic text-xs mb-1'>{data.type}</h2>
          <h3 className='font-semibold text-lg mb-1 flex items-center'>
            <Image src={data.icon} height='20' width='20' />
            {data.title}
          </h3>
          <p className='leading-tight text-sm'>
            {data.description}
          </p>
        </div>
      </div>
    )
  }
  
  return card
}
