import React from "react";

import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { RestrictionsInput } from "./RestrictionsInput";
import { LoadsInput } from "./LoadsInput";
import { LengthInput } from "./LengthInput";
import column from "../../assets/images/columnImg.svg"

// 

function Geometry() {
  return (
    <>
      <div className="flex flex-col justify-center max-w-md 2xl:max-w-xl items-center m-auto py-6 px-9 rounded-3xl" >
        <h2 className="text-white text-2xl font-bold">Geometria e Cargas</h2>
        <div className="bg-[#82af7a] sticky top-20 z-30 rounded-b-2xl">
          <img className="w-full h-[90%] rounded-2xl border-brandPurple-300 border-2 mt-2" src={column} alt="Imagem do pilar" />
        </div>
        <LengthInput/>
        <RestrictionsInput />
        <LoadsInput />
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
              <PreviousPageButton disabled to='' />
          </div>
          <div>
              <NextPageButton to='materials'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Geometry;
