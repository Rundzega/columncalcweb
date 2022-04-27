import React from 'react';
import errorMsg from '../ErrorMsg';


const handleValidateNumber = (e: React.ChangeEvent<HTMLInputElement>, message?:string) => {


    try {
        e.target.setAttribute('class', 'valid')

        if (e.target.value == '') {
            e.preventDefault();
            errorMsg(message);
            e.target.setAttribute('class', 'invalid')
            return false;
        }
        
        return true;
    } catch(err) {
        e.preventDefault();
        errorMsg(message);
        e.target.setAttribute('class', 'invalid')
        return false;
    }

}

export default handleValidateNumber;
