import RemoveButton from "../../../../components/RemoveButton";
import { useColumnDataContext } from "../../../../hooks/useColumnDataContext";

export function RectangleTable() {

    const { state,  dispatch } = useColumnDataContext();

    return (
        <div className="w-full text-sm justify-between flex flex-col mt-4 2xl:w-[calc(100%/2-0.75rem)] 2xl:mt-0">
            <div className={state.rectangleList.length > 0 ? "border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden md:max-h-[252px] outline-none ring-0" : "md:border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden md:max-h-[252px] outline-none ring-0"  }>
                <table className={state.rectangleList.length > 5 ? 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-2xl resize-none overflow-x-hidden overflow-y-scroll block scrollbar scrollbar-thumb-brandGreen-300 scrollbar-track-transparent scrollbar-thin' : 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-t-2xl overflow-x-hidden'}>
                    <thead>
                        <tr>
                            <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>Largura</th>
                            <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>Altura</th>
                            <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>XCG</th>
                            <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>YCG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.rectangleList.map((rectangle) => {
                            return(
                                <tr 
                                key = {rectangle.index}
                                id = {String(rectangle.index)}
                                onClick={(e) => {
                                    dispatch({type:'select-element', payload:{element: e.currentTarget}})
                                }}
                                className = {rectangle.isHighlighted ? 'bg-brandPurple-300 h-11 text-white cursor-pointer duration-100' : 'cursor-pointer duration-100 h-9 hover:bg-brandBlue-300 hover:h-11 hover:overflow-hidden'}>
                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rectangle.width}</td>
                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rectangle.height}</td>
                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rectangle.xCenterCoordinate}</td>
                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-b-gray-400 border-[0.5px]'}>{rectangle.yCenterCoordinate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <RemoveButton 
                    onClick={() => {
                        dispatch({type:'remove-rectangle'})
                    }}
                />
            </div>
        </div>
    )
}