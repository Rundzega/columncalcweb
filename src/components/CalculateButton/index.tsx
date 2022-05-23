import { AxiosError } from 'axios';
import React, { ButtonHTMLAttributes } from 'react'
import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { IResponse } from '../../interfaces/IResponse';
import { ResultsService } from '../../services/ResultsService';
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
            className='w-full mt-3 appearance-none bg-brandPurple-300 rounded-[66px] text-white cursor-pointer text-xl font-semibold py-3 px-6 relative text-center flex justify-center duration-200 hover:bg-brandPurple-400 focus:outline-none disabled:opacity-50 disabled:text-opacity-50 disabled:cursor-default'
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