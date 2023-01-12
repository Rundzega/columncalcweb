import * as mathjs from "mathjs";
import { BarFiniteElement } from "./BarFiniteElement";
import { Criteria } from "./Criteria";
import { CrossSection } from "./CrossSection";
import { NodeFiniteElement } from "./NodeFiniteElements";

export class Column {
  private readonly nodesList: NodeFiniteElement[];

  private readonly barsList: BarFiniteElement[];

  private boundaryConditionsVector!: mathjs.Matrix;

  private externalForcesVector!: mathjs.Matrix;

  private inverseStiffnessMatrix!: mathjs.Matrix;

  private loadIncrement!: mathjs.Matrix;

  private currentIterationForcesVector!: mathjs.Matrix;

  private previousDisplacementsVector!: mathjs.Matrix;

  private currentDisplacementsVector: mathjs.Matrix;

  private imbalanceForcesVector: mathjs.Matrix;

  private firstAuxVector!: mathjs.Matrix;

  private secondAuxVector!: mathjs.Matrix;

  private thirdAuxVector!: mathjs.Matrix;

  private fourthAuxVector!: mathjs.Matrix;

  private uyDisplacements!: number[];

  private uxDisplacements!: number[];

  private uzDisplacements!: number[];

  private ndForces!: number[];

  private myForces!: number[];

  private mxForces!: number[];

  private lengthPoints!: number[];

  constructor(nodesList: NodeFiniteElement[], barsList: BarFiniteElement[]) {
    this.nodesList = nodesList;
    this.barsList = barsList;
    this.currentDisplacementsVector = mathjs.matrix(
      mathjs.zeros(5 * nodesList.length)
    );
    this.imbalanceForcesVector = mathjs.matrix(
      mathjs.zeros(5 * nodesList.length)
    );
  }

  calcBoundaryContitionsAndExternalForces(): void {
    const auxBoundaryConditionsList: mathjs.MathNumericType[] = [];
    const auxGlobalNodalLoads: mathjs.MathNumericType[] = [];

    this.nodesList.forEach((node) => {
      const auxNodeRestrictions = node.getNodalRestrictions().toArray();
      const auxNodeLoads = node.getNodalLoads().toArray();

      auxBoundaryConditionsList.push(...(auxNodeRestrictions as any));
      auxGlobalNodalLoads.push(...(auxNodeLoads as any));
    });

    this.boundaryConditionsVector = mathjs.matrix(auxBoundaryConditionsList);
    this.externalForcesVector = mathjs.matrix(auxGlobalNodalLoads);
  }

