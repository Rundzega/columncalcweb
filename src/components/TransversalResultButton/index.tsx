import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { ITransversalButton } from '../../interfaces/ITransversalButton';
import '../../styles/results-button.scss'

export function TransversalResultsButton({...props}: ITransversalButton) {

    const { state, dispatch } = useColumnDataContext();

    return (
        <div>
            <button 
            className="result-button" 
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

