import { useColumnDataContext } from "../../../hooks/useColumnDataContext";
import handleValidateMinimum from "../../../utilities/handleValidateMinimum";

export function ConcreteInput() {
    const { state, dispatch } = useColumnDataContext();
    const { fck, gammaC, beta, alpha, phi } = state
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

    return (
        <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white">
          <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Concreto</div>
          <form className="flex flex-wrap justify-between p-2" action="#">

            {Object.entries(concreteFields).map(([field, stateProp]) => {
            
              return (
                <div key={field} className="md:w-[calc(100%/2-1.25rem)] flex flex-col -ml-5 px-2">
                  <span className="ml-2 mb-1 text-sm text-brandGreen-300">{field}</span>
                  <input
                  type="number"
                  required
                  defaultValue={stateProp.variable} 
                  onBlur={(e) => {
                    if(handleValidateMinimum(e, 1, (`${field} deve ser um número positivo`))) {

                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none" )
                      dispatch({type: 'field', fieldName:stateProp.stringName, payload: parseFloat(e.currentTarget.value)})
                    } else {
                      e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none ")
                    }
                  }}
                  disabled = {stateProp.isEnabled ? false : true}
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