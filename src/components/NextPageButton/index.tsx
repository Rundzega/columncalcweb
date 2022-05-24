import React from 'react'
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { INavButton } from '../../interfaces/INavButton';

function NextPageButton( props:INavButton ) {
    const { to } = props
    const navigate = useNavigate()

    return(
        <IconContext.Provider value={{color: '#ffffff'}}>
            <button 
                {...props}
                className='mt-3 appearance-none bg-brandPurple-300 rounded-[66px] text-white inline-block text-2xl font-bold px-6 py-3 relative hover:bg-brandPurple-400 focus:ring-1 disabled:bg-brandPurple-400 disabled:opacity-50 disabled:text-[#cfcfcf] disabled:cursor-default'
                onClick={() => {
                    navigate(`/${to}`)
                }}
                >
                <AiIcons.AiOutlineArrowRight />
            </button>
        </IconContext.Provider >
    )
}

export default NextPageButton;

