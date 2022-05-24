import { LongitudinalResultSVG } from "./LongitudinalResultSVG";
import { TransversalResultSVG } from "./TransversalResultSVG";
import { useColumnDataContext } from "../../../hooks/useColumnDataContext";

export function ResultsSVG() {
    const { state } = useColumnDataContext();

    return(
        <>
            {state.currentResultType === 'longitudinal' ? 
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
        </>
    )
}