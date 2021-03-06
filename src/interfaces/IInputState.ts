import { IRebarList } from "./IRebarList";
import { IRectangleList } from "./IRectangleList";
import { IResults } from "./IResults";
import { ILongitudinalResultsDisplay } from "./ILongitudinalResultsDisplay";
import { ITransversalResultsDisplay } from "./ITransversalResultsDisplay";

export interface IInputState  {
    length: number,
    uxRestrictionBottom: boolean,
    uyRestrictionBottom: boolean,
    uzRestrictionBottom: boolean,
    rxRestrictionBottom: boolean,
    ryRestrictionBottom: boolean,
    uxRestrictionTop: boolean,
    uyRestrictionTop: boolean,
    uzRestrictionTop: boolean,
    rxRestrictionTop: boolean,
    ryRestrictionTop: boolean,
    pxdBottomLoad: number,
    pydBottomLoad: number,
    mxdBottomLoad: number,
    mydBottomLoad: number,
    fzdTopLoad: number,
    hxdTopLoad: number,
    hydTopLoad: number,
    pxdTopLoad: number,
    pydTopLoad: number,
    mxdTopLoad: number,
    mydTopLoad: number,
    fck: number,
    gammaC: number,
    beta: number,
    alpha: number,
    phi: number,
    fyk: number,
    gammaS: number,
    es: number,
    esu: number,
    elementCounter: number,
    rectangleList: IRectangleList,
    rebarList: IRebarList,
    selectedElement: {
        index: number | null,
        type: 'rectangle' | 'rebar' | null
    },
    finiteElements: number,
    xDiscretizations: number,
    yDiscretizations: number,
    diagramPoints: number,
    loadIncrements: number,
    maxIterationsPerIncrement: number,
    displacementTolerance: number,
    forcesTolerance: number,
    neutralAxisTolerance: number,
    results: IResults,
    longitudinalDisplayResults: ILongitudinalResultsDisplay,
    transversalDisplayResults: ITransversalResultsDisplay,
    currentResultType: string
}