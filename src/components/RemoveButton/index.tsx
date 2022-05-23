import React, { ButtonHTMLAttributes } from 'react'

function RemoveButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {
    return(
        <button 
        className='w-full mt-2 appearance-none bg-[#ca5264] rounded-[66px] text-white cursor-pointer text-sm font-semibold py-2 px-4 relative text-center duration-200 hover:bg-[#aa2d40] focus:outline-none disabled:opacity-50 disabled:cursor-default disabled:text-opacity-50'
        {...props}
        >Remover</button>
    )
}

export default RemoveButton;