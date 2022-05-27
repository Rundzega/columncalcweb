import { AxiosError } from 'axios';
import React, { ButtonHTMLAttributes, useState } from 'react'
import { Loading } from '../Loading';
import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { IResponse } from '../../interfaces/IResponse';
import { ResultsService } from '../../services/ResultsService';
import errorMsg from '../../utilities/errorMsg';
import { parseColumnData } from '../../utilities/parseColumnData';
import sucessMsg from '../../utilities/sucessMsg';

type CalculateButtonPRops = ButtonHTMLAttributes<HTMLButtonElement>

function CalculateButton( props:CalculateButtonPRops ) {
    const { state, dispatch } = useColumnDataContext();
    const columnData = parseColumnData(state);
    const [isCalculating, setIsCalculating] = useState(false)

    return(
        <button 
            className='w-full mt-6 appearance-none bg-brandPurple-300 rounded-[66px] text-white cursor-pointer text-xl font-semibold py-3 px-6 relative text-center flex justify-center duration-200 hover:bg-brandPurple-400 focus:outline-none disabled:opacity-50 disabled:text-opacity-50 disabled:cursor-default'
            onClick={async () => {
                setIsCalculating(true)
                await ResultsService.ColumnResultsService(columnData)
                    .then((response) => {
                        const { data } = response
                        dispatch({type: 'update-results', payload: data})
                        sucessMsg(); 
                    })
                    .catch((err:AxiosError<IResponse>) => {
                        errorMsg("A verificação falhou",  err.response?.data.message)
                    })
                    setIsCalculating(false)
                }
            }
            {...props}
        >
            { isCalculating ? <Loading /> : 'CALCULAR'}
        </button>
    )
}

export default CalculateButton;