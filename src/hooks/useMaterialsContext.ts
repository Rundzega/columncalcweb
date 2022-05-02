import { useContext } from 'react';
import { MaterialsContext } from '../contexts/MaterialsContext';

export function useMaterialsContext() {
    const context = useContext(MaterialsContext);
    const { concrete, setConcrete, steel, setSteel } = context
    return { concrete, setConcrete, steel, setSteel };
}