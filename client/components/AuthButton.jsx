function AuthButton({ type, children }) {
  let color
  if (type === 'register') color = 'bg-green-600'
  else if (type === 'login') color = 'bg-sky-600'

  return (
    <div>
      <button
        type='submit'
        className={`w-full text-gray-200 ${color} rounded-md py-2.5 font-semibold mt-2`}
      >
        {children}
      </button>
    </div>
  )
}

export default AuthButton
