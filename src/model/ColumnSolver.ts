import { BottomNodalLoads } from "./BottomNodalLoads";
import { Concrete } from "./Concrete";
import { ConcreteRectangle } from "./ConcreteRectangle";
import { Criteria } from "./Criteria";
import { CrossSection } from "./CrossSection";
import { CrossSectionValidator } from "./CrossSectionValidator";
import { NodalRestrictions } from "./NodalRestrictions";
import { NodeFiniteElement } from "./NodeFiniteElements";
import { Rebar } from "./Rebar";
import { Steel } from "./Steel";
import { TopNodalLoads } from "./TopNodalLoads";
import * as mathjs from "mathjs";
import { BarFiniteElement } from "./BarFiniteElement";
import { fitLinearPolynomialFunction } from "../utilities/fitLinearPolynomialFunction";
import { Column } from "./Column";
import { ColumnResults } from "./ColumnResults";

export class ColumnSolver {
  private readonly columnResults: ColumnResults;

  constructor(
    length: number,
    concrete: Concrete,
    steel: Steel,
    bottomRestrictions: NodalRestrictions,
    topRestrictions: NodalRestrictions,
    bottomLoads: BottomNodalLoads,
    topLoads: TopNodalLoads,
    criteria: Criteria,
    rebarList: Rebar[],
    rectangleList: ConcreteRectangle[]
  ) {
    const crossSectionValidator = new CrossSectionValidator();
    crossSectionValidator.validateRectanglesPosition(rectangleList);
    crossSectionValidator.validateRebarsPosition(rebarList, rectangleList);
    const crossSection = new CrossSection(
      rectangleList,
      rebarList,
      concrete,
      steel,
      criteria.getxDiscretizationsNumber(),
      criteria.getyDiscretizationsNumber()
    );

    console.log(crossSection);

    const columnLength = length / 100;
    const nodesList = this.createNodeFiniteElementsList(
      criteria,
      columnLength,
      bottomLoads,
      topLoads,
      bottomRestrictions,
      topRestrictions
    );

    const barsList = this.createFEMBarsList(
      criteria,
      columnLength,
      bottomLoads,
      topLoads,
      crossSection,
      nodesList
    );

    const column = new Column(nodesList, barsList);

    column.nonLinearSolve(
      criteria.getForcesTolerance(),
      criteria.getDisplacementsTolerance(),
      criteria.getLoadIncrementsNumber(),
      criteria.getMaxIterationsPerIncrement()
    );

    column.generateForcesDisplacementesResults(crossSection);

    this.columnResults = new ColumnResults(column, crossSection, criteria);
  }

