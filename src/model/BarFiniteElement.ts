import * as mathjs from "mathjs";
import { LEGENDRE_VALUES, LEGENDRE_WEIGHTS } from "../utilities/constants";
import { fitLinearPolynomialFunction } from "../utilities/fitLinearPolynomialFunction";
import { CrossSection } from "./CrossSection";
import { NodeFiniteElement } from "./NodeFiniteElements";

export class BarFiniteElement {
  private readonly initialNode: NodeFiniteElement;

  private readonly finalNode: NodeFiniteElement;

  private length: number;

  private readonly id: number;

  private readonly crossSection: CrossSection;

  private stiffnessMatrix!: mathjs.Matrix;

  private uniformLoads: mathjs.Matrix;

  private equivalentNodalLoads!: mathjs.Matrix;

  private nonLinearNodalForces: mathjs.Matrix;

  constructor(
    initialNode: NodeFiniteElement,
    finalNode: NodeFiniteElement,
    length: number,
    id: number,
    crossSection: CrossSection
  ) {
    this.initialNode = initialNode;
    this.finalNode = finalNode;
    this.crossSection = crossSection;
    this.length = length;
    this.id = id;
    this.uniformLoads = mathjs.matrix(mathjs.zeros(5));
    this.nonLinearNodalForces = mathjs.matrix(mathjs.zeros(10));
  }

  setStiffnessMatrix(): void {
    const youngModulus =
      this.crossSection.getConcreteClass().getYoungModulus() * 10000;
    const xInertialMoment =
      this.crossSection.getXInertialMoment() / Math.pow(100, 4);
    const yInertialMoment =
      this.crossSection.getYInertialMoment() / Math.pow(100, 4);
    const area = this.crossSection.getTotalArea() / Math.pow(100, 2);

    const c1 = (youngModulus * area) / this.length;
    const c2 = (12 * youngModulus * xInertialMoment) / Math.pow(this.length, 3);
    const c3 = (c2 * this.length) / 2;
    const c4 = (c2 * Math.pow(this.length, 2)) / 3;
    const c5 = c4 / 2;
    const c6 = (12 * youngModulus * yInertialMoment) / Math.pow(this.length, 3);
    const c7 = (c6 * this.length) / 2;
    const c8 = (c6 * Math.pow(this.length, 2)) / 3;
    const c9 = c8 / 2;

    this.stiffnessMatrix = mathjs.matrix([
      [c1, 0, 0, 0, 0, -c1, 0, 0, 0, 0],
      [0, c2, c3, 0, 0, 0, -c2, c3, 0, 0],
      [0, c3, c4, 0, 0, 0, -c3, c5, 0, 0],
      [0, 0, 0, c6, c7, 0, 0, 0, -c6, c7],
      [0, 0, 0, c7, c8, 0, 0, 0, -c7, c9],
      [-c1, 0, 0, 0, 0, c1, 0, 0, 0, 0],
      [0, -c2, -c3, 0, 0, 0, c2, -c3, 0, 0],
      [0, c3, c5, 0, 0, 0, -c3, c4, 0, 0],
      [0, 0, 0, -c6, -c7, 0, 0, 0, c6, -c7],
      [0, 0, 0, c7, c9, 0, 0, 0, -c7, c8],
    ]);
  }

  calcAndGetDisplacements(zPosition: number): number[] {
    const phiAuxParameters: number[] = [];
    const phiAuxParamsLists: number[][] = [];
    phiAuxParamsLists.push(phiAuxParameters);

    this.phiParamsCalcAuxFunction(
      zPosition,
      phiAuxParamsLists,
      this.useShapeFunctions
    );

    const axialDisplacement = phiAuxParameters[0] + phiAuxParameters[5];
    const yTransversalDisplacement =
      phiAuxParameters[1] +
      phiAuxParameters[2] +
      phiAuxParameters[6] +
      phiAuxParameters[7];
    const xTransversalDisplacements =
      phiAuxParameters[3] +
      phiAuxParameters[4] +
      phiAuxParameters[8] +
      phiAuxParameters[9];

    return [
      axialDisplacement,
      yTransversalDisplacement,
      xTransversalDisplacements,
    ];
  }

