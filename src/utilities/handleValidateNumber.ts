import React from 'react';
import errorMsg from './errorMsg';


const handleValidateNumber = (e: React.ChangeEvent<HTMLInputElement>, message?:string) => {


    try {
        e.target.setAttribute('class', 'valid')

        if (e.target.value == '') {
            e.preventDefault();
            errorMsg("Erro de entrada de dados", message);
            e.target.setAttribute('class', 'invalid')
            return false;
        }
        
        return true;
    } catch(err) {
        e.preventDefault();
        errorMsg("Erro de entrada de dados", message);
        e.target.setAttribute('class', 'invalid')
        return false;
    }

}

export default handleValidateNumber;
