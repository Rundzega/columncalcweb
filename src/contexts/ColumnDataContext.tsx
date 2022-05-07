import React, { createContext, useReducer } from 'react';
import { IInputAction } from '../interfaces/IInputAction';
import { IInputState } from '../interfaces/IInputState';
import { IRebarList } from '../interfaces/IRebarList';
import { IRectangleList } from '../interfaces/IRectangleList';
import { IReducerContextType } from '../interfaces/IReducerContextProps';
import { IReducerProviderProps } from '../interfaces/IReducerProviderProps';
import Results from '../pages/Results';

export const ColumnDataContext = createContext({} as IReducerContextType);

const initialState:IInputState = {
    length: 0,
    uxRestrictionBottom: true,
    uyRestrictionBottom: true,
    uzRestrictionBottom: true,
    rxRestrictionBottom: true,
    ryRestrictionBottom: true,
    uxRestrictionTop: false,
    uyRestrictionTop: false,
    uzRestrictionTop: false,
    rxRestrictionTop: false,
    ryRestrictionTop: false,
    pxdBottomLoad: 0.0,
    pydBottomLoad: 0.0,
    mxdBottomLoad: 0.0,
    mydBottomLoad: 0.0,
    fzdTopLoad: 0.0,
    hxdTopLoad: 0.0,
    hydTopLoad: 0.0,
    pxdTopLoad: 0.0,
    pydTopLoad: 0.0,
    mxdTopLoad: 0.0,
    mydTopLoad: 0.0,
    fck: 25.0,
    gammaC: 1.4,
    beta: 0.85,
    alpha: 1.10,
    phi: 2.0,
    fyk: 500.0,
    gammaS: 1.15,
    es: 200000,
    esu: 0.01,
    elementCounter: 0,
    rectangleList: [],
    rebarList: [],
    selectedElement: null,
    finiteElements: 20,
    xDiscretizations: 20,
    yDiscretizations: 20,
    diagramPoints: 45,
    loadIncrements: 5,
    maxIterationsPerIncrement: 100,
    displacementTolerance: 0.005,
    forcesTolerance: 0.005,
    neutralAxisTolerance: 0.001,
    results: {

        isResultsAvailable: false,
        uyDisplacements: null,
        uxDisplacements: null,
        ndForces: null,
        mxForces: null,
        myForces: null,
        ndMaxResistanceDiagramPoints: null,
        ndMinResistanceDiagramPoints: null,
        mxMinResistanceDiagramPoints: null,
        mxMaxResistanceDiagramPoints: null,
        myMinResistanceDiagramPoints: null,
        myMaxResistanceDiagramPoints: null,
        anglesResistanceDiagramPoints: null,
        lengthPoints: null,
        ndMaxSolicitingForces: null,
        ndMinSolicitingForces: null,
        mxMinSolicitingForces: null,
        mxMaxSolicitingForces: null,
        myMinSolicitingForces: null,
        myMaxSolicitingForces: null,
        anglesSolicitingForces: null,
    },
    longitudinalDisplayResults: {
        result: 'ndForces',
        title: 'Nd (kN)',
        unit: 'kN'
    },
    transversalDisplayResults: {
        diagram: 'ndMaxResistanceDiagramPoints',
        forces: 'ndMaxSolicitingForces',
        title: 'NdMAX - Envoltorias'
    },
    currentResultType: "longitudinal"
    
}


