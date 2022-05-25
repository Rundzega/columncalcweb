import RemoveButton from "../../../../components/RemoveButton";
import { useColumnDataContext } from "../../../../hooks/useColumnDataContext";

export function RebarTable() {
    const { state,  dispatch } = useColumnDataContext();

    return (
        <div className="w-full text-sm justify-between flex flex-col mt-4 md:w-[calc(100%/2-0.75rem)] md:mt-0">
        <div className={state.rebarList.length > 0 ? "border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden md:max-h-[182px] outline-none ring-0" : "md:border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden md:max-h-[182px] outline-none ring-0"  }>
            <table className={state.rebarList.length > 4 ? 'text-sm block justify-between w-full max-h-full text-center rounded-2xl resize-none overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-brandGreen-300 scrollbar-track-transparent scrollbar-thin' : 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-t-2xl overflow-x-hidden'}>
                <thead>
                    <tr>
                        <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>Diâmetro</th>
                        <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>XCG</th>
                        <th className='sticky top-0 text-white bg-brandGreen-300 border-b-gray-400 border-r-gray-400 border-[0.5px] overflow-y-auto w-40 outline-none ring-0'>YCG</th>
                    </tr>
                </thead>
                <tbody>
                    {state.rebarList.map((rebar) => {
                    return(
                        <tr 
                        key = {rebar.index}
                        id = {String(rebar.index)}
                        onClick={(e) => {
                            dispatch({type:'select-element', payload:{element: e.currentTarget}})
                        }}
                        className = {rebar.isHighlighted ? 'bg-brandPurple-300 h-11 text-white cursor-pointer duration-100' : 'cursor-pointer duration-100 h-9 hover:bg-brandBlue-300 hover:h-11 hover:overflow-hidden'}
                        >
                            <td className={rebar.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rebar.diameter}</td>
                            <td className={rebar.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rebar.xCenterCoordinate}</td>
                            <td className={rebar.isHighlighted ? 'text-white w-40 border-b-gray-400 border-[0.5px] border-r-gray-400' : 'text-brandGreen-300 w-40 border-b-gray-400 border-r-gray-400 border-[0.5px]'}>{rebar.yCenterCoordinate}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div>
            <RemoveButton
                onClick={() => {
                    dispatch({type: 'remove-rebar'})
                }}
            />
        </div>
    </div>
    )
}