  calcAndGetGeometricNLParameters(zPosition: number): number[] {
    const phiDerivAuxParameters: number[] = [];
    const phiAuxParamsLists: number[][] = [];

    phiAuxParamsLists.push(phiDerivAuxParameters);

    this.phiParamsCalcAuxFunction(
      zPosition,
      phiAuxParamsLists,
      this.useDerivativeShapeFunction
    );

    const dwyParam =
      phiDerivAuxParameters[1] +
      phiDerivAuxParameters[2] +
      phiDerivAuxParameters[6] +
      phiDerivAuxParameters[7];
    const dwxParam =
      phiDerivAuxParameters[3] +
      phiDerivAuxParameters[4] +
      phiDerivAuxParameters[8] +
      phiDerivAuxParameters[9];

    return [dwyParam, dwxParam];
  }

  calcAndGetStrainAndCurvatures(zPosition: number): number[] {
    const phiDerivAuxParameters: number[] = [];
    const phiSecondDerivAuxParameters: number[] = [];
    const phiAuxParamLists: number[][] = [];
    phiAuxParamLists.push(phiDerivAuxParameters);
    phiAuxParamLists.push(phiSecondDerivAuxParameters);

    this.phiParamsCalcAuxFunction(
      zPosition,
      phiAuxParamLists,
      this.useDerivativeShapeFunction,
      this.useSecondDerivativeShapeFunction
    );

    const duoAuxParam = phiDerivAuxParameters[0] + phiDerivAuxParameters[5];

    const dwyAuxParam =
      phiDerivAuxParameters[1] +
      phiDerivAuxParameters[2] +
      phiDerivAuxParameters[6] +
      phiDerivAuxParameters[7];
    const dwxAuxParam =
      phiDerivAuxParameters[3] +
      phiDerivAuxParameters[4] +
      phiDerivAuxParameters[8] +
      phiDerivAuxParameters[9];
    const dwyDerivAuxParam =
      phiSecondDerivAuxParameters[1] +
      phiSecondDerivAuxParameters[2] +
      phiSecondDerivAuxParameters[6] +
      phiSecondDerivAuxParameters[7];
    const dwxDerivAuxParam =
      phiSecondDerivAuxParameters[3] +
      phiSecondDerivAuxParameters[4] +
      phiSecondDerivAuxParameters[8] +
      phiSecondDerivAuxParameters[9];

    const axialStrain =
      duoAuxParam + 0.5 * (Math.pow(dwyAuxParam, 2) + Math.pow(dwxAuxParam, 2));

    const yCurvature = -dwyDerivAuxParam;
    const xCurvature = -dwxDerivAuxParam;

    return [axialStrain, yCurvature, xCurvature];
  }

  phiParamsCalcAuxFunction(
    zPosition: number,
    phiAuxParamsLists: number[][],
    ...shapeFunctions: Array<
      (
        degreeOfFreedomIndex: number,
        zPosition: number,
        length: number
      ) => number
    >
  ): void {
    if (
      phiAuxParamsLists.length != shapeFunctions.length ||
      phiAuxParamsLists.length > 2
    ) {
      throw "Parameters list and shapeFunctions list should be the same size (max 2)";
    }

    const initialNodeDisplacements = this.initialNode.getNodalDisplacements();
    const finalNodeDisplacements = this.finalNode.getNodalDisplacements();

    let degreeOfFreedomCounter = 0;
    initialNodeDisplacements.forEach((displacement) => {
      for (let i = 0; i < phiAuxParamsLists.length; i++) {
        phiAuxParamsLists
          .at(i)!
          .push(
            shapeFunctions[i](degreeOfFreedomCounter, zPosition, this.length) *
              displacement
          );
      }
      degreeOfFreedomCounter++;
    });
    finalNodeDisplacements.forEach((displacement) => {
      for (let i = 0; i < phiAuxParamsLists.length; i++) {
        phiAuxParamsLists
          .at(i)!
          .push(
            shapeFunctions[i](degreeOfFreedomCounter, zPosition, this.length) *
              displacement
          );
      }
      degreeOfFreedomCounter++;
    });
  }

