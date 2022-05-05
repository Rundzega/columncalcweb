import { dispatch } from 'd3';
import React, { ButtonHTMLAttributes } from 'react'
import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { ResultsService } from '../../services/ResultsService';
import '../../styles/calculate-button.scss'
import { parseColumnData } from '../../utilities/parseColumnData';

function CalculateButton( props:ButtonHTMLAttributes<HTMLButtonElement> ) {

    const { state, dispatch } = useColumnDataContext();

    const columnData = parseColumnData(state);

    return(

        <button 
            className='calculate'
            onClick={() => {
                const response = ResultsService.ColumnResultsService(columnData)
                    .then((response) => {
                    const { data } = response
                    console.log(data)
                    dispatch({type: 'update-results', payload: data})
                    })
                    .catch((err) => {
                    console.log(err)
                    })
                }
            }
            {...props}
        >
        </button>
    )
}

export default CalculateButton;