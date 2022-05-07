import React from "react";
import '../../styles/materials.scss'

import handleValidateMinimum from "../../utilities/handleValidateMinimum";

import { Link } from "react-router-dom";
import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { useColumnDataContext } from "../../hooks/useColumnDataContext";

const concImg = require("../../assets/images/concreteImgCrop.png");
const steelImg = require("../../assets/images/steelImgCrop.png");



function Materials() {


  const { state, dispatch } = useColumnDataContext();

  const { fck, gammaC, beta, alpha, phi, fyk, gammaS, es, esu } = state

  const concreteFields = {
    "fck (MPa)" : {
      variable: fck,
      stringName: 'fck',
      isEnabled: true
    },
    "γc" : {
      variable: gammaC,
      stringName: 'gammaC',
      isEnabled: true
    },
    "β" : {
      variable: beta,
      stringName: 'beta',
      isEnabled: false,
    },
    "α" : {
      variable: alpha,
      stringName: 'alpha',
      isEnabled: false
    },
    "φ (Coef. Fluência)" : {
      variable: phi,
      stringName: 'phi',
      isEnabled: true
    }
  }

  const steelFields = {
    "fyk (MPa)": {
      variable: fyk,
      stringName: 'fyk',
      isEnabled: true
    },
    "γs": {
      variable: gammaS,
      stringName: 'gammaS',
      isEnabled: true
    },
    "Es (MPa)": {
      variable: es,
      stringName: 'es',
      isEnabled: false
    },
    "εsu": {
      variable: esu,
      stringName: 'esu',
      isEnabled: false
    },
  }


  const steelProps = ['fyk', 'gammaS', 'es', 'esu']

  return (
    <>
      <div id="materials-container">
        <h2>Materiais</h2>
        <img src={concImg} alt="Imagem concreto" />
        <div className="sub-container">
          <div className="title">Concreto</div>
          <form action="#">

            {Object.entries(concreteFields).map(([field, stateProp]) => {
            
              return (
                <div key={field} className="input-box">
                  <span>{field}</span>
                  <input
                  type="number"
                  required
                  defaultValue={stateProp.variable} 
                  onBlur={(e) => {
                    if(handleValidateMinimum(e, 1, (`${field}` + 'deve ser um número positivo'))) {
                      
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    }
                  }}
                  disabled = {stateProp.isEnabled ? false : true}
                  min = "0" 
                  />
                </div>
              )
            })}

          </form>
        </div>
        <img src={steelImg} alt="Imagem aço" />
        <div className="sub-container">
          <div className="title">Aço</div>
          <form action="#">

            {Object.entries(steelFields).map(([field, stateProp]) => {
              
              return (
                <div key={field} className="input-box">
                  <span>{field}</span>
                  <input
                  type="number"
                  required
                  defaultValue={stateProp.variable} 
                  onBlur={(e) => {
                    if(handleValidateMinimum(e, 1, (`${field}` + 'deve ser um número positivo'))) {
                      
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    }
                  }}
                  disabled = {stateProp.isEnabled ? false : true}
                  min = "0" 
                  />
                </div>
              )
            })}

          </form>
        </div>
        <footer className="navigation-buttons">
          <div className="nav-button">
            <PreviousPageButton to='geometry'  />
          </div>
          <div className="nav-button">
            <NextPageButton to='cross-section'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Materials;
