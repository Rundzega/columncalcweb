import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import '../../styles/results.scss'
import { ResultButton } from '../../components/ResultButton';
import CalculateButton from '../../components/CalculateButton';
import { ResultSVG } from '../../components/ResultSVG';


function Results() {

    const { state } = useColumnDataContext();


    return(
        <>
            <div id="results-container">
                <h2>Results</h2>
                <ResultSVG result = {state.resultDisplay.result} title={state.resultDisplay.title} unit={state.resultDisplay.unit}></ResultSVG>
                <div className="calculate-button">
                    <CalculateButton>CALCULAR</CalculateButton></div>
                <div className="sub-container" id="longitudinal-results">
                    <div className="title">Resultados do Pilar</div>
                    <div className="subtitle">Esforços</div>    
                    <div className="forces">
                        <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</ResultButton>
                        <ResultButton result='mxForces' unit='kN.m' title='Mxd (kN.m)'>Mx</ResultButton>
                        <ResultButton result='myForces' unit='kN.m' title='Myd (kN.m)'>My</ResultButton>
                    </div>
                    <div className="subtitle">Deslocamentos</div>
                    <div className="displacements">
                        <ResultButton result='uxDisplacements' unit='cm' title='ux (cm)'>ux</ResultButton>
                        <ResultButton result='uyDisplacements' unit='cm' title='uy (cm)'>uy</ResultButton>
                    </div>
                </div>
                <div className="sub-container" id="transversal-results">
                    <div className="title">Resultados da Seção Transversal</div>
                    <div className="cross-section-results">
                        <div className="subtitle">Esforços Máximos</div>
                        <div className="max">
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</ResultButton>
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>Mx</ResultButton>
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>My</ResultButton>
                        </div>
                        <div className="subtitle">Esforços Mínimos</div>
                        <div className="min">
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</ResultButton>
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>Mx</ResultButton>
                            <ResultButton result='ndForces' unit='kN' title='Nd (kN)'>My</ResultButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Results