import { useColumnDataContext } from '../../../../hooks/useColumnDataContext';
import { ILongitudinalButton } from '../../../../interfaces/ILongitudinalButton';

export function LongitudinalResultButton({...props}: ILongitudinalButton) {

    const { state, dispatch } = useColumnDataContext();

    return (
        <div>
            <button 
            className='w-full mt-3 appearance-none bg-[#2ea44f] rounded-[66px] text-white text-sm font-semibold px-14 py-3 relative hover:bg-[#2c974b] focus:outline-none focus:ring-2 focus:ring-brandPurple-300 disabled:bg-[#2c974b] disabled:opacity-50 disabled:text-opacity-50 disabled:cursor-default duration-200'
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

