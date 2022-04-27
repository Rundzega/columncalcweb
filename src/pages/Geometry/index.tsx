import React from "react";
import "../../styles/geometry.scss";

import ValidateButton from "../../components/ValidateButton";
import handleValidatePositive from "../../utilities/handleValidatePositive";
import { useGeometryContext } from "../../hooks/useGeometryContext";
import handleValidateNumber from "../../utilities/handleValidateNumber";

const columnImg = require("../../assets/images/columnImg.png");

function Geometry() {

  const { length, setLength, bottomLoads, setBottomLoads, topLoads, setTopLoads, bottomRestrictions, setBottomRestrictions, topRestrictions, setTopRestrictions } = useGeometryContext();


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
              defaultValue={length}           
              onBlur={(e) => {
                if(handleValidatePositive(e, 'Comprimento deve ser um número positivo')) {
                  setLength(parseFloat(e.target.value))
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

              {Object.values(bottomRestrictions).map( (restriction, index) => {

                return(
                  <div key = {restriction.label} className="input-box">
                    <input 
                      type="checkbox"
                      defaultChecked = {restriction.value ? true : false}
                      onChange = {(e) => {
                        const key = (Object.keys(bottomRestrictions)[index])

                        setBottomRestrictions({
                          ...bottomRestrictions, [key]:{
                            label: restriction.label,
                            value: e.target.checked ? true : false,
                            enabled: restriction.enabled
                          }
                        })
                      }}
                      disabled = {restriction.enabled ? false : true}
                      />
                      <span>{restriction.label}</span>
                  </div>
                )
              })}

            </form>
            <div className="subtitle">Topo</div>
            <form action="#">
              {Object.values(topRestrictions).map( (restriction, index) => {

                return(
                  <div key = {restriction.label} className="input-box">
                    <input 
                      type="checkbox"
                      defaultChecked = {restriction.value ? true : false}
                      onChange = {(e) => {
                        const key = Object.keys(topRestrictions)[index]

                        setTopRestrictions({
                          ...topRestrictions, [key]:{
                           
                            label: restriction.label,
                            value: e.target.checked ? true : false,
                            enabled: restriction.enabled
                          }
                        })
                      }}
                      disabled = {restriction.enabled ? false : true}
                    />
                    <span>{restriction.label}</span>
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
              {Object.values(bottomLoads).map((load, index) => {

                return(
                  <div key = { load.label } className="input-box-loads">
                    <span>{load.label}</span>
                    <input
                     type="number" 
                     required
                     defaultValue={load.value}
                     onBlur={(e) => {
                       
                      const key = (Object.keys(bottomLoads)[index])
                      if (handleValidateNumber(e, (`${load.label}` + ' deve ser um número'))) {
                      

                        setBottomLoads({
                          ...bottomLoads, [key]:{
                            label: load.label,
                            value: parseFloat(e.target.value)
                          }
                        })
                      }
                    }}
                    />
                  </div>
                )
              })}
            </form>
            <div className="subtitle">Topo</div>
            <form action="#">
              {Object.values(topLoads).map((load, index) => {

                return(
                  <div key = { load.label } className="input-box-loads">
                    <span>{load.label}</span>
                    <input
                     type="number" 
                     required
                     defaultValue={load.value}
                     onBlur={(e) => {

                      if (handleValidateNumber(e, (`${load.label}` + ' deve ser um número'))) {
                      
                        const key = (Object.keys(topLoads)[index])

                        setTopLoads({
                          ...topLoads, [key]:{
                            label: load.label,
                            value: parseFloat(e.target.value)
                          }
                        })
                      }
                    }}
                    />
                  </div>
                )
              })}
            </form>
          </div>
        </div>
        <div className="submit-button">
          <ValidateButton />
        </div>
      </div>
    </>
  );
}

export default Geometry;
