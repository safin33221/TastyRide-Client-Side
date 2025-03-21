import React from 'react'

const PrimaryButton = ({text}) => {
  return (
    <div className='py-2 px-5 bg-red-500 inline-flex text-white font-semibold cursor-pointer select-none hover:bg-transparent hover:text-black border-2 border-red-500 transition-all'>
        {text}
    </div>
  )
}

export default PrimaryButton