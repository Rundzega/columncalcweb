import React, { ButtonHTMLAttributes } from 'react'
import '../../styles/calculate-button.scss'

function CalculateButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {

    return(

        <button 
            className='calculate'
            {...props}
        >
        </button>
    )
}

export default CalculateButton;