import React, { ButtonHTMLAttributes } from 'react'
import '../../styles/add-button.scss'

function AddButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {

    return(
        <button 
        className='add'
        {...props}
        >Adicionar</button>
    )
}

export default AddButton;