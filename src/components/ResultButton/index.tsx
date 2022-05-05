import { ButtonHTMLAttributes } from 'react';
import { useColumnDataContext } from '../../hooks/useColumnDataContext';
import { IButtonProps } from '../../interfaces/IButtonProps';
import '../../styles/results-button.scss'

export function ResultButton({...props}: IButtonProps) {

    const { state, dispatch } = useColumnDataContext();

    return (
        <div>
            <button 
            className="result-button" 
            onClick={() => {
                console.log('aqui')
                dispatch({ type: 'display-results', payload:{
                    title: props.title,
                    result: props.result,
                    unit: props.unit
                }})

                console.log(state)
            }}
            {...props} />
            
        </div>
    );
}