  calculateEquivalentNodalLoads(): void {
    const zLoad = this.uniformLoads.valueOf().at(0)?.valueOf() as number;
    const yLoadInitial = this.uniformLoads.valueOf().at(1)?.valueOf() as number;
    const yLoadFinal = this.uniformLoads.valueOf().at(2)?.valueOf() as number;
    const xLoadInitial = this.uniformLoads.valueOf().at(3)?.valueOf() as number;
    const xLoadFinal = this.uniformLoads.valueOf().at(4)?.valueOf() as number;

    const yCoefficients = fitLinearPolynomialFunction(
      0,
      this.length,
      yLoadInitial,
      yLoadFinal
    );
    const xCoefficients = fitLinearPolynomialFunction(
      0,
      this.length,
      xLoadInitial,
      xLoadFinal
    );

    const halfLength = this.length / 2;

    const zPositionsArray: number[] = [];
    LEGENDRE_VALUES.forEach((legendreValue) => {
      const zPosition = halfLength * legendreValue + halfLength;
      zPositionsArray.push(zPosition);
    });

    this.equivalentNodalLoads = mathjs.matrix(mathjs.zeros(10));
    for (let degreeOfFreedom = 0; degreeOfFreedom < 10; degreeOfFreedom++) {
      switch (degreeOfFreedom) {
        case 0:
        case 5:
          this.axialNodalLoadsAuxFunction(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            zLoad,
            degreeOfFreedom,
            zPositionsArray
          );
          break;
        case 1:
        case 2:
        case 6:
        case 7:
          this.transversalNodalLoadsAuxFunction(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            yCoefficients,
            degreeOfFreedom,
            zPositionsArray
          );
          break;
        case 3:
        case 4:
        case 8:
        case 9:
          this.transversalNodalLoadsAuxFunction(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            xCoefficients,
            degreeOfFreedom,
            zPositionsArray
          );
          break;
        default:
          throw "Erro";
      }
    }
  }

  axialNodalLoadsAuxFunction(
    legendreValues: number[],
    legendreWeights: number[],
    zLoad: number,
    degreeOfFreedomIndex: number,
    zPositionsArray: number[]
  ): void {
    let auxVector: number[] = Array(this.equivalentNodalLoads.valueOf().length);
    auxVector.fill(0);

    for (
      let legendrePoint = 0;
      legendrePoint < legendreValues.length;
      legendrePoint++
    ) {
      const legendreIteration =
        legendreWeights.at(legendrePoint)! *
        (zLoad *
          this.useShapeFunctions(
            degreeOfFreedomIndex,
            zPositionsArray.at(legendrePoint)!,
            this.length
          ));
      auxVector[degreeOfFreedomIndex] += legendreIteration;
    }

    const tensorArray = this.equivalentNodalLoads.toArray();
    tensorArray[degreeOfFreedomIndex] =
      (auxVector[degreeOfFreedomIndex] * this.length) / 2;
    this.equivalentNodalLoads = mathjs.matrix(tensorArray);
  }

  transversalNodalLoadsAuxFunction(
    legendreValues: number[],
    legendreWeights: number[],
    axisCoefficients: number[],
    degreeOfFreedomIndex: number,
    zPositionsArray: number[]
  ): void {
    let auxVector: number[] = Array(this.equivalentNodalLoads.valueOf().length);
    auxVector.fill(0);

    for (
      let legendrePoint = 0;
      legendrePoint < legendreValues.length;
      legendrePoint++
    ) {
      const legendreIteration =
        legendreWeights.at(legendrePoint)! *
        this.linearPolynomialCalc(
          zPositionsArray.at(legendrePoint)!,
          axisCoefficients[0],
          axisCoefficients[1]
        ) *
        this.useShapeFunctions(
          degreeOfFreedomIndex,
          zPositionsArray.at(legendrePoint)!,
          this.length
        );
      auxVector[degreeOfFreedomIndex] += legendreIteration;
    }
    const tensorArray = this.equivalentNodalLoads.toArray();
    tensorArray[degreeOfFreedomIndex] =
      (auxVector[degreeOfFreedomIndex] * this.length) / 2;
    this.equivalentNodalLoads = mathjs.matrix(tensorArray);
  }

  linearPolynomialCalc(z: number, a: number, b: number): number {
    return a * z + b;
  }

