import { AddRectangle } from "./AddRectangle";
import { RectangleTable } from "./RectangleTable";

export function RectangleInput() {
    
    return (
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Adicionar Seção</div>
            <div className="flex flex-col justify-between items-stretch h-full md:flex-row">
                <AddRectangle />
                <RectangleTable />
            </div>
        </div>
    )
}