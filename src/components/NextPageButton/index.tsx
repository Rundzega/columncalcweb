import React, { ButtonHTMLAttributes } from 'react'
import { IconContext } from 'react-icons';
import * as GrIcons from 'react-icons/gr'
import * as AiIcons from 'react-icons/ai'
import '../../styles/next-page-button.scss'
import { useNavigate } from 'react-router-dom';


type NavButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: string
}

function NextPageButton( props:NavButtonType ) {
    const { to } = props
    const navigate = useNavigate()

    return(
        <IconContext.Provider value={{color: '#ffffff'}}>
            <button 
                {...props}
                className='next'
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

