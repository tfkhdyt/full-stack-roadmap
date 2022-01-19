import { useEffect, useState } from 'react'

type SelectFormProps = {
  label: string
  id: string
  handleColor: (color: string) => void
  handleIntensity: (intensity: number) => void
  defaultColor?: string
  defaultIntensity?: number
}

const SelectForm = ({
  label,
  id,
  handleColor,
  handleIntensity,
  defaultColor = 'blue',
  defaultIntensity = 400,
}: SelectFormProps) => {
  const colors = [
    {
      value: 'red',
      label: 'Red',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'blue',
      label: 'Blue',
    },
    {
      value: 'slate',
      label: 'Slate',
    },
    {
      value: 'gray',
      label: 'Gray',
    },
    {
      value: 'zinc',
      label: 'Zinc',
    },
    {
      value: 'neutral',
      label: 'Neutral',
    },
    {
      value: 'stone',
      label: 'Stone',
    },
    {
      value: 'orange',
      label: 'Orange',
    },
    {
      value: 'amber',
      label: 'Amber',
    },
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'lime',
      label: 'Lime',
    },
    {
      value: 'emerald',
      label: 'Emerald',
    },
    {
      value: 'teal',
      label: 'Teal',
    },
    {
      value: 'cyan',
      label: 'Cyan',
    },
    {
      value: 'sky',
      label: 'Sky',
    },
    {
      value: 'indigo',
      label: 'Indigo',
    },
    {
      value: 'violet',
      label: 'Violet',
    },
    {
      value: 'purple',
      label: 'Purple',
    },
    {
      value: 'fuchsia',
      label: 'Fuchsia',
    },
    {
      value: 'pink',
      label: 'Pink',
    },
    {
      value: 'rose',
      label: 'Rose',
    },
  ]
  const [color, setColor] = useState<string>(defaultColor)
  const [intensity, setIntensity] = useState<number>(defaultIntensity)

  const _intensity = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  useEffect(() => {
    handleColor(color)
    handleIntensity(intensity)
  }, [color, intensity])

  return (
    <div className='space-y-1 flex-col'>
      <label htmlFor={id} className='text-gray-200 font-medium'>
        {label}
      </label>
      <div className='space-x-2 flex'>
        <select
          name='color'
          className='py-2 px-3 rounded-md focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out bg-gray-700 text-gray-200 appearance-none outline-none'
          onChange={(e) => setColor(e.target.value)}
          defaultValue={color}
        >
          {colors
            .sort((a, b) => (a.value > b.value ? 1 : -1))
            .map((element, index) => (
              <option key={index} value={element.value}>
                {element.label}
              </option>
            ))}
        </select>
        <select
          name='intensity'
          className='py-2 px-3 rounded-md focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out bg-gray-700 text-gray-200 appearance-none outline-none'
          onChange={(e) => setIntensity(Number(e.target.value))}
          defaultValue={intensity}
        >
          {_intensity.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
        <div className={`w-10 h-10 bg-${color}-${intensity} rounded-md`}></div>
      </div>
    </div>
  )
}

export default SelectForm