  useShapeFunctions(
    degreeOfFreedomIndex: number,
    zPosition: number,
    length: number
  ): number {
    const relPosition = zPosition / length;
    let result: number;

    switch (degreeOfFreedomIndex) {
      case 0:
        result = 1 - relPosition;
        break;
      case 1:
      case 3:
        result =
          2 * Math.pow(relPosition, 3) - 3 * Math.pow(relPosition, 2) + 1;
        break;
      case 2:
      case 4:
        result =
          this.length *
          (Math.pow(relPosition, 3) -
            2 * Math.pow(relPosition, 2) +
            relPosition);
        break;
      case 5:
        result = relPosition;
        break;
      case 6:
      case 8:
        result = -2 * Math.pow(relPosition, 3) + 3 * Math.pow(relPosition, 2);
        break;
      case 7:
      case 9:
        result =
          this.length * (Math.pow(relPosition, 3) - Math.pow(relPosition, 2));
        break;
      default:
        throw "Erro";
    }
    return result;
  }

  useDerivativeShapeFunction(
    degreeOfFreedomIndex: number,
    zPosition: number,
    length: number
  ): number {
    let result: number;

    switch (degreeOfFreedomIndex) {
      case 0:
        result = -(1 / length);
        break;
      case 1:
      case 3:
        result = (6 * zPosition * (zPosition - length)) / Math.pow(length, 3);
        break;
      case 2:
      case 4:
        result =
          (Math.pow(length, 2) -
            4 * length * zPosition +
            3 * Math.pow(zPosition, 2)) /
          Math.pow(length, 2);
        break;
      case 5:
        result = 1 / length;
        break;
      case 6:
      case 8:
        result = (6 * zPosition * (length - zPosition)) / Math.pow(length, 3);
        break;
      case 7:
      case 9:
        result =
          (zPosition * (3 * zPosition - 2 * length)) / Math.pow(length, 2);
        break;
      default:
        throw "Erro";
    }
    return result;
  }

  useSecondDerivativeShapeFunction(
    degreeOfFreedomIndex: number,
    zPosition: number,
    length: number
  ): number {
    let result: number;

    switch (degreeOfFreedomIndex) {
      case 0:
      case 5:
        result = 0;
        break;
      case 1:
      case 3:
        result = -(6 * (length - 2 * zPosition)) / Math.pow(length, 3);
        break;
      case 2:
      case 4:
        result = (6 * zPosition - 4 * length) / Math.pow(length, 2);
        break;
      case 6:
      case 8:
        result = (6 * (length - 2 * zPosition)) / Math.pow(length, 3);
        break;
      case 7:
      case 9:
        result = -(2 * (length - 3 * zPosition)) / Math.pow(length, 2);
        break;
      default:
        throw "Erro";
    }
    return result;
  }

  calcNonLinearForces(): void {
    const halfLength = this.length / 2;

    let zPositionsArray: number[] = [];
    LEGENDRE_VALUES.forEach((value) => {
      const zPosition = halfLength * value + halfLength;
      zPositionsArray.push(zPosition);
    });

    let auxVectorA: number[] = [];
    let auxVectorB: number[] = [];

    const kAuxParam = Math.sqrt(3.0 / 5.0);
    const firstEvalPoint = -kAuxParam * this.length + halfLength;
    const secondAvalPoint = halfLength;
    const thirdEvalPoint = kAuxParam * this.length + halfLength;

    const evalPoints = [firstEvalPoint, secondAvalPoint, thirdEvalPoint];
    const gaussPointsNormalForces: number[] = [];
    const gaussPointsYBendingMoments: number[] = [];
    const gaussPointsXBendingMoments: number[] = [];

    evalPoints.forEach((evalPoint) => {
      const strainAndCurvatures = this.calcAndGetStrainAndCurvatures(evalPoint);

      const internalForces = this.crossSection.calcInternalForces(
        strainAndCurvatures[0],
        strainAndCurvatures[1],
        strainAndCurvatures[2],
        true
      );

      gaussPointsNormalForces.push(internalForces[0]);
      gaussPointsYBendingMoments.push(internalForces[1]);
      gaussPointsXBendingMoments.push(internalForces[2]);
    });

    zPositionsArray.forEach((zPosition) => {
      const geometricNLParams = this.calcAndGetGeometricNLParameters(zPosition);
      auxVectorA.push(geometricNLParams[0]);
      auxVectorB.push(geometricNLParams[1]);
    });

    for (
      let degreeOfFreedomIndex = 0;
      degreeOfFreedomIndex < 10;
      degreeOfFreedomIndex++
    ) {
      switch (degreeOfFreedomIndex) {
        case 0:
        case 5:
          this.axialNonLinearAuxFunction(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            gaussPointsNormalForces,
            degreeOfFreedomIndex,
            zPositionsArray
          );
          break;
        case 1:
        case 2:
        case 6:
        case 7:
          this.transversalNonLinearAuxFunctions(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            gaussPointsNormalForces,
            degreeOfFreedomIndex,
            zPositionsArray,
            gaussPointsYBendingMoments,
            auxVectorA
          );
          break;
        case 3:
        case 4:
        case 8:
        case 9:
          this.transversalNonLinearAuxFunctions(
            LEGENDRE_VALUES,
            LEGENDRE_WEIGHTS,
            gaussPointsNormalForces,
            degreeOfFreedomIndex,
            zPositionsArray,
            gaussPointsXBendingMoments,
            auxVectorB
          );
          break;
        default:
          throw "Error";
      }
    }
  }

