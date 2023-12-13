import React from 'react'

const FormField = ({labelName, name, type, placeHolder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'>
            {labelName}
          </label>
          {isSurpriseMe && (
            <button type="button" onClick={handleSurpriseMe} className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
              Surprise me
            </button>
          )}
      </div>
      <input type={type} id={name} placeholder={placeHolder} name={name} value={value} onChange={handleChange} required 
        className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649FF]
          border focus:border-[#4649FF] outline-none block w-full p-3' /> 
    </div>
  )
}

export default FormField