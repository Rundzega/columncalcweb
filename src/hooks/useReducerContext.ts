import { useContext } from 'react';
import { ColumnDataContext } from '../contexts/ColumnDataContext';

export function useColumnDataContext() {
    const context = useContext(ColumnDataContext);
    const { state, dispatch } = context
    return { state, dispatch };
}