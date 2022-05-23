import { useColumnDataContext } from '../../hooks/useColumnDataContext';
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
            <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl">
                <h2 className="text-brandPurple-300 text-2xl font-bold">Results</h2>
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
                <div className="w-full mb-3">
                    <CalculateButton
                        onCalculateClick={setIsCalculating}
                    >
                        { isCalculating ? <Loading /> : 'CALCULAR'}
                    </CalculateButton>
                </div>
                <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white" id="longitudinal-results">
                    <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Resultados do Pilar</div>
                    <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços</div>     
                    <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
                        <LongitudinalResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</LongitudinalResultButton>
                        <LongitudinalResultButton result='mxForces' unit='kN.m' title='Mxd (kN.m)'>Mx</LongitudinalResultButton>
                        <LongitudinalResultButton result='myForces' unit='kN.m' title='Myd (kN.m)'>My</LongitudinalResultButton>
                    </div>
                    <div className="text-base text-brandGreen-300 mt-4 font-semibold">Deslocamentos</div>
                    <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
                        <LongitudinalResultButton result='uxDisplacements' unit='cm' title='ux (cm)'>ux</LongitudinalResultButton>
                        <LongitudinalResultButton result='uyDisplacements' unit='cm' title='uy (cm)'>uy</LongitudinalResultButton>
                    </div>
                </div>
                <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white" id="transversal-results">
                    <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Resultados da Seção Transversal</div>
                    <div>
                        <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços Máximos</div>
                        <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
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
                        <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços Mínimos</div>
                        <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
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
                <footer className="w-full flex flex-row justify-between items-center">
                    <div>
                        <PreviousPageButton to='discretization'  />
                    </div>
                    <div>
                        <NextPageButton to='#' disabled/>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Results