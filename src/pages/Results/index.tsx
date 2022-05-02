import React, { useState } from 'react'
import { ResultsService } from '../../services/ResultsService'
import { useReducerContext } from '../../hooks/useReducerContext'

import { getColumnData } from '../../utilities/getColumnData'



function Results() {

    const [test, setTest] = useState<any>(0)
    const { state } = useReducerContext();

    const columnData = getColumnData(state);


    return(
        <div>
            <h2>Results</h2>
            <button
            onClick={async () => {
                // console.log(JSON.stringify(columnData))
               const response = ResultsService.ColumnResultsService(columnData)
                                .then((response) => {
                                    console.log(response)
                                    setTest(response)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
            }}>
                BOTAO
            </button>

            <button >SEND</button>
            {/* <div>{JSON.stringify(columnData)}</div> */}
            {/* <div>{JSON.stringify(state)}</div> */}
            <div>{JSON.stringify(test)}</div>
        </div>
    )
}

export default Results