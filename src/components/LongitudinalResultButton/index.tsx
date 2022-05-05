import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { ILongitudinalButton } from '../../interfaces/ILongitudinalButton';
import '../../styles/results-button.scss'

export function LongitudinalResultButton({...props}: ILongitudinalButton) {

    const { state, dispatch } = useColumnDataContext();

    return (
        <div>
            <button 
            className="result-button" 
            onClick={() => {
                dispatch({ type: 'display-longitudinal-results', payload:{
                    title: props.title,
                    result: props.result,
                    unit: props.unit
                }})

            }}
            disabled = {!state.results.isResultsAvailable}
            {...props} />
            
        </div>
    );
}