  axialNonLinearAuxFunction(
    legendreValues: number[],
    legendreWeights: number[],
    gaussPointsNormalForces: number[],
    degreeOfFreedomIndex: number,
    zPositionsArray: number[]
  ): void {
    let sumVector = mathjs.matrix(mathjs.zeros(10));

    for (
      let legendrePoint = 0;
      legendrePoint < legendreValues.length;
      legendrePoint++
    ) {
      const legendreIteration =
        legendreWeights.at(legendrePoint)! *
        (gaussPointsNormalForces.at(legendrePoint)! *
          this.useDerivativeShapeFunction(
            degreeOfFreedomIndex,
            zPositionsArray.at(legendrePoint)!,
            this.length
          ));
      const currentValue: number = sumVector.get([
        degreeOfFreedomIndex,
      ]) as number;
      const sum = currentValue + legendreIteration;
      sumVector.set([degreeOfFreedomIndex], sum);
    }
    this.nonLinearNodalForces.set(
      [degreeOfFreedomIndex],
      ((sumVector.get([degreeOfFreedomIndex]) as number) * this.length) / 2
    );
  }

  transversalNonLinearAuxFunctions(
    legendreValues: number[],
    legendreWeights: number[],
    gaussPointsNormalForces: number[],
    degreeOfFreedomIndex: number,
    zPositionsArray: number[],
    gaussPointsAxisMoments: number[],
    auxVector: number[]
  ): void {
    let sumVector = mathjs.matrix(mathjs.zeros(10));

    for (
      let legendrePoint = 0;
      legendrePoint < legendreValues.length;
      legendrePoint++
    ) {
      const firstExpressionIntegration =
        legendreWeights.at(legendrePoint)! *
        (-gaussPointsAxisMoments.at(legendrePoint)! *
          this.useSecondDerivativeShapeFunction(
            degreeOfFreedomIndex,
            zPositionsArray.at(legendrePoint)!,
            this.length
          ));

      const secondExpressionIntegration =
        legendreWeights.at(legendrePoint)! *
        (gaussPointsNormalForces.at(legendrePoint)! *
          auxVector.at(legendrePoint)! *
          this.useDerivativeShapeFunction(
            degreeOfFreedomIndex,
            zPositionsArray.at(legendrePoint)!,
            this.length
          ));

      const currentValue = sumVector.get([degreeOfFreedomIndex]) as number;
      const sum =
        currentValue + firstExpressionIntegration + secondExpressionIntegration;
      sumVector.set([degreeOfFreedomIndex], sum);
    }
    this.nonLinearNodalForces.set(
      [degreeOfFreedomIndex],
      ((sumVector.get([degreeOfFreedomIndex]) as number) * this.length) / 2
    );
  }

  checkCrossSectionIsFailed(): boolean {
    return this.crossSection.checkIsFailed();
  }

  getInitialNode(): NodeFiniteElement {
    return this.initialNode;
  }

  getFinalNode(): NodeFiniteElement {
    return this.finalNode;
  }

  getStiffnessMatrix(): mathjs.Matrix {
    return this.stiffnessMatrix;
  }

  getEquivalentNodalLoads(): mathjs.Matrix {
    return this.equivalentNodalLoads;
  }

  getNonLinearNodalForces(): mathjs.Matrix {
    return this.nonLinearNodalForces;
  }

  getLength(): number {
    return this.length;
  }

  setUniformLoads(uniformLoads: mathjs.Matrix) {
    this.uniformLoads = uniformLoads;
  }
}