  calcglobalStiffnessMatrix(totalDegreesOfFreedom: number): mathjs.Matrix {
    let globalStiffnessMatrix = mathjs.matrix(
      mathjs.zeros([totalDegreesOfFreedom, totalDegreesOfFreedom])
    );

    this.barsList.forEach((bar) => {
      const iNodeFirstIndex = 5 * bar.getInitialNode().getId();
      const fNodeFirstIndex = 5 * bar.getFinalNode().getId();
      const iNodeLastIndex = iNodeFirstIndex + 5;
      const fNodeLastIndex = fNodeFirstIndex + 5;

      bar.setStiffnessMatrix();
      const firstSubMatrix = bar
        .getStiffnessMatrix()
        .subset(mathjs.index(mathjs.range(0, 5), mathjs.range(0, 5)));

      const secondSubMatrix = bar
        .getStiffnessMatrix()
        .subset(mathjs.index(mathjs.range(0, 5), mathjs.range(5, 10)));
      const thirdSubMatrix = bar
        .getStiffnessMatrix()
        .subset(mathjs.index(mathjs.range(5, 10), mathjs.range(0, 5)));
      const fourthSubMatrix = bar
        .getStiffnessMatrix()
        .subset(mathjs.index(mathjs.range(5, 10), mathjs.range(5, 10)));

      const sumFirstSubAndGlobal = mathjs.add(
        firstSubMatrix,
        globalStiffnessMatrix.subset(
          mathjs.index(
            mathjs.range(iNodeFirstIndex, iNodeLastIndex),
            mathjs.range(iNodeFirstIndex, iNodeLastIndex)
          )
        )
      );
      const sumSecondSubAndGlobal = mathjs.add(
        secondSubMatrix,
        globalStiffnessMatrix.subset(
          mathjs.index(
            mathjs.range(iNodeFirstIndex, iNodeLastIndex),
            mathjs.range(fNodeFirstIndex, fNodeLastIndex)
          )
        )
      );
      const sumThirdSubAndGlobal = mathjs.add(
        thirdSubMatrix,
        globalStiffnessMatrix.subset(
          mathjs.index(
            mathjs.range(fNodeFirstIndex, fNodeLastIndex),
            mathjs.range(iNodeFirstIndex, iNodeLastIndex)
          )
        )
      );
      const sumFourthSubAndGlobal = mathjs.add(
        fourthSubMatrix,
        globalStiffnessMatrix.subset(
          mathjs.index(
            mathjs.range(fNodeFirstIndex, fNodeLastIndex),
            mathjs.range(fNodeFirstIndex, fNodeLastIndex)
          )
        )
      );

      globalStiffnessMatrix.subset(
        mathjs.index(
          mathjs.range(iNodeFirstIndex, iNodeLastIndex),
          mathjs.range(iNodeFirstIndex, iNodeLastIndex)
        ),
        sumFirstSubAndGlobal
      );
      globalStiffnessMatrix.subset(
        mathjs.index(
          mathjs.range(iNodeFirstIndex, iNodeLastIndex),
          mathjs.range(fNodeFirstIndex, fNodeLastIndex)
        ),
        sumSecondSubAndGlobal
      );
      globalStiffnessMatrix.subset(
        mathjs.index(
          mathjs.range(fNodeFirstIndex, fNodeLastIndex),
          mathjs.range(iNodeFirstIndex, iNodeLastIndex)
        ),
        sumThirdSubAndGlobal
      );
      globalStiffnessMatrix.subset(
        mathjs.index(
          mathjs.range(fNodeFirstIndex, fNodeLastIndex),
          mathjs.range(fNodeFirstIndex, fNodeLastIndex)
        ),
        sumFourthSubAndGlobal
      );

      bar.calculateEquivalentNodalLoads();
      const iForcesSubVector = mathjs.add(
        this.externalForcesVector.subset(
          mathjs.index(mathjs.range(iNodeFirstIndex, iNodeLastIndex))
        ),
        bar.getEquivalentNodalLoads().subset(mathjs.index(mathjs.range(0, 5)))
      );

      const fForcesSubVector = mathjs.add(
        this.externalForcesVector.subset(
          mathjs.index(mathjs.range(fNodeFirstIndex, fNodeLastIndex))
        ),
        bar.getEquivalentNodalLoads().subset(mathjs.index(mathjs.range(5, 10)))
      );

      this.externalForcesVector.subset(
        mathjs.index(mathjs.range(iNodeFirstIndex, iNodeLastIndex)),
        iForcesSubVector
      );
      this.externalForcesVector.subset(
        mathjs.index(mathjs.range(fNodeFirstIndex, fNodeLastIndex)),
        fForcesSubVector
      );
    });

    return globalStiffnessMatrix;
  }

  calcInverseStiffnessMatrix(
    totalDegreesOfFreedom: number,
    stiffnessMatrix: mathjs.Matrix
  ): void {
    const bcVectorArray = this.boundaryConditionsVector.toArray();
    for (let row = 0; row < totalDegreesOfFreedom; row++) {
      for (let column = 0; column < totalDegreesOfFreedom; column++) {
        if (bcVectorArray.at(row) == 0) {
          if (row == column) {
            stiffnessMatrix.set([row, column], 1.0);
          } else {
            stiffnessMatrix.set([row, column], 0.0);
            stiffnessMatrix.set([column, row], 0.0);
          }
        }
      }
    }
    try {
      this.inverseStiffnessMatrix = mathjs.inv(stiffnessMatrix);
    } catch (err) {
      // eslint-disable-next-line no-throw-literal
      throw "Pilar instável devido às condições de contorno";
    }
  }

  calculateDisplacements(
    forcesVectorNoBoundaryConditions: mathjs.Matrix
  ): void {
    this.previousDisplacementsVector = this.currentDisplacementsVector.clone();

    const forcesVectorWithBoundaryConditions =
      this.boundaryConditionsVector.map((condition, index) => {
        const currentForce = forcesVectorNoBoundaryConditions
          .valueOf()
          .at(index) as mathjs.MathNumericType;
        return mathjs.multiply(condition, currentForce);
      });

    const currentResult = mathjs.multiply(
      this.inverseStiffnessMatrix,
      forcesVectorWithBoundaryConditions
    );
    this.currentDisplacementsVector = mathjs.add(
      this.currentDisplacementsVector,
      currentResult
    );

    this.nodesList.forEach((node) => {
      node.updateNodalDisplacements(this.currentDisplacementsVector);
    });
  }