  createNodeFiniteElementsList(
    criteria: Criteria,
    columnLength: number,
    bottomLoads: BottomNodalLoads,
    topLoads: TopNodalLoads,
    bottomRestrictions: NodalRestrictions,
    topRestrictions: NodalRestrictions
  ): NodeFiniteElement[] {
    const finitieElementLength =
      columnLength / criteria.getFiniteElementsNumber();

    const numberOfFEM = criteria.getFiniteElementsNumber();
    let newNode: NodeFiniteElement;

    let nodeFiniteElements: NodeFiniteElement[] = [];

    for (let i = 0; i < numberOfFEM + 7; i++) {
      if (i < 4) {
        newNode = new NodeFiniteElement(i, (i * finitieElementLength) / 4);
        if (i == 0) {
          const bottomMxLoad = bottomLoads.getMx();
          const bottomMyLoad = bottomLoads.getMy();

          const bottomLoadVector = mathjs.matrix([
            0,
            0,
            -bottomMxLoad,
            0,
            bottomMyLoad,
          ]);
          newNode.setNodalLoads(bottomLoadVector);

          const ux = bottomRestrictions.isUx() ? 0 : 1;
          const uy = bottomRestrictions.isUy() ? 0 : 1;
          const uz = bottomRestrictions.isUz() ? 0 : 1;
          const rx = bottomRestrictions.isRx() ? 0 : 1;
          const ry = bottomRestrictions.isRy() ? 0 : 1;

          const newBottomRestrictions = mathjs.matrix([uz, uy, rx, ux, ry]);
          newNode.setNodalRestrictions(newBottomRestrictions);
        }
      } else if (i > numberOfFEM + 2) {
        newNode = new NodeFiniteElement(
          i,
          (numberOfFEM - 2) * finitieElementLength +
            ((i - numberOfFEM + 2) * finitieElementLength) / 4
        );
        if (i == numberOfFEM + 6) {
          const fz = topLoads.getFz();
          const hx = topLoads.getHx();
          const hy = topLoads.getHy();
          const mx = topLoads.getMx();
          const my = topLoads.getMy();

          const topLoadVector = mathjs.matrix([-fz, hy, -mx, hx, my]);
          newNode.setNodalLoads(topLoadVector);

          const ux = topRestrictions.isUx() ? 0 : 1;
          const uy = topRestrictions.isUy() ? 0 : 1;
          const uz = topRestrictions.isUz() ? 0 : 1;
          const rx = topRestrictions.isRx() ? 0 : 1;
          const ry = topRestrictions.isRy() ? 0 : 1;

          const newTopRestrictions = mathjs.matrix([uz, uy, rx, ux, ry]);
          newNode.setNodalRestrictions(newTopRestrictions);
        }
      } else {
        newNode = new NodeFiniteElement(i, (i - 3) * finitieElementLength);
      }

      nodeFiniteElements.push(newNode);
    }
    return nodeFiniteElements;
  }

  createFEMBarsList(
    criteria: Criteria,
    columnLength: number,
    bottomLoads: BottomNodalLoads,
    topLoads: TopNodalLoads,
    crossSection: CrossSection,
    nodesList: NodeFiniteElement[]
  ): BarFiniteElement[] {
    const pxBottomLoad = bottomLoads.getPx();
    const pyBottomLoad = bottomLoads.getPy();
    const pxTopLoad = topLoads.getPx();
    const pyTopLoad = topLoads.getPy();

    const yCoefficients = fitLinearPolynomialFunction(
      0,
      columnLength,
      pyBottomLoad,
      pyTopLoad
    );

    const xCoefficients = fitLinearPolynomialFunction(
      0,
      columnLength,
      pxBottomLoad,
      pxTopLoad
    );

    const numberOfFEM = criteria.getFiniteElementsNumber();

    //TODO: MAKE THIS AN OPTION
    const columnWeight = -(crossSection.getTotalArea() * 0.000025) * 140;

    let barsList: BarFiniteElement[] = [];

    for (let i = 0; i < numberOfFEM + 6; i++) {
      const finalNodePosition = nodesList[i + 1].getZPosition();
      const initialNodePosition = nodesList[i].getZPosition();
      const barLength = finalNodePosition - initialNodePosition;

      const newBar = new BarFiniteElement(
        nodesList[i],
        nodesList[i + 1],
        barLength,
        i,
        crossSection
      );

      const pyBottomBar =
        yCoefficients[0] * initialNodePosition + yCoefficients[1];
      const pyTopBar = yCoefficients[0] * finalNodePosition + yCoefficients[1];
      const pxBottomBar =
        xCoefficients[0] * initialNodePosition + xCoefficients[1];
      const pxTopBar = xCoefficients[0] * finalNodePosition + xCoefficients[1];

      const uniformLoads = mathjs.matrix([
        columnWeight,
        pyBottomBar,
        pyTopBar,
        pxBottomBar,
        pxTopBar,
      ]);
      newBar.setUniformLoads(uniformLoads);

      barsList.push(newBar);
    }
    return barsList;
  }

  getColumnResults(): ColumnResults {
    return this.columnResults;
  }
}
