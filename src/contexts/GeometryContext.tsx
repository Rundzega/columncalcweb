import React, { createContext, ReactNode, useEffect, useState } from 'react';

export const GeometryContext = createContext({} as GeometryContextType);


type RestrictionProps = {
    label: string,
    value: boolean,
    enabled: boolean,
}

type RestrictionType = {
    ux: RestrictionProps
    uy: RestrictionProps
    uz: RestrictionProps
    rx: RestrictionProps
    ry: RestrictionProps
}

type LoadProps = {
    label: string,
    value: number,
}

type BottomLoadsType = {
    pxd: LoadProps, 
    pyd: LoadProps,
    mxd: LoadProps,
    myd: LoadProps
}


type TopLoadsType = {
    fzd: LoadProps,
    hxd: LoadProps,
    hyd: LoadProps,
    pxd: LoadProps,
    pyd: LoadProps,
    mxd: LoadProps,
    myd: LoadProps
}

type GeometryContextType = {
    length: number,
    setLength: (length: number) => void,
    bottomRestrictions: RestrictionType,
    setBottomRestrictions: (restrictions:RestrictionType) => void
    topRestrictions: RestrictionType
    setTopRestrictions: (restrictions:RestrictionType) => void
    bottomLoads: BottomLoadsType,
    setBottomLoads: (bottomLoads:BottomLoadsType) => void,
    topLoads: TopLoadsType,
    setTopLoads: (topLoads:TopLoadsType) => void,
}



type GeometryProviderProps = {
    children: ReactNode;
}


export default function GeometryProvider( props: GeometryProviderProps ) {
    const [length, setLength] = useState(0);

    const [bottomLoads, setBottomLoads] = useState<BottomLoadsType>({
        pxd: {
            label: 'pxd (kN/m)',
            value: 0,
        }, 
        pyd: {
            label: 'pyd (kN/m)',
            value: 0,
        },
        mxd: {
            label: 'Mxd (kN.m)',
            value: 0,
        },
        myd: {
            label: 'Myd (kN.m)',
            value: 0,
        },
    })

    const [topLoads, setTopLoads] = useState<TopLoadsType>({
        fzd: {
            label: 'Fzd (kN)',
            value: 0,
        }, 
        hxd: {
            label: 'Hxd (kN)',
            value: 0,
        },
        hyd: {
            label: 'Hyd (kN)',
            value: 0,
        },
        pxd: {
            label: 'pxd (kN/m)',
            value: 0,
        },
        pyd: {
            label: 'pyd (kN/m)',
            value: 0,
        },
        mxd: {
            label: 'Mxd (kN.m)',
            value: 0,
        },
        myd: {
            label: 'Myd (kN.m)',
            value: 0,
        }
    })
        

    const [bottomRestrictions, setBottomRestrictions] = useState<RestrictionType>({
        ux: {
            label: 'Ux',
            value: true,
            enabled: false
        }, 
        uy: {
            label: 'Uy',
            value: true,
            enabled: false
        }, 
        uz: {
            label: 'Uz',
            value: true,
            enabled: false
        }, 
        rx: {
            label: 'Rx',
            value: false,
            enabled: true
        }, 
        ry: {
            label: 'Ry',
            value: false,
            enabled: true
        }, 
    })



    const [topRestrictions, setTopRestrictions] = useState<RestrictionType>({
        ux: {
            label: 'Ux',
            value: false,
            enabled: true
        }, 
        uy: {
            label: 'Uy',
            value: false,
            enabled: true
        }, 
        uz: {
            label: 'Uz',
            value: true,
            enabled: true
        }, 
        rx: {
            label: 'Rx',
            value: false,
            enabled: true
        }, 
        ry: {
            label: 'Ry',
            value: false,
            enabled: true
        }, 
    })


    return (
        <GeometryContext.Provider value={{ length,
            setLength, 
            bottomLoads,
            setBottomLoads,
            topLoads,
            setTopLoads,
            bottomRestrictions,
            setBottomRestrictions,
            topRestrictions,
            setTopRestrictions }}>
                {props.children}
        </GeometryContext.Provider>


    ) 
}

