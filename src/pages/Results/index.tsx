import React, { useRef, useState } from 'react'
import { useColumnDataContext } from '../../hooks/useReducerContext';
import { ResultsService } from '../../services/ResultsService'

import { parseColumnData } from '../../utilities/parseColumnData'



import '../../styles/results.scss'
import { ResultButton } from '../../components/ResultButton';
import CalculateButton from '../../components/CalculateButton';



function Results() {

    const [test, setTest] = useState<any>(0)
    const { state } = useColumnDataContext();

    const columnData = parseColumnData(state);

    const resultsSvg = useRef<SVGSVGElement | null>(null)


    return(
        <>
            <div id="results-container">
                <h2>Results</h2>
                <div className="svg-container" id="svg-d3-results">
                    <svg className='svg-results'ref={resultsSvg}></svg>
                </div>
                <div className="calculate-button"><CalculateButton >CALCULAR</CalculateButton></div>
                <div className="sub-container" id="longitudinal-results">
                    <div className="title">Resultados do Pilar</div>
                    <div className="subtitle">Esforços</div>    
                    <div className="forces">
                        <ResultButton>Nd</ResultButton>
                        <ResultButton>Mx</ResultButton>
                        <ResultButton>My</ResultButton>
                    </div>
                    <div className="subtitle">Deslocamentos</div>
                    <div className="displacements">
                        <ResultButton>ux</ResultButton>
                        <ResultButton>uy</ResultButton>
                    </div>
                </div>
                <div className="sub-container" id="transversal-results">
                    <div className="title">Resultados da Seção Transversal</div>
                    <div className="cross-section-results">
                        <div className="subtitle">Esforços Máximos</div>
                        <div className="max">
                            <ResultButton>Nd</ResultButton>
                            <ResultButton>Mx</ResultButton>
                            <ResultButton>My</ResultButton>
                        </div>
                        <div className="subtitle">Esforços Mínimos</div>
                        <div className="min">
                            <ResultButton>Nd</ResultButton>
                            <ResultButton>Mx</ResultButton>
                            <ResultButton>My</ResultButton>

                        </div>
                    </div>
                </div>
            </div>
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
        </>
    )
}

export default Results