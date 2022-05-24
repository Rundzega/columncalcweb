import React from "react";

import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { RestrictionsInput } from "./RestrictionsInput";
import { LoadsInput } from "./LoadsInput";
import { LengthInput } from "./LengthInput";

const columnImg = require("../../assets/images/columnImg.png");

function Geometry() {
  return (
    <>
      <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl" >
        <h2 className="text-brandPurple-300 text-2xl font-bold">Geometria e Cargas</h2>
        <img className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300" src={columnImg} alt="Imagem do pilar" />
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
