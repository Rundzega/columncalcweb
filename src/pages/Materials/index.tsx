import React from "react";
import '../../styles/materials.scss'

import { useMaterialsContext } from "../../hooks/useMaterialsContext";
import handleValidatePositive from "../../utilities/handleValidatePositive";

const concImg = require("../../assets/images/concreteImgCrop.png");
const steelImg = require("../../assets/images/steelImgCrop.png");



function Materials() {


  const { concrete, setConcrete, steel, setSteel } = useMaterialsContext();

  return (
    <>
      <div id="materials-container">
        <h2>Materiais</h2>
        <img src={concImg} alt="Imagem concreto" />
        <div className="sub-container">
          <div className="title">Concreto</div>
          <form action="#">

            {Object.values(concrete).map((property, index) => {

              return (
                <div key={property.label} className="input-box">
                  <span>{property.label}</span>
                  <input
                  type="number"
                  required
                  defaultValue={property.value} 
                  onBlur={(e) => {
                    if(handleValidatePositive(e, (`${property.label}` + 'deve ser um número positivo'))) {
                      const key = Object.keys(concrete)[index]

                      setConcrete({
                        ...concrete, [key]:{
                          label: property.label,
                          value: parseFloat(e.target.value),
                          enabled: property.enabled
                        }
                      })
                    }
                  }}
                  disabled = {property.enabled ? false : true}
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
            {Object.values(steel).map((property, index) => {

              return (
                <div key={property.label} className="input-box">
                  <span>{property.label}</span>
                  <input
                  type="number"
                  required
                  defaultValue={property.value} 
                  onBlur={(e) => {
                    if(handleValidatePositive(e, (`${property.label}` + 'deve ser um número positivo'))) {
                      const key = Object.keys(steel)[index]

                      setSteel({
                        ...steel, [key]:{
                          label: property.label,
                          value: parseFloat(e.target.value),
                          enabled: property.enabled
                        }
                      })
                    }
                  }}
                  disabled = {property.enabled ? false : true}
                  min = "0" 
                  />
                </div>
              )
            })}
          </form>
        </div>
      </div>
    </>
  );
}

export default Materials;
