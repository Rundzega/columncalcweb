import { useContext } from "react";
import { GeometryContext } from "../contexts/GeometryContext";

export function useGeometryContext() {
    const context = useContext(GeometryContext);
    const { length, setLength, bottomLoads, setBottomLoads, topLoads, setTopLoads, bottomRestrictions, setBottomRestrictions, topRestrictions, setTopRestrictions } = context;
    return { length, setLength, bottomLoads, setBottomLoads, topLoads, setTopLoads, bottomRestrictions, setBottomRestrictions, topRestrictions, setTopRestrictions };
}

