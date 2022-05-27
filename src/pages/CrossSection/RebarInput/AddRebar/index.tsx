import { useState } from "react"
import AddButton from "../../../../components/AddButton"
import { useColumnDataContext } from "../../../../hooks/useColumnDataContext";
import errorMsg from "../../../../utilities/errorMsg";
import handleCheckInsideRect from "../../../../utilities/handleCheckInsideRect"
import handleValidateNumber from "../../../../utilities/handleValidateNumber";

export function AddRebar() {
    const { state,  dispatch } = useColumnDataContext();
    const [rebarProps, setRebarProps] = useState({
        diameter: 5.0,
        xCoord: 0,
        yCoord: 0    
    })

    return (
        <div className="w-full h-full justify-between flex flex-col 2xl:w-[calc(100%/2-0.75rem)] ">
            <form className='flex flex-wrap justify-between' action="#" id='add-rect'>
                <div className="py-1 flex flex-col w-full justify-between pb-2">
                    <span className='ml-2 text-sm text-brandGreen-300'>Diâmetro (mm)</span>
                    <select className='cursor-pointer bg-white text-brandGreen-300 px-3 text-sm rounded-2xl border-brandGreen-300 py-1 focus:outline-none focus:border-brandPurple-300 focus:ring-0'
                        name="diameter"
                        required 
                        onChange={(e) => {
                            setRebarProps({...rebarProps, diameter:parseFloat(e.target.value)})
                        }}>
                        
                        <option value="5.0">5.0</option>
                        <option value="6.3">6.3</option>
                        <option value="8.0">8.0</option>
                        <option value="10.0">10.0</option>
                        <option value="12.5">12.5</option>
                        <option value="16.0">16.0</option>
                        <option value="20.0">20.0</option>
                        <option value="25.0">25.0</option>
                        <option value="32.0">32.0</option>
                        <option value="40.0">40.0</option>
                    </select>
                </div>
                <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. X CG (cm)</span>
                    <input 
                        type="number" 
                        required 
                        defaultValue={0}
                        onBlur={(e) => {
                            if(handleValidateNumber(e, 'A coordenada X do CG deve ser um número')) {

                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                setRebarProps({...rebarProps, xCoord:parseFloat(e.target.value)})
                                return
                            } else {
                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                            }
                            e.target.value = String(rebarProps.xCoord);
                        }}
                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                </div>
                <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. Y CG (cm)</span>
                    <input 
                        type="number" 
                        required 
                        defaultValue={0}
                        onBlur={(e) => {
                            if(handleValidateNumber(e, 'A coordenada Y do CG deve ser um número')) {

                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                setRebarProps({...rebarProps, yCoord:parseFloat(e.target.value)})
                                return
                            } else {
                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                            }
                            e.target.value = String(rebarProps.yCoord);
                        }}
                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                </div>
            </form>
            <div>
                <AddButton
                    onClick={() => {

                    if (rebarProps.diameter > 0 && !Number.isNaN(rebarProps.xCoord) && !Number.isNaN(rebarProps.yCoord)) {
                        if (handleCheckInsideRect(rebarProps, state.rebarList, state.rectangleList)) {

                            dispatch({type:'add-rebar', payload: {
                                index: state.elementCounter,
                                diameter: rebarProps.diameter,
                                xCenterCoordinate: rebarProps.xCoord,
                                yCenterCoordinate: rebarProps.yCoord,
                                isHighlighted: false,
                                isInsideRectangle: true
                            }})
                        }
                    } else {
                        errorMsg('Dados da barra inválidos')
                    }}}
                />
            </div>
        </div>
    )
}