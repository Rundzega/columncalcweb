import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import '../../styles/results.scss'
import { LongitudinalResultButton } from '../../components/LongitudinalResultButton';
import CalculateButton from '../../components/CalculateButton';
import { LongitudinalResultSVG } from '../../components/LongitudinalResultSVG';
import { TransversalResultSVG } from '../../components/TransversalResultSVG';
import { TransversalResultsButton } from '../../components/TransversalResultButton';
import { useState } from 'react';
import { Loading } from '../../components/Loading';
import PreviousPageButton from '../../components/PreviousPageButton';
import NextPageButton from '../../components/NextPageButton';



function Results() {

    const { state } = useColumnDataContext();
    const [isCalculating, setIsCalculating] = useState(false)


    return(
        <>
            <div id="results-container">
                <h2>Results</h2>
                {state.currentResultType == 'longitudinal' ? 
                    <LongitudinalResultSVG 
                        result = {state.longitudinalDisplayResults.result} 
                        title={state.longitudinalDisplayResults.title} 
                        unit={state.longitudinalDisplayResults.unit}>
                    </LongitudinalResultSVG> : 
                    <TransversalResultSVG 
                        diagram={state.transversalDisplayResults.diagram}
                        forces={state.transversalDisplayResults.forces} 
                        title={state.transversalDisplayResults.title}>
                    </TransversalResultSVG>
            }
                <div className="calculate-button">
                    <CalculateButton
                        onCalculateClick={setIsCalculating}
                    >
                        { isCalculating ? <Loading /> : 'CALCULAR'}
                    </CalculateButton>
                </div>
                <div className="sub-container" id="longitudinal-results">
                    <div className="title">Resultados do Pilar</div>
                    <div className="subtitle">Esforços</div>     
                    <div className="forces">
                        <LongitudinalResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</LongitudinalResultButton>
                        <LongitudinalResultButton result='mxForces' unit='kN.m' title='Mxd (kN.m)'>Mx</LongitudinalResultButton>
                        <LongitudinalResultButton result='myForces' unit='kN.m' title='Myd (kN.m)'>My</LongitudinalResultButton>
                    </div>
                    <div className="subtitle">Deslocamentos</div>
                    <div className="displacements">
                        <LongitudinalResultButton result='uxDisplacements' unit='cm' title='ux (cm)'>ux</LongitudinalResultButton>
                        <LongitudinalResultButton result='uyDisplacements' unit='cm' title='uy (cm)'>uy</LongitudinalResultButton>
                    </div>
                </div>
                <div className="sub-container" id="transversal-results">
                    <div className="title">Resultados da Seção Transversal</div>
                    <div className="cross-section-results">
                        <div className="subtitle">Esforços Máximos</div>
                        <div className="max">
                            <TransversalResultsButton 
                                diagram='ndMaxResistanceDiagramPoints'
                                forces='ndMaxSolicitingForces'
                                title='NdMAX - Envoltórias'
                                disabled = {!state.results.isResultsAvailable}>
                                    Nd
                            </TransversalResultsButton>
                            <TransversalResultsButton 
                                diagram='mxMaxResistanceDiagramPoints'
                                forces='mxMaxSolicitingForces'
                                title='MxMAX - Envoltórias'>Mx</TransversalResultsButton>
                            <TransversalResultsButton 
                                diagram='myMaxResistanceDiagramPoints'
                                forces='myMaxSolicitingForces'
                                title='MyMAX - Envoltórias'>My</TransversalResultsButton>
                        </div>
                        <div className="subtitle">Esforços Mínimos</div>
                        <div className="min">
                            <TransversalResultsButton 
                                diagram='ndMinResistanceDiagramPoints'
                                forces='ndMinSolicitingForces'
                                title='NdMIN - Envoltórias'>Nd</TransversalResultsButton>
                            <TransversalResultsButton 
                                diagram='mxMinResistanceDiagramPoints'
                                forces='mxMinSolicitingForces'
                                title='MxMIN - Envoltórias'>Mx</TransversalResultsButton>
                            <TransversalResultsButton 
                                diagram='myMinResistanceDiagramPoints'
                                forces='myMinSolicitingForces'
                                title='MyMIN - Envoltórias'>My</TransversalResultsButton>
                        </div>
                    </div>
                </div>
                <footer className="navigation-buttons">
                    <div className="nav-button">
                        <PreviousPageButton to='discretization'  />
                    </div>
                    <div className="nav-button">
                        <NextPageButton to='#' disabled/>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Results