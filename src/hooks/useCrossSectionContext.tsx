import { useContext } from "react";
import { CrossSectionContext } from "../contexts/CrossSectionContext";

export function useCrossSectionContext() {
    const context = useContext(CrossSectionContext);
    const { rectangleList, setRectangleList, rebarList, setRebarList, state, dispatch } = context;
    return { rectangleList, setRectangleList, rebarList, setRebarList, state, dispatch };
}

