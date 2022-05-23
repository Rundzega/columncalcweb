import React from "react";

import handleValidateMinimum from "../../utilities/handleValidateMinimum";

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
      isEnabled: true,
    },
    "γc" : {
      variable: gammaC,
      stringName: 'gammaC',
      isEnabled: true,
    },
    "β" : {
      variable: beta,
      stringName: 'beta',
      isEnabled: false,
    },
    "α" : {
      variable: alpha,
      stringName: 'alpha',
      isEnabled: false,
    },
    "φ (Coef. Fluência)" : {
      variable: phi,
      stringName: 'phi',
      isEnabled: true,
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
      <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl" >
        <h2 className="text-brandPurple-300 text-2xl font-bold">Materiais</h2>
        <img src={concImg} alt="Imagem concreto" className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300"/>
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Concreto</div>
          <form className="flex flex-wrap justify-between p-2" action="#">

            {Object.entries(concreteFields).map(([field, stateProp]) => {
            
              return (
                <div key={field} className="w-[calc(100%/2 - 1.25rem)] flex flex-col -ml-5 px-2">
                  <span className="ml-2 mb-1 text-sm text-brandGreen-300">{field}</span>
                  <input
                  type="number"
                  required
                  defaultValue={stateProp.variable} 
                  onBlur={(e) => {
                    if(handleValidateMinimum(e, 1, (`${field}` + 'deve ser um número positivo'))) {

                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    } else {
                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                    }
                  }}
                  disabled = {stateProp.isEnabled ? false : true}
                  min = "0"
                  className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" 
                  />
                </div>
              )
            })}

          </form>
        </div>
        <img src={steelImg} alt="Imagem aço" className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300" />
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Aço</div>
          <form className="flex flex-wrap justify-between p-2" action="#">

            {Object.entries(steelFields).map(([field, stateProp]) => {
              
              return (
                <div key={field} className="w-[calc(100%/2 - 1.25rem)] flex flex-col -ml-5 px-2">
                  <span className="ml-2 mb-1 text-sm text-brandGreen-300">{field}</span>
                  <input
                  type="number"
                  required
                  defaultValue={stateProp.variable} 
                  onBlur={(e) => {
                    if(handleValidateMinimum(e, 1, (`${field}` + 'deve ser um número positivo'))) {

                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    } else {
                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                    }
                  }}
                  disabled = {stateProp.isEnabled ? false : true}
                  min = "0" 
                  className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" 
                  />
                </div>
              )
            })}

          </form>
        </div>
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
            <PreviousPageButton to='geometry'  />
          </div>
          <div>
            <NextPageButton to='cross-section'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Materials;
