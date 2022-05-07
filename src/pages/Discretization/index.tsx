import React from 'react'
import handleValidateMinimum from '../../utilities/handleValidateMinimum';
import '../../styles/discretization.scss'
import { Link } from 'react-router-dom';
import NextPageButton from '../../components/NextPageButton';
import PreviousPageButton from '../../components/PreviousPageButton';
import { useColumnDataContext } from '../../hooks/useColumnDataContext';


function Discretization() {

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
        <div id="discretization-container">
            <h2>Discretização</h2>
            <div className="sub-container">
                <div className="title">Critérios</div>
                <form action="#">
                    
                {Object.entries(discretizationFields).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="input-box">
                    <span>{field}</span>
                    <input
                    type="number"
                    required
                    defaultValue={stateProp.value} 
                    onBlur={(e) => {
                      const minValue = stateProp.stringName == 'diagramPoints' ? 45 : 0
                    
                      if(handleValidateMinimum(e, minValue, (`${field} deve ser um número mario do que ${minValue}`))) {
                        
                        dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                      }
                    }}
                    min = "0" 
                    />
                  </div>
                )
              })}

                </form>
            </div>
            <footer className="navigation-buttons">
                <div className="nav-button">
                    <PreviousPageButton to='cross-section' />
                </div>
                <div className="nav-button">
                    <NextPageButton to='results'/>
                </div>
            </footer>
        </div>
    )
}

export default Discretization