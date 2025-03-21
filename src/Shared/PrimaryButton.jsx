import React from 'react'

const PrimaryButton = ({text}) => {
  return (
    <div className='py-2 px-5 bg-red-500  text-white font-semibold cursor-pointer select-none hover:bg-transparent hover:text-black border-2 border-red-500 transition-all scale-100 active:scale-90'>
        {text}
    </div>
  )
}

export default PrimaryButton