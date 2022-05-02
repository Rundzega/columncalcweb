import { useContext } from 'react';
import { ReducerContext } from '../contexts/ReducerContext';

export function useReducerContext() {
    const context = useContext(ReducerContext);
    const { state, dispatch } = context
    return { state, dispatch };
}