  firstLinearSolve(numberOfIncrementLoads: number) {
    this.calcBoundaryContitionsAndExternalForces();
    const totalDegreesOfFreedom = this.nodesList.length * 5;

    let globalStiffnessMatrix = this.calcglobalStiffnessMatrix(
      totalDegreesOfFreedom
    );
    this.calcInverseStiffnessMatrix(
      totalDegreesOfFreedom,
      globalStiffnessMatrix
    );

    this.externalForcesVector = this.externalForcesVector.map(
      (element, index) => {
        const boundaryCondition = this.boundaryConditionsVector
          .valueOf()
          .at(index) as mathjs.MathNumericType;

        return mathjs.multiply(element, boundaryCondition);
      }
    );

    this.loadIncrement = this.externalForcesVector.map(
      (element: mathjs.MathNumericType) =>
        mathjs.divide(element, numberOfIncrementLoads)
    );

    this.currentIterationForcesVector = this.loadIncrement.clone();
    this.calculateDisplacements(this.currentIterationForcesVector);
  }

  checkConvergence(
    forcesTolerance: number,
    displacementsTolerance: number,
    currentIteration: number
  ): boolean {
    const imbalanceForcesNorm = mathjs.norm(this.imbalanceForcesVector);
    const externalForcesNorm = mathjs.norm(this.currentIterationForcesVector);
    const displacementIncrementNorm = mathjs.norm(
      mathjs.subtract(
        this.currentDisplacementsVector,
        this.previousDisplacementsVector
      )
    );
    const currentDisplacementsNorm = mathjs.norm(
      this.currentDisplacementsVector
    );

    const forcesConvergence = mathjs
      .divide(imbalanceForcesNorm, externalForcesNorm)
      .valueOf();
    const displacementsConvergence = mathjs
      .divide(displacementIncrementNorm, currentDisplacementsNorm)
      .valueOf();

    return (
      forcesConvergence <= forcesTolerance &&
      displacementsConvergence <= displacementsTolerance &&
      currentIteration > 0
    );
  }

  nonLinearSolve(
    forcesTolerance: number,
    displacementsTolerance: number,
    numberOfLoadIncrements: number,
    maxNumberOfIterations: number
  ): boolean {
    this.firstLinearSolve(numberOfLoadIncrements);
    let currentLoadIncrement = 1;
    let currentLoadIteration = 0;
    let totalCounter = 0;

    while (currentLoadIteration <= maxNumberOfIterations) {
      const globalNonLinearLoadVector = mathjs.matrix(
        mathjs.zeros(5 * this.nodesList.length)
      );
      this.barsList.forEach((bar) => {
        bar.calcNonLinearForces();
        const initialIndex = 5 * bar.getInitialNode().getId();
        const finalIndex = 5 * bar.getFinalNode().getId();
        for (let i = 0; i < 5; i++) {
          const currentInitial = globalNonLinearLoadVector.get([
            initialIndex + i,
          ]) as number;

          const sumInitial =
            currentInitial + (bar.getNonLinearNodalForces().get([i]) as number);

          const currentFinal = globalNonLinearLoadVector.get([
            finalIndex + i,
          ]) as number;
          const sumFinal =
            currentFinal +
            (bar.getNonLinearNodalForces().get([i + 5]) as number);

          globalNonLinearLoadVector.set([initialIndex + i], sumInitial);
          globalNonLinearLoadVector.set([finalIndex + i], sumFinal);
        }
      });
      const globalNonLinearLoadVectorBoundaryConditions =
        this.boundaryConditionsVector.map(
          (element: mathjs.MathNumericType, index) => {
            const loadVectorValue = globalNonLinearLoadVector
              .valueOf()
              .at(index) as mathjs.MathNumericType;
            return mathjs.multiply(element, loadVectorValue);
          }
        );

      this.imbalanceForcesVector = mathjs.subtract(
        this.currentIterationForcesVector,
        globalNonLinearLoadVectorBoundaryConditions
      );

      if (
        this.checkConvergence(
          forcesTolerance,
          displacementsTolerance,
          currentLoadIteration
        )
      ) {
        if (currentLoadIncrement == numberOfLoadIncrements) {
          return true;
        }
        this.currentIterationForcesVector = mathjs.add(
          this.currentIterationForcesVector,
          this.loadIncrement
        );
        this.imbalanceForcesVector = mathjs.subtract(
          this.currentIterationForcesVector,
          globalNonLinearLoadVectorBoundaryConditions
        );

        currentLoadIncrement++;
        currentLoadIteration = 0;
      }

      currentLoadIteration++;
      this.calculateDisplacements(this.imbalanceForcesVector);
      totalCounter++;
    }
    throw "Número máximo de iterações atingido sem convergência  de forças e deslocamentos";
  }

