import React, { ButtonHTMLAttributes } from 'react'

function RemoveButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {
    return(
        <button 
        className='w-full mt-2 appearance-none bg-[#ca5264] rounded-[66px] text-white text-sm font-semibold px-4 py-2 relative hover:bg-[#aa2d40] focus:outline-none focus:ring-2 focus:ring-brandPurple-300 disabled:bg-[#ca5264] disabled:opacity-50 disabled:text-[#cfcfcf] disabled:cursor-default duration-200'
        {...props}
        >Remover</button>
    )
}

export default RemoveButton;