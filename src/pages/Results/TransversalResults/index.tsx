import { TransversalResultsButton } from "./TransversalResultButton";

export function TransversalResults() {

    return(
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white" id="transversal-results">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Resultados da Seção Transversal</div>
            <div>
                <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços Máximos</div>
                <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
                    <TransversalResultsButton 
                        diagram='ndMaxResistanceDiagramPoints'
                        forces='ndMaxSolicitingForces'
                        title='NdMAX - Envoltórias'
                    >
                        Nd
                    </TransversalResultsButton>
                    <TransversalResultsButton 
                        diagram='mxMaxResistanceDiagramPoints'
                        forces='mxMaxSolicitingForces'
                        title='MxMAX - Envoltórias'
                    >
                        Mx
                    </TransversalResultsButton>
                    <TransversalResultsButton 
                        diagram='myMaxResistanceDiagramPoints'
                        forces='myMaxSolicitingForces'
                        title='MyMAX - Envoltórias'
                    >
                        My
                    </TransversalResultsButton>
                </div>
                <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços Mínimos</div>
                <div className="md:flex flex-row items-center justify-center p-2 gap-x-3">
                    <TransversalResultsButton 
                        diagram='ndMinResistanceDiagramPoints'
                        forces='ndMinSolicitingForces'
                        title='NdMIN - Envoltórias'
                    >
                        Nd
                    </TransversalResultsButton>
                    <TransversalResultsButton 
                        diagram='mxMinResistanceDiagramPoints'
                        forces='mxMinSolicitingForces'
                        title='MxMIN - Envoltórias'
                    >
                        Mx
                    </TransversalResultsButton>
                    <TransversalResultsButton 
                        diagram='myMinResistanceDiagramPoints'
                        forces='myMinSolicitingForces'
                        title='MyMIN - Envoltórias'
                    >
                        My
                    </TransversalResultsButton>
                </div>
            </div>
        </div>
    )
}