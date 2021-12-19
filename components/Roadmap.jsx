import Card from './Card'
import { data } from '../public/data'

export default function Roadmap() {
  return (
    <div className='flex flex-col justify-center'>
      <div className='mx-3 md:mx-16 lg:mx-56'>
        <div className='flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50'>
          {data.map((e, i) => (
            <div key={i} className={`flex ${((i+1) % 2 !== 0) ? 'flex-row-reverse' : null } md:contents`}>
              <Card id={i + 1} data={e} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
