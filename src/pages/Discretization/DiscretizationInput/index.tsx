import { useColumnDataContext } from "../../../hooks/useColumnDataContext";
import handleValidateMinimum from "../../../utilities/handleValidateMinimum";

export function DiscretizationInput() {
    const { state, dispatch } = useColumnDataContext();
    const {
            finiteElements,
            xDiscretizations,
            yDiscretizations,
            diagramPoints,
            loadIncrements,
            maxIterationsPerIncrement,
            displacementTolerance,
            forcesTolerance,
            neutralAxisTolerance } = state

    const discretizationFields = {
        "Número de elementos finitos": {
            value: finiteElements,
            stringName: 'finiteElements',
        },
        "Número de elementos discretizados X(Retângulo)": {
            value: xDiscretizations,
            stringName: 'xDiscretizations'
        },
        "Número de elementos discretizados Y(Retângulo)": {
            value: yDiscretizations,
            stringName: 'yDiscretizations'
        },
        "Número de pontos do Diagrama Nd - Mx - My": {
            value: diagramPoints,
            stringName: 'diagramPoints'
        },
        "Número de incrementos de carga": {
            value: loadIncrements,
            stringName: 'loadIncrements'
        },
        "Número máximo de iterações por incremento:": {
            value: maxIterationsPerIncrement,
            stringName: 'maxIterationsPerIncrement'
        },
        "Tolerância de deslocamentos Δu/u": {
            value: displacementTolerance,
            stringName: 'displacementTolerance'
        },
        "Tolerância de forças δF/F": {
            value: forcesTolerance,
            stringName: 'forcesTolerance'
        },
        "Tolerância profundidade da Linha Neutra": {
            value: neutralAxisTolerance,
            stringName: 'neutralAxisTolerance'
        }
    }

    return(
        <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Critérios</div>
            <form className="flex flex-col justify-between p-2" action="#">
                
            {Object.entries(discretizationFields).map(([field, stateProp]) => {
            
            return (
                <div key={field} className="w-[calc(100%/2 - 1.25rem)] flex flex-col -ml-5 px-2">
                    <span className='ml-2 text-sm text-brandGreen-300 mb-1'>{field}</span>
                    <input
                    type="number"
                    required
                    defaultValue={stateProp.value} 
                    onBlur={(e) => {
                    const minValue = stateProp.stringName === 'diagramPoints' ? 45 : 0
                    
                    if(handleValidateMinimum(e, minValue, (`${field} deve ser um número maior do que ${minValue}`))) {
                        
                        e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none" )
                        dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    } else {
                        e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none ")
                    }
                    }}
                    min = "0" 
                    onWheel={(e) => {
                        e.currentTarget.blur()
                      }}
                    className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none" 
                    />
                </div>
                )
            })}
            </form>
        </div>
    )
}