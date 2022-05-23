import React from "react";

import handleValidateMinimum from "../../utilities/handleValidateMinimum";
import handleValidateNumber from "../../utilities/handleValidateNumber";
import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { useColumnDataContext } from "../../hooks/useColumnDataContext";

const columnImg = require("../../assets/images/columnImg.png");

function Geometry() {

  // const { length, setLength, bottomLoads, setBottomLoads, topLoads, setTopLoads, bottomRestrictions, setBottomRestrictions, topRestrictions, setTopRestrictions } = useGeometryContext();

  const { state, dispatch } = useColumnDataContext();

  const { 
    uxRestrictionBottom,
    uyRestrictionBottom,
    uzRestrictionBottom,
    rxRestrictionBottom,
    ryRestrictionBottom,
    uxRestrictionTop,
    uyRestrictionTop,
    uzRestrictionTop,
    rxRestrictionTop,
    ryRestrictionTop,
    pxdBottomLoad,
    pydBottomLoad,
    mxdBottomLoad,
    mydBottomLoad,
    fzdTopLoad,
    hxdTopLoad,
    hydTopLoad,
    pxdTopLoad,
    pydTopLoad,
    mxdTopLoad,
    mydTopLoad,
    } = state;

  const bottomRestrictionsField = {
    "Ux" : {
      value: uxRestrictionBottom,
      stringName: 'uxRestrictionBottom',
      isEnabled: false
    },
    "Uy" : {
      value: uyRestrictionBottom,
      stringName: 'uyRestrictionBottom',
      isEnabled: false
    },
    "Uz" : {
      value: uzRestrictionBottom,
      stringName: 'uzRestrictionBottom',
      isEnabled: false
    },
    "Rx" : {
      value: rxRestrictionBottom,
      stringName: 'rxRestrictionBottom',
      isEnabled: true
    },
    "Ry" : {
      value: ryRestrictionBottom,
      stringName: 'ryRestrictionBottom',
      isEnabled: true
    },
  }

  const topRestrictionsField = {
    "Ux" : {
      value: uxRestrictionTop,
      stringName: 'uxRestrictionTop',
      isEnabled: true
    },
    "Uy" : {
      value: uyRestrictionTop,
      stringName: 'uyRestrictionTop',
      isEnabled: true
    },
    "Uz" : {
      value: uzRestrictionTop,
      stringName: 'uzRestrictionTop',
      isEnabled: true
    },
    "Rx" : {
      value: rxRestrictionTop,
      stringName: 'rxRestrictionTop',
      isEnabled: true
    },
    "Ry" : {
      value: ryRestrictionTop,
      stringName: 'ryRestrictionTop',
      isEnabled: true
    },
  }


  const bottomLoadsField = {
    "pxd (kN/m)" : {
      value: pxdBottomLoad,
      stringName: 'pxdBottomLoad',
      isEnabled: true
    },
    "pyd (kN/m)" : {
      value: pydBottomLoad,
      stringName: 'pydBottomLoad',
      isEnabled: true
    },
    "Mxd (kN.m)" : {
      value: mxdBottomLoad,
      stringName: 'mxdBottomLoad',
      isEnabled: true
    },
    "Myd (kN.m)" : {
      value: mydBottomLoad,
      stringName: 'mydBottomLoad',
      isEnabled: true
    }
  }

  const topLoadsField = {
    "Fzd (kN)" : {
      value: fzdTopLoad,
      stringName: 'fzdTopLoad',
      isEnabled: true
    },
    "Hxd (kN)" : {
      value: hxdTopLoad,
      stringName: 'hxdTopLoad',
      isEnabled: true
    },
    "Hyd (kN)" : {
      value: hydTopLoad,
      stringName: 'hydTopLoad',
      isEnabled: true
    },
    "pxd (kN/m)" : {
      value: pxdTopLoad,
      stringName: 'pxdTopLoad',
      isEnabled: true
    },
    "pyd (kN/m)" : {
      value: pydTopLoad,
      stringName: 'pydTopLoad',
      isEnabled: true
    },
    "Mxd (kN.m)" : {
      value: mxdTopLoad,
      stringName: 'mxdTopLoad',
      isEnabled: true
    },
    "Myd (kN.m)" : {
      value: mydTopLoad,
      stringName: 'mydTopLoad',
      isEnabled: true
    }
  }
  

  return (
    <>
      <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl" >
        <h2 className="text-brandPurple-300 text-2xl font-bold">Geometria e Cargas</h2>
        <img className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300" src={columnImg} alt="Imagem do pilar" />

        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="w-full">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Dados de entrada</div>
          </div>
          <div className="flex flex-col w-full p-2 -ml-2">
            <div className="text-sm text-brandGreen-300 ml-2">Comprimento (cm)</div>
            <input 
              id="length"
              type="number" 
              required
              defaultValue={ state.length }           
              onBlur={(e) => {
                if(handleValidateMinimum(e, 1, 'Comprimento deve ser um número positivo')) {

                  e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                  dispatch({type: 'field', fieldName: 'length', payload: parseFloat(e.target.value)})
                } else {
                  e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                }
              }}
              min="0"
              className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" 
        />
          </div>
        </div>

        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="w-full">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Restrições</div>

            <div className="text-base text-brandGreen-300 mt-4 font-semibold">Base</div>
            <form className="flex flex-wrap justify-between p-2 mb-2 -mt-2" action="#">

              {Object.entries(bottomRestrictionsField).map(([field, stateProp]) => {
              
              return (
                <div key={field} className="py-2">
                  <input
                  type="checkbox"
                  required
                  defaultChecked={stateProp.value} 
                  onChange={(e) => {
                    
                    dispatch({type: 'field', fieldName:stateProp.stringName, payload: e.target.checked})}
                  }
                  disabled = {stateProp.isEnabled ? false : true}
                  className="border-brandGreen-300  text-brandGreen-300 ring-transparent outline-none rounded-md focus:outline-none focus:ring-transparent disabled:text-[#cfcfcf]" 
                  />
                  <span className="ml-1 text-brandGreen-300">{field}</span>
                </div>
              )
            })}

            </form>
            <div className="text-base text-brandGreen-300 font-semibold">Topo</div>
            <form className="flex flex-wrap justify-between p-2 -mt-2" action="#">

              {Object.entries(topRestrictionsField).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="py-2">
                    <input
                    type="checkbox"
                    required
                    defaultChecked={stateProp.value} 
                    onChange={(e) => {
                      
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: e.target.checked})}
                    }
                    disabled = {stateProp.isEnabled ? false : true}
                    className="border-brandGreen-300 text-brandGreen-300 ring-transparent outline-none rounded-md focus:outline-none focus:ring-transparent disabled:text-[#cfcfcf]" 
                    />
                    <span className="ml-1 text-brandGreen-300">{field}</span>
                  </div>
                )
              })}

            </form>
          </div>
        </div>
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="w-full">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Cargas</div>
            <div className="text-base text-brandGreen-300 mt-4 font-semibold">Base</div>
            <form className="flex flex-wrap justify-between p-2" action="#">

              {Object.entries(bottomLoadsField).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="w-[calc(100%/2 - 1.25rem)] flex flex-col -ml-2 py-1">
                    <span className="ml-2 text-sm text-brandGreen-300">{field}</span>
                    <input
                    type="number"
                    required
                    defaultValue={stateProp.value} 
                    onBlur={(e) => {
                      if(handleValidateNumber(e, (`${field}` + 'deve ser um número positivo'))) {
                        
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
            <div className="text-base text-brandGreen-300 font-semibold">Topo</div>
            <form className="flex flex-wrap justify-between p-2" action="#">

              {Object.entries(topLoadsField).map(([field, stateProp]) => {
                  
                  return (
                    <div key={field} className="w-[calc(100%/2 - 1.25rem)] flex flex-col -ml-2 py-1">
                      <span className="ml-2 text-sm text-brandGreen-300">{field}</span>
                      <input
                      type="number"
                      required
                      defaultValue={stateProp.value} 
                      onBlur={(e) => {
                        if(handleValidateNumber(e, (`${field}` + 'deve ser um número positivo'))) {
                          
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
        </div>
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
              <PreviousPageButton disabled to='' />
          </div>
          <div>
              <NextPageButton to='materials'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Geometry;
