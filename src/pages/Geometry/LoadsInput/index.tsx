import { useColumnDataContext } from "../../../hooks/useColumnDataContext";
import handleValidateNumber from "../../../utilities/handleValidateNumber";

export function LoadsInput() {
    const { state, dispatch } = useColumnDataContext();
    const { 
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
        <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="w-full">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Cargas</div>
            <div className="text-base text-brandGreen-300 mt-4 font-semibold">Base</div>
            <form className="flex flex-wrap justify-between p-2" action="#">

              {Object.entries(bottomLoadsField).map(([field, stateProp]) => {
                
                return (
                  <div key={field} className="md:w-[calc(100%/2-1.25rem)] flex flex-col -ml-2 py-1">
                    <span className="ml-2 text-sm text-brandGreen-300">{field}</span>
                    <input
                    type="number"
                    required
                    defaultValue={stateProp.value} 
                    onBlur={(e) => {
                      if(handleValidateNumber(e, (`${field} deve ser um número positivo`))) {
                        
                        e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                        dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                      } else {
                        e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                      }
                    }}
                    disabled = {stateProp.isEnabled ? false : true}
                    min = "0" 
                    onWheel={(e) => {
                      e.currentTarget.blur()
                    }}
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
                    <div key={field} className="md:w-[calc(100%/2-1.25rem)] flex flex-col -ml-2 py-1">
                      <span className="ml-2 text-sm text-brandGreen-300">{field}</span>
                      <input
                      type="number"
                      required
                      defaultValue={stateProp.value} 
                      onBlur={(e) => {
                        if(handleValidateNumber(e, (`${field} deve ser um número positivo`))) {
                          
                          e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                          dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                        } else {
                          e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                        }
                      }}
                      disabled = {stateProp.isEnabled ? false : true}
                      min = "0" 
                      onWheel={(e) => {
                        e.currentTarget.blur()
                      }}
                      className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none"
                      />
                    </div>
                  )
                })}

            </form>
          </div>
        </div>
      )
}