import { ButtonHTMLAttributes } from 'react';
import '../../styles/results-button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    result?: Object;
};

export function ResultButton({...props}: ButtonProps) {
    return (
        <div>
            <button 
            className="result-button" 
            {...props} />
        </div>
    );
}

