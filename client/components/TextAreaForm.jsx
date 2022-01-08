function TextAreaForm({ label, id, onChange, ...rest }) {
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='text-gray-200 font-medium'>
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        className='w-full py-2 px-3 h-28 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out bg-gray-700 text-gray-200 resize-none block'
        spellCheck
        onChange={onChange}
        {...rest}
        required
      ></textarea>
    </div>
  )
}

export default TextAreaForm
