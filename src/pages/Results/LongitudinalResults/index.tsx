import { LongitudinalResultButton } from "./LongitudinalResultButton";

export function LongitudinalResults() {

    return (
        <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white" id="longitudinal-results">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Resultados do Pilar</div>
            <div className="text-base text-brandGreen-300 mt-4 font-semibold">Esforços</div>     
            <div className="2xl:flex flex-row items-center justify-center p-2 gap-x-3">
                <LongitudinalResultButton result='ndForces' unit='kN' title='Nd (kN)'>Nd</LongitudinalResultButton>
                <LongitudinalResultButton result='mxForces' unit='kN.m' title='Mxd (kN.m)'>Mx</LongitudinalResultButton>
                <LongitudinalResultButton result='myForces' unit='kN.m' title='Myd (kN.m)'>My</LongitudinalResultButton>
            </div>
            <div className="text-base text-brandGreen-300 mt-4 font-semibold">Deslocamentos</div>
            <div className="2xl:flex flex-row items-center justify-center p-2 gap-x-3">
                <LongitudinalResultButton result='uxDisplacements' unit='cm' title='ux (cm)'>ux</LongitudinalResultButton>
                <LongitudinalResultButton result='uyDisplacements' unit='cm' title='uy (cm)'>uy</LongitudinalResultButton>
            </div>
        </div>
    )
}