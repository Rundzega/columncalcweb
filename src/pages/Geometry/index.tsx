import React from "react";
import "../../styles/geometry.scss";

import handleValidateMinimum from "../../utilities/handleValidateMinimum";
import handleValidateNumber from "../../utilities/handleValidateNumber";
import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { Link } from "react-router-dom";
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
      <div id="geometry-container">
        <h2>Geometria e Cargas</h2>
        <img src={columnImg} alt="Imagem do pilar" />

        <div className="sub-container">
          <div className="title-container">
            <div className="title">Dados de entrada</div>
          </div>
          <div className="input-box-length">
            <div className="subtitle">Comprimento (cm)</div>
            <input 
              id="length"
              type="number" 
              required
              defaultValue={ state.length }           
              onBlur={(e) => {
                if(handleValidateMinimum(e, 1, 'Comprimento deve ser um número positivo')) {
                  dispatch({type: 'field', fieldName: 'length', payload: parseFloat(e.target.value)})
                }
              }}
              min="0"
        />
          </div>
        </div>

        <div className="sub-container">
          <div className="restrictions-input">
            <div className="title">Restrições</div>

            <div className="subtitle">Base</div>
            <form action="#">

              {Object.entries(bottomRestrictionsField).map(([field, stateProp]) => {
              
              return (
                <div key={field} className="input-box">
                  <input
                  type="checkbox"
                  required
                  defaultChecked={stateProp.value} 
                  onChange={(e) => {
                    
                    dispatch({type: 'field', fieldName:stateProp.stringName, payload: e.target.checked})}
                  }
                  disabled = {stateProp.isEnabled ? false : true}
                  min = "0" 
                  />
                  <span>{field}</span>
                </div>
              )
            })}

            </form>
            <div className="subtitle">Topo</div>
            <form action="#">

              {Object.entries(topRestrictionsField).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="input-box">
                    <input
                    type="checkbox"
                    required
                    defaultChecked={stateProp.value} 
                    onChange={(e) => {
                      
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: e.target.checked})}
                    }
                    disabled = {stateProp.isEnabled ? false : true}
                    min = "0" 
                    />
                    <span>{field}</span>
                  </div>
                )
              })}

            </form>
          </div>
        </div>
        <div className="sub-container">
          <div className="loads-input">
            <div className="title">Cargas</div>
            <div className="subtitle">Base</div>
            <form action="#">

              {Object.entries(bottomLoadsField).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="input-box-loads">
                    <span>{field}</span>
                    <input
                    type="number"
                    required
                    defaultValue={stateProp.value} 
                    onBlur={(e) => {
                      if(handleValidateNumber(e, (`${field}` + 'deve ser um número positivo'))) {
                        
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
            <div className="subtitle">Topo</div>
            <form action="#">

              {Object.entries(topLoadsField).map(([field, stateProp]) => {
                  
                  return (
                    <div key={field} className="input-box-loads">
                      <span>{field}</span>
                      <input
                      type="number"
                      required
                      defaultValue={stateProp.value} 
                      onBlur={(e) => {
                        if(handleValidateNumber(e, (`${field}` + 'deve ser um número positivo'))) {
                          
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
        </div>
        <footer className="navigation-buttons">
          <div className="nav-button">
              <PreviousPageButton disabled to='' />
          </div>
          <div className="nav-button">
              <NextPageButton to='materials'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Geometry;
