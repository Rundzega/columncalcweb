import { useColumnDataContext } from "../../../hooks/useColumnDataContext";

export function RestrictionsInput() {

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

      return (
        <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white">
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
                  className="border-brandGreen-300  text-brandGreen-300 ring-transparent outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-brandPurple-300 disabled:text-[#cfcfcf]" 
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
                    className="border-brandGreen-300 text-brandGreen-300 ring-transparent outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-brandPurple-300 disabled:text-[#cfcfcf]" 
                    />
                    <span className="ml-1 text-brandGreen-300">{field}</span>
                  </div>
                )
              })}

            </form>
          </div>
        </div>
      )

}

