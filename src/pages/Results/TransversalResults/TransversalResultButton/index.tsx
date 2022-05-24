import { useColumnDataContext } from '../../../../hooks/useColumnDataContext';
import { ITransversalButton } from '../../../../interfaces/ITransversalButton';

export function TransversalResultsButton({...props}: ITransversalButton) {
    const { state, dispatch } = useColumnDataContext();

    return (
        <div>
            <button 
            className="w-full mt-3 appearance-none bg-[#2ea44f] rounded-[66px] text-white cursor-pointer text-sm font-semibold relative text-center duration-200 py-3 px-14 hover:bg-[#2c974b] focus:outline-none disabled:opacity-50 disabled:cursor-default disabled:text-opacity-50" 
            onClick={() => {
                dispatch({ type: 'display-transversal-results', payload:{
                    title: props.title,
                    diagram: props.diagram,
                    forces: props.forces
                }})
            }}
            disabled = {!state.results.isResultsAvailable}
            {...props} />
        </div>
    );
}

