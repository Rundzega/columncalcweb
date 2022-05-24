import { useColumnDataContext } from "../../../hooks/useColumnDataContext"
import handleValidateMinimum from "../../../utilities/handleValidateMinimum"

export function LengthInput() {
    const { state, dispatch } = useColumnDataContext()

    return (
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

    )

}