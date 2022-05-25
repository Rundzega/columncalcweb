import React from "react";
import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { ConcreteInput } from "./ConcreteInput";
import { SteelInput } from "./SteelInput";

const concImg = require("../../assets/images/concreteImg.png");
const steelImg = require("../../assets/images/steelImg.png");

function Materials() {

  return (
    <>
      <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl" >
        <h2 className="text-white text-2xl font-bold">Materiais</h2>
        <img src={concImg} alt="Imagem concreto" className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300"/>
        <ConcreteInput />
        <img src={steelImg} alt="Imagem aço" className="w-full rounded-2xl mb-3 mt-3 border-brandPurple-300" />
        <SteelInput />
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
            <PreviousPageButton to=''  />
          </div>
          <div>
            <NextPageButton to='cross-section'/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Materials;
