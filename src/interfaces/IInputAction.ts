import { IRebar } from "./IRebar";
import { IRebarList } from "./IRebarList";
import { IRectangle } from "./IRectangle";
import { IRectangleList } from "./IRectangleList";

export type IInputAction  =
    | { type: 'field'; fieldName: string, payload: boolean }
    | { type: 'field'; fieldName: string, payload: number }
    | { type: 'add-rectangle'; payload: IRectangle }
    | { type: 'add-rebar'; payload: IRebar }
    | { type: 'remove-rebar' | 'remove-rectangle' }
    | { type: 'update-rect-rebar-list'; payload: {rectangleList: IRectangleList, rebarList: IRebarList} }
    | { type: 'select-element'; payload: {element: SVGCircleElement | SVGRectElement | EventTarget & HTMLTableRowElement} }

