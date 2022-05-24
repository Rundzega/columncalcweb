import { AddRebar } from "./AddRebar";
import { RebarTable } from "./RebarTable";

export function RebarInput() {
    return (
        <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
            <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Adicionar Barra</div>
            <div className="flex flex-col justify-between items-stretch h-full md:flex-row">
                <AddRebar />    
                <RebarTable />
            </div>
        </div>
    )
}