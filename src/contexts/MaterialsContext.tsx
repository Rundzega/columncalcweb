import React, { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { GiConcreteBag } from 'react-icons/gi';

export const MaterialsContext = createContext({} as MaterialsContextType);


type MaterialProperty = {
    label: string,
    value: number,
    enabled: boolean
}

type ConcreteType = {
    fck: MaterialProperty,
    gammaC: MaterialProperty,
    beta: MaterialProperty,
    alpha: MaterialProperty,
    phi: MaterialProperty
}

type SteelType = {
    fyk: MaterialProperty,
    gammaS: MaterialProperty,
    es: MaterialProperty,
    esu: MaterialProperty
}



type MaterialsContextType = {
    concrete: ConcreteType,
    setConcrete: (concrete: ConcreteType) => void,
    steel: SteelType,
    setSteel: (steel: SteelType) => void
}

type MaterialsProviderProps = {
    children: ReactNode;
}


type State = {
    concrete: ConcreteType,
    steel: SteelType,
}



export default function MaterialsProvider( props: MaterialsProviderProps ) {


    const [concrete, setConcrete] = useState<ConcreteType>({
        fck: {
            label: 'fck (MPa)',
            value: 25.0,
            enabled: true
        }, 
        gammaC: {
            label: 'γc',
            value: 1.4,
            enabled: true
        }, 
        beta: {
            label: 'β',
            value: 0.85,
            enabled: false
        }, 
        alpha: {
            label: 'α',
            value: 1.1,
            enabled: false
        }, 
        phi: {
            label: 'φ (Coef. Fluência)',
            value: 2.0,
            enabled: true
        },  
    })
    
    const [steel, setSteel] = useState<SteelType>({
        fyk: {
            label: 'fyk (MPa)',
            value: 500,
            enabled: true
        },
        gammaS: {
            label: 'γs',
            value: 1.15,
            enabled: true
        },
        es: {
            label: 'Es (MPa)',
            value: 200000,
            enabled: false
        },
        esu: {
            label: 'εsu',
            value: 0.01,
            enabled: false
        },
    
    })

    return (
        <MaterialsContext.Provider value = {{ concrete, setConcrete, steel, setSteel }}>
            {props.children}
        </MaterialsContext.Provider>
    )
}
