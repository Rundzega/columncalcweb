import React from 'react';
import errorMsg from './errorMsg';


const handleValidateMinimum = (e: React.ChangeEvent<HTMLInputElement>, minimumValue:number ,message?:string) => {
    const value = parseFloat(e.target.value)
  

    if (value < minimumValue) {
  
        errorMsg(message);
        e.target.setAttribute('class', 'invalid')
        e.preventDefault();
        return false;
    } else if (e.target.value == '') {
        e.preventDefault();
        errorMsg(message);
        e.target.setAttribute('class', 'invalid')
        return false;
    }
    
    else {
        e.target.setAttribute('class', 'valid')
        return true;
    }

}

export default handleValidateMinimum;