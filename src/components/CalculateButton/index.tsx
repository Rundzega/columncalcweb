import React, { ButtonHTMLAttributes, useState } from "react";
import { Loading } from "../Loading";
import { useColumnDataContext } from "../../hooks/useColumnDataContext";
import errorMsg from "../../utilities/errorMsg";
import { Concrete } from "../../model/Concrete";
import { Steel } from "../../model/Steel";
import { BottomNodalLoads } from "../../model/BottomNodalLoads";
import { NodalRestrictions } from "../../model/NodalRestrictions";
import { TopNodalLoads } from "../../model/TopNodalLoads";
import { Criteria } from "../../model/Criteria";
import { Rebar } from "../../model/Rebar";
import { ConcreteRectangle } from "../../model/ConcreteRectangle";
import { ColumnSolver } from "../../model/ColumnSolver";
import { ColumnResults } from "../../model/ColumnResults";
import successMsg from "../../utilities/sucessMsg";

type CalculateButtonPRops = ButtonHTMLAttributes<HTMLButtonElement>;

function CalculateButton(props: CalculateButtonPRops) {
  const { state, dispatch } = useColumnDataContext();
  const [isCalculating, setIsCalculating] = useState(false);

  function handleCalculateColumn() {
    const length = state.length;
    const concrete = new Concrete(
      state.fck,
      state.gammaC,
      state.phi,
      state.alpha,
      state.beta
    );
    const steel = new Steel(state.fyk, state.gammaS, state.es, state.esu);
    const bottomRestrictions = new NodalRestrictions(
      state.uxRestrictionBottom,
      state.uyRestrictionBottom,
      state.uzRestrictionBottom,
      state.rxRestrictionBottom,
      state.ryRestrictionBottom
    );
    const topRestrictions = new NodalRestrictions(
      state.uxRestrictionTop,
      state.uyRestrictionTop,
      state.uzRestrictionTop,
      state.rxRestrictionTop,
      state.ryRestrictionTop
    );
    const bottomLoads = new BottomNodalLoads(
      state.pxdBottomLoad,
      state.pydBottomLoad,
      state.mxdBottomLoad,
      state.mydBottomLoad
    );
    const topLoads = new TopNodalLoads(
      state.fzdTopLoad,
      state.hxdTopLoad,
      state.hydTopLoad,
      state.pxdTopLoad,
      state.pydTopLoad,
      state.mxdTopLoad,
      state.mydTopLoad
    );
    const criteria = new Criteria(
      state.finiteElements,
      state.xDiscretizations,
      state.yDiscretizations,
      state.diagramPoints,
      state.loadIncrements,
      state.maxIterationsPerIncrement,
      state.displacementTolerance,
      state.forcesTolerance,
      state.neutralAxisTolerance
    );
    let crossSectionRebars: Rebar[] = [];
    state.rebarList.forEach((rebar) => {
      const newRebar = new Rebar(
        concrete,
        steel,
        rebar.diameter,
        rebar.xCenterCoordinate,
        rebar.yCenterCoordinate
      );
      crossSectionRebars.push(newRebar);
    });
    let crossSectionRectangles: ConcreteRectangle[] = [];
    state.rectangleList.forEach((rectangle) => {
      const newRectangle = new ConcreteRectangle(
        rectangle.width,
        rectangle.height,
        rectangle.xCenterCoordinate,
        rectangle.yCenterCoordinate
      );
      crossSectionRectangles.push(newRectangle);
    });

    const columnSolver = new ColumnSolver(
      length,
      concrete,
      steel,
      bottomRestrictions,
      topRestrictions,
      bottomLoads,
      topLoads,
      criteria,
      crossSectionRebars,
      crossSectionRectangles
    );

    let results: ColumnResults;
    results = columnSolver.getColumnResults();
    return results;
  }

  return (
    <button
      className="w-full mt-6 appearance-none bg-brandPurple-300 rounded-[66px] text-white cursor-pointer text-xl font-semibold py-3 px-6 relative text-center flex justify-center duration-200 hover:bg-brandPurple-400 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 disabled:text-opacity-50 disabled:cursor-default"
      onClick={() => {
        setIsCalculating(true);

        try {
          const columnResults = handleCalculateColumn();
          const results = {
            isResultsAvailable: true,
            uyDisplacements: columnResults.getUyDisplacements(),
            uxDisplacements: columnResults.getUxDisplacements(),
            ndForces: columnResults.getNdForces(),
            mxForces: columnResults.getMxForces(),
            myForces: columnResults.getMyForces(),
            ndMaxResistanceDiagramPoints:
              columnResults.getNdMaxResistanceDiagramPoints(),
            ndMinResistanceDiagramPoints:
              columnResults.getNdMinResistanceDiagramPoints(),
            mxMinResistanceDiagramPoints:
              columnResults.getMxMinResistanceDiagramPoints(),
            mxMaxResistanceDiagramPoints:
              columnResults.getMxMaxResistanceDiagramPoints(),
            myMinResistanceDiagramPoints:
              columnResults.getMyMinResistanceDiagramPoints(),
            myMaxResistanceDiagramPoints:
              columnResults.getMyMaxResistanceDiagramPoints(),
            anglesResistanceDiagramPoints:
              columnResults.getAnglesResistanceDiagramPoints(),
            lengthPoints: columnResults.getLengthPoints(),
            ndMaxSolicitingForces: columnResults.getNdMaxSolicitingForces(),
            ndMinSolicitingForces: columnResults.getNdMinSolicitingForces(),
            mxMinSolicitingForces: columnResults.getMxMinSolicitingForces(),
            mxMaxSolicitingForces: columnResults.getMxMaxSolicitingForces(),
            myMinSolicitingForces: columnResults.getMyMinSolicitingForces(),
            myMaxSolicitingForces: columnResults.getMyMaxSolicitingForces(),
          };
          dispatch({ type: "update-results", payload: results });
          successMsg();
        } catch (err) {
          errorMsg("A verificação falhou", err as string);
        }

        setIsCalculating(false);
      }}
      disabled={isCalculating}
      {...props}
    >
      {isCalculating ? <Loading /> : "CALCULAR"}
    </button>
  );
}

export default CalculateButton;
