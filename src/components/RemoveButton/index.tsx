import React, { ButtonHTMLAttributes } from 'react'
import '../../styles/remove-button.scss'

function RemoveButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {
    return(
        <button 
        className='remove'
        {...props}
        >Remover</button>
    )
}

export default RemoveButton;