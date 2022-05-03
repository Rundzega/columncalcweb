import { IInputAction } from "./IInputAction";
import { IInputState } from "./IInputState";

export interface IReducerContextType  {
    state: IInputState,
    dispatch: React.Dispatch<IInputAction>
}