function reducer(state:IInputState, action:IInputAction) {
    switch (action.type) {
        case 'field': {
            return {
                ...state, [action.fieldName as string]: action.payload, results: {...state.results, isResultsAvailable: false }
            }
        }

        case 'add-rectangle': {
            
            const newRectangleList = [...state.rectangleList, {
                index: state.elementCounter,
                width: action.payload.width,
                height: action.payload.height,
                xCenterCoordinate: action.payload.xCenterCoordinate,
                yCenterCoordinate: action.payload.yCenterCoordinate,
                isHighlighted: false
            }]    
            
            return {
                ...state, elementCounter: (state.elementCounter + 1), rectangleList: newRectangleList, results: {...state.results, isResultsAvailable: false }
            }
            
        } 
        case 'add-rebar': {
            
            const newRebarList = [...state.rebarList, {
                index: state.elementCounter,
                diameter: action.payload.diameter,
                xCenterCoordinate: action.payload.xCenterCoordinate,
                yCenterCoordinate: action.payload.yCenterCoordinate,
                isHighlighted: false,
                isInsideRectangle: true
            }]    
            
            return {
                ...state, rebarList: newRebarList, elementCounter: (state.elementCounter + 1), results: {...state.results, isResultsAvailable: false }
            }
        }

        case 'remove-rectangle': {
            
            if (state.selectedElement == null) {
                return {
                    ...state
                }
            }

            const isSelectedRectangle = state.rectangleList.filter((rectangle) => {
                return (rectangle.index == state.selectedElement)
            })

            if (isSelectedRectangle.length <= 0) {
                return {
                    ...state
                }
            }

            const rectanglesDeletedRow = state.rectangleList.filter((rectangle) => {
                return (rectangle.index != state.selectedElement)
            })
            const deletedRectangleList = state.rectangleList.filter((rectangle) => {
                return (rectangle.index == state.selectedElement)
            })
            
            const deletedRectangle = deletedRectangleList[0]
            const rectLeftVertices = deletedRectangle.xCenterCoordinate - deletedRectangle.width / 2;
            const rectRightVertices = deletedRectangle.xCenterCoordinate + deletedRectangle.width / 2;
            const rectTopVertices = deletedRectangle.yCenterCoordinate + deletedRectangle.height / 2;
            const rectBottomVertices = deletedRectangle.yCenterCoordinate - deletedRectangle.height / 2;
            const rebarListCopy = [...state.rebarList]

            rebarListCopy.forEach((rebar) => {

                const rebarLeftExtreme = rebar.xCenterCoordinate - rebar.diameter / 20;
                const rebarRightExtreme = rebar.xCenterCoordinate + rebar.diameter / 20;
                const rebarTopExtreme = rebar.yCenterCoordinate + rebar.diameter / 20;
                const rebarBottomExtreme = rebar.yCenterCoordinate - rebar.diameter / 20;

                if (rectLeftVertices <= rebarLeftExtreme &&
                    rectRightVertices >= rebarRightExtreme &&
                    rectBottomVertices <= rebarBottomExtreme &&
                    rectTopVertices >= rebarTopExtreme) {
        
                    rebar.isInsideRectangle = false
                }
            })

            const rebarListAfterDelete = rebarListCopy.filter((rebar) => {
                return (rebar.isInsideRectangle == true)
            })


            return {
                ...state, rebarList: rebarListAfterDelete, rectangleList: rectanglesDeletedRow, selectedElement: null, results: {...state.results, isResultsAvailable: false }
            }

        }

        case 'remove-rebar': {

            const rebarsDeletedRow = state.rebarList.filter((rebar) => {
                return (rebar.index != state.selectedElement)
            })

            const isSelectedRebar = state.rebarList.filter((rebar) => {
                return (rebar.index == state.selectedElement)
            })

            if (isSelectedRebar.length <= 0) {
                return {
                    ...state
                }
            }

            return {
                ...state, rebarList: rebarsDeletedRow, selectedElement: null, results: {...state.results, isResultsAvailable: false }
            }
        }        
        
        case 'update-rect-rebar-list': {
            return {
                ...state, rectangleList: action.payload.rectangleList, rebarList: action.payload.rebarList
            }
        }

        case 'select-element': {

            const rectId = state.rectangleList.filter((rectangle) => {
                return rectangle.index == parseFloat(action.payload.element.id)
            })

            const rebarId = state.rebarList.filter((rebar) => {
                return rebar.index == parseFloat(action.payload.element.id)
            })

            let newSelectedElement:number | null;
            let newRectList:IRectangleList = [...state.rectangleList]
            let newRebarList:IRebarList = [...state.rebarList]

            newSelectedElement = rectId.length > rebarId.length ? rectId[0].index : rebarId[0].index

            if (state.selectedElement == newSelectedElement) {
                newSelectedElement = null
                newRectList.map((rectangle) => {
                    rectangle.isHighlighted = false
                })
                newRebarList.map((rebar) => {
                    rebar.isHighlighted = false
                })
            } else {
                newRectList.map((rectangle) => {
                    rectangle.isHighlighted = rectangle.index == newSelectedElement ? true : false
                })
                newRebarList.map((rebar) => {
                    rebar.isHighlighted = rebar.index == newSelectedElement ? true : false
                })
            }
            

            return {
                ...state, rectangleList: newRectList, rebarList: newRebarList, selectedElement: newSelectedElement
            }
        }

        case 'update-results': {
            return {
                ...state, results: action.payload
            }
        }

        case 'display-longitudinal-results': {
            return {
                ...state, longitudinalDisplayResults: action.payload, currentResultType: "longitudinal"
            }
        }

        case 'display-transversal-results': {
            return {
                ...state, transversalDisplayResults: action.payload, currentResultType: "transversal"
            }
        }

        default: {
            return state;
        }
    }
}
export default function ColumnDataProvider( props: IReducerProviderProps ) {

    
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ColumnDataContext.Provider value = {{ state, dispatch }}>
            {props.children}
        </ColumnDataContext.Provider>
    )
}
