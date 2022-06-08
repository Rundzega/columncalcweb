import CalculateButton from "../../components/CalculateButton";
import PreviousPageButton from "../../components/PreviousPageButton";
import NextPageButton from "../../components/NextPageButton";
import { ResultsSVG } from "./ResultsSVG";
import { LongitudinalResults } from "./LongitudinalResults";
import { TransversalResults } from "./TransversalResults";

function Results() {
  return (
    <>
      <div className="flex flex-col justify-center max-w-md 2xl:max-w-xl items-center m-auto py-6 px-9 rounded-3xl">
        <h2 className="text-white text-2xl font-bold">Resultados</h2>
        <div className="bg-[#82af7a] p-0 m-0 w-full sticky top-20 z-30 rounded-b-2xl">
          <ResultsSVG />
        </div>
        <div className="w-full mb-3">
          <CalculateButton />
        </div>
        <LongitudinalResults />
        <TransversalResults />
        <footer className="w-full flex flex-row justify-between items-center">
          <div>
            <PreviousPageButton to="cross-section" />
          </div>
          <div>
            <NextPageButton to="#" disabled />
          </div>
        </footer>
      </div>
    </>
  );
}

export default Results;
