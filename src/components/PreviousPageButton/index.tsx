import React from 'react'
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { INavButton } from '../../interfaces/INavButton';

function PreviousPageButton( props:INavButton ) {
    const { to } = props
    const navigate = useNavigate()

    return(
        <IconContext.Provider value={{color: '#8E3A9D'}} >
            <button 
                {...props}
                className='mt-3 appearance-none bg-white rounded-[66px] border-brandPurple-300 text-brandPurple-300 inline-block text-2xl font-bold px-6 py-3 relative hover:bg-[#DCDAD1] focus:ring-1 disabled:bg-[#DCDAD1] disabled:opacity-50 disabled:text-[#cfcfcf] disabled:cursor-default'
                onClick={() => {
                    navigate(`/${to}`)
                }}
                >
                <AiIcons.AiOutlineArrowLeft onClick={() => {}}/>
            </button>
        </IconContext.Provider >
    )
}

export default PreviousPageButton;