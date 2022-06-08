/* eslint-disable no-lone-blocks */
import React from "react";
import NextPageButton from "../../components/NextPageButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import { CrossSectionSVG } from "./CrossSectionSVG";
import { RectangleInput } from "./RectangleInput";
import { RebarInput } from "./RebarInput";

function CrossSection() {
  return (
    <>
      <div className="flex flex-col justify-center max-w-md 2xl:max-w-xl items-center m-auto py-6 px-9 rounded-3xl">
        <h2 className="text-white text-2xl font-bold">Seção Transversal</h2>
        <CrossSectionSVG />
        <RectangleInput />
        <RebarInput />
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
            <PreviousPageButton to="materials" />
          </div>
          <div>
            <NextPageButton to="results" />
          </div>
        </footer>
      </div>
    </>
  );
}

export default CrossSection;
