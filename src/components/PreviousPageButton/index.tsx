import React from 'react'
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { INavButton } from '../../interfaces/INavButton';
import '../../styles/previous-page-button.scss'

function PreviousPageButton( props:INavButton ) {
    const { to } = props
    const navigate = useNavigate()

    return(
        <IconContext.Provider value={{color: '#8E3A9D'}} >
            <button 
                {...props}
                className='previous'
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