  generateForcesDisplacementesResults(crossSection: CrossSection): void {
    const arraysLength = this.nodesList.length + this.barsList.length;

    this.uyDisplacements = Array(arraysLength);
    this.uyDisplacements.fill(0);
    this.uxDisplacements = Array(arraysLength);
    this.uxDisplacements.fill(0);
    this.uzDisplacements = Array(arraysLength);
    this.uzDisplacements.fill(0);
    this.ndForces = Array(arraysLength);
    this.ndForces.fill(0);
    this.myForces = Array(arraysLength);
    this.myForces.fill(0);
    this.mxForces = Array(arraysLength);
    this.mxForces.fill(0);
    this.lengthPoints = Array(arraysLength);
    this.lengthPoints.fill(0);

    this.barsList.forEach((bar) => {
      const nodeIndex = bar.getInitialNode().getId() * 2;
      const globalZPoints = [
        bar.getInitialNode().getZPosition(),
        bar.getInitialNode().getZPosition() + bar.getLength() / 2,
        bar.getFinalNode().getZPosition(),
      ];
      const localZPoints = [0.0, 0.5 * bar.getLength(), bar.getLength()];

      localZPoints.forEach((point, localIndex) => {
        const displacements = bar.calcAndGetDisplacements(point);
        const strains = bar.calcAndGetStrainAndCurvatures(point);
        const internalForces = crossSection.calcInternalForces(
          strains[0],
          strains[1],
          strains[2],
          true
        );

        const arrayIndex = nodeIndex + localIndex;
        const uzDisplacement = displacements[0];
        const uyDisplacement = displacements[1];
        const uxDisplacement = displacements[2];
        const ndForce = internalForces[0];
        const mxForce = internalForces[1];
        const myForce = internalForces[2];

        if (
          (nodeIndex == 0 && localIndex == 2) ||
          (nodeIndex == (this.nodesList.length - 2) * 2 && localIndex == 0) ||
          (nodeIndex != 0 &&
            nodeIndex != (this.nodesList.length - 2) * 2 &&
            localIndex % 2 == 0)
        ) {
          this.uzDisplacements[arrayIndex] += (uzDisplacement * 100) / 2;
          this.uyDisplacements[arrayIndex] += (uyDisplacement * 100) / 2;
          this.uxDisplacements[arrayIndex] += (uxDisplacement * 100) / 2;
          this.ndForces[arrayIndex] += ndForce / 2;
          this.mxForces[arrayIndex] += mxForce / 2;
          this.myForces[arrayIndex] += myForce / 2;
          this.lengthPoints[arrayIndex] += globalZPoints[localIndex] / 2;
        } else {
          this.uzDisplacements[arrayIndex] += uzDisplacement * 100;
          this.uyDisplacements[arrayIndex] += uyDisplacement * 100;
          this.uxDisplacements[arrayIndex] += uxDisplacement * 100;
          this.ndForces[arrayIndex] += ndForce;
          this.mxForces[arrayIndex] += mxForce;
          this.myForces[arrayIndex] += myForce;
          this.lengthPoints[arrayIndex] += globalZPoints[localIndex];
        }
      });
    });
  }

  getResistanceDiagramPoints(
    crossSection: CrossSection,
    criteria: Criteria,
    index: number,
    ndForces: number[],
    mxForces: number[],
    myForces: number[]
  ): [number, number][] {
    const neutralAxisDepthTolerance =
      criteria.getNeutralAxisDepthTolerance() > 10
        ? criteria.getNeutralAxisDepthTolerance()
        : 0.001;
    const numberOfDiagramPoints = criteria.getDiagramPointsNumber();

    const stepAngle = 360 / criteria.getDiagramPointsNumber();

    crossSection.setInternalMomentsDiagram(
      ndForces[index],
      neutralAxisDepthTolerance,
      stepAngle
    );

    const internalMomentsDiagram = crossSection.getInternalMomentsDiagram();
    return internalMomentsDiagram;
  }

  getAnglesResistanceDiagram(crossSection: CrossSection): number[] {
    return crossSection.getGraphAngles();
  }

  getSolicitingForcesPoints(
    mxForces: number[],
    myForces: number[],
    index: number
  ): number[] {
    let solicitingForces: number[] = [];
    solicitingForces.push(mxForces[index]);
    solicitingForces.push(myForces[index]);

    return solicitingForces;
  }

  checkCrossSectionIsFailed(): boolean {
    this.barsList.forEach((bar) => {
      bar.checkCrossSectionIsFailed();
    });

    return false;
  }

  getCurrentDisplacementsVector(): mathjs.Matrix {
    return this.currentDisplacementsVector;
  }

  getUyDisplacements(): number[] {
    return this.uyDisplacements;
  }

  getLengthPoints(): number[] {
    return this.lengthPoints;
  }

  getUxDisplacements(): number[] {
    return this.uxDisplacements;
  }

  getUzDisplacements(): number[] {
    return this.uzDisplacements;
  }

  getNdForces(): number[] {
    return this.ndForces;
  }

  getMyForces(): number[] {
    return this.myForces;
  }

  getMxForces(): number[] {
    return this.mxForces;
  }
}
