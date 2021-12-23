function AuthButton ({ children }) {
  return (
    <div>
      <button 
        type='submit' 
        className='w-full text-gray-200 bg-green-600 rounded-md py-2.5 font-semibold mt-2'
      >
        {children}
      </button>
    </div>
  )
}

export default AuthButton
