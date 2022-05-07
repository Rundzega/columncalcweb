import { AxiosError } from 'axios';
import React, { ButtonHTMLAttributes } from 'react'
import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { IResponse } from '../../interfaces/IResponse';
import { ResultsService } from '../../services/ResultsService';
import '../../styles/calculate-button.scss'
import errorMsg from '../../utilities/errorMsg';
import { parseColumnData } from '../../utilities/parseColumnData';
import sucessMsg from '../../utilities/sucessMsg';


type CalculateButtonPRops = ButtonHTMLAttributes<HTMLButtonElement> & {
    onCalculateClick: (type: boolean) => void;
}

function CalculateButton( props:CalculateButtonPRops ) {

    const { state, dispatch } = useColumnDataContext();

    const columnData = parseColumnData(state);

    return(

        <button 
            className='calculate'
            onClick={async () => {
                props.onCalculateClick(true)
                const response = await ResultsService.ColumnResultsService(columnData)
                    .then((response) => {
                    const { data } = response
                    console.log(data)
                    dispatch({type: 'update-results', payload: data})
                    sucessMsg();
                
                    })
                    .catch((err:AxiosError<IResponse>) => {
                    console.log()
                    errorMsg(err.response?.data.message)
                    })
                    props.onCalculateClick(false)
                }
            }
            {...props}
        >
        </button>
    )
}

export default CalculateButton;