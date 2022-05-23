import React from 'react';
import errorMsg from './errorMsg';


const handleValidateMinimum = (e: React.ChangeEvent<HTMLInputElement>, minimumValue:number ,message?:string) => {
    e.preventDefault()
    const value = parseFloat(e.target.value)
  

    if (value < minimumValue) {
  
        errorMsg(message);
        return false;
    } else if (e.target.value == '') {
        errorMsg(message);
        return false;
    }
    
    else {
        return true;
    }

}

export default handleValidateMinimum;
