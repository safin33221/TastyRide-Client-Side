import React from 'react'

const PrimaryButton = ({ text }) => {
  return (
    <div className='text-center py-2 px-5 bg-red-500  text-white font-semibold cursor-pointer select-none hover:bg-red-600 border-2 border-red-500 hover:border-red-600 transition-all scale-100 active:scale-90'>
      {text}
    </div>
  )
}

export default PrimaryButton