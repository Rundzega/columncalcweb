import React, { ButtonHTMLAttributes } from 'react'

function AddButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {
    return(
        <button 
            className='w-full mt-2 appearance-none bg-[#25ae4c] rounded-[66px] text-white cursor-pointer text-sm font-semibold py-2 px-4 relative text-center duration-200 hover:bg-[#298e46] focus:outline-none focus:ring-2 focus:ring-brandPurple-300 disabled:opacity-50 disabled:cursor-default disabled:text-opacity-50'
            {...props}
            >Adicionar
        </button>
    )
}

export default AddButton;