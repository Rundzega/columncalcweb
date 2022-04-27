import React, { createContext, ReactNode, useReducer, useState } from 'react';

export const CrossSectionContext = createContext({} as CrossSectionContextType );

type Rectangle = {
    index: number
    width: number,
    height: number,
    xCenterCoordinate: number,
    yCenterCoordinate: number,
    isHighlighted: boolean
}

export type RectangleList = Array<Rectangle>


type Rebar = {
    index: number,
    diameter: number,
    xCenterCoordinate: number,
    yCenterCoordinate: number,
    isHighlighted: boolean,
    isInsideRectangle: boolean
}

export type RebarList = Array<Rebar>

type CrossSectionProviderProps = {
    children: ReactNode
}

type CrossSectionContextType = {
    rectangleList: RectangleList,
    setRectangleList: (rectangleList: RectangleList) => void,
    rebarList: RebarList,
    setRebarList: (rebarList: RebarList) => void,
    state: State,
    dispatch: React.Dispatch<any>
}

type State = {
    rectIndex: number,
    rebarIndex: number
}

function reducer(state:State, action:any) {
    switch (action.type) {
        case 'increment-rect-index':
            return {...state, rectIndex: state.rectIndex + 1}
        case 'increment-rebar-index':
            return {...state, rebarIndex: state.rebarIndex + 1}
        default:
            return state;
    }
}

const initialState:State = {
    rectIndex: 0,
    rebarIndex: 0
}


export default function CrossSectionProvider( props: CrossSectionProviderProps ) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [rectangleList, setRectangleList] = useState<RectangleList>([])
    const [rebarList, setRebarList] = useState<RebarList>([])

    

    return(
        <CrossSectionContext.Provider value = {{ rectangleList, setRectangleList, rebarList, setRebarList, state, dispatch }}>
            {props.children}
        </CrossSectionContext.Provider>
    )

}