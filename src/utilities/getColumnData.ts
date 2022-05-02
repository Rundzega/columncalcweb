import React from 'react'
import { InputState } from '../contexts/ReducerContext';
import { useReducerContext } from '../hooks/useReducerContext'


export const getColumnData = (data:InputState) => {
    return {
        "Length": data.length,
        "Concrete": {
            "fck": data.fck,
            "gammaConc": data.gammaC,
            "alpha": data.alpha,
            "beta": data.beta,
            "creepCoefficient": data.phi
        },
        "Steel": {
            "fyk": data.fyk,
            "gammaSteel": data.gammaS,
            "youngModulus": data.es,
            "yieldStrain": data.esu
        },
        "BottomRestrictions": {
            "ux": data.uxRestrictionBottom,
            "uy": data.uyRestrictionBottom,
            "uz": data.uzRestrictionBottom,
            "rx": data.rxRestrictionBottom,
            "ry": data.ryRestrictionBottom
        },
        "TopRestrictions": {
            "ux": data.uxRestrictionTop,
            "uy": data.uyRestrictionTop,
            "uz": data.uzRestrictionTop,
            "rx": data.rxRestrictionTop,
            "ry": data.ryRestrictionTop
        },
        "BottomLoads": {
            "px": data.pxdBottomLoad,
            "py": data.pydBottomLoad,
            "mx": data.mxdBottomLoad,
            "my": data.mydBottomLoad
        },
        "TopLoads": {
            "fz": data.fzdTopLoad,
            "hx": data.hxdTopLoad,
            "hy": data.hydTopLoad,
            "px": data.pxdTopLoad,
            "py": data.pydTopLoad,
            "mx": data.mxdTopLoad,
            "my": data.mydTopLoad
        },
        "Criteria": {
            "finiteElementsNumber": data.finiteElements,
            "xDiscretizationsNumber": data.xDiscretizations,
            "yDiscretizationsNumber": data.yDiscretizations,
            "diagramPointsNumber": data.diagramPoints,
            "loadIncrementsNumber": data.loadIncrements,
            "maxIterationsPerIncrement": data.maxIterationsPerIncrement,
            "displacementsTolerance": data.displacementTolerance,
            "forcesTolerance": data.forcesTolerance,
            "neutralAxisDepthTolerance": data.neutralAxisTolerance
        },
        "RebarList": 
            data.rebarList.map((rebar) => {
                return {
                    "concreteClass": {
                        "fck": data.fck,
                        "gammaConc": data.gammaC,
                        "alpha": data.alpha,
                        "beta": data.beta,
                        "creepCoefficient": data.phi
                    },
                    "steelClass": {
                        "fyk": data.fyk,
                        "gammaSteel": data.gammaS,
                        "youngModulus": data.es,
                        "yieldStrain": data.esu
                    },
                    "diameter": rebar.diameter,
                    "xCoord": rebar.xCenterCoordinate,
                    "yCoord": rebar.yCenterCoordinate
                }
            }),
        "RectangleList": 
            data.rectangleList.map((rectangle) => {
                return {
                    "width": rectangle.width,
                    "height": rectangle.height,
                    "xCenterCoord": rectangle.xCenterCoordinate,
                    "yCenterCoord": rectangle.yCenterCoordinate
                }
            })
        }
    } 