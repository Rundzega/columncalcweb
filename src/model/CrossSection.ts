import { Concrete } from "./Concrete";
import { ConcreteRectangle } from "./ConcreteRectangle";
import { DiscretizedConcElement } from "./DiscretizedConcElement";
import { Rebar } from "./Rebar";
import { Steel } from "./Steel";

export class CrossSection {
  private readonly rectanglesList: ConcreteRectangle[];

  private readonly rebarsList: Rebar[];

  private readonly discretizedElementsList: DiscretizedConcElement[];

  private totalArea!: number;

  private xInertialMoment!: number;

  private yInertialMoment!: number;

  private readonly concreteClass: Concrete;

  private readonly steelClass: Steel;

  private xCenterOfGravity!: number;

  private yCenterOfGravity!: number;

  private hParam!: number;

  private yMaxParam!: number;

  private yMinParam!: number;

  private dParam!: number;

  private normalForcesSum!: number;

  private equilibriumNeutralAxisDepth!: number;

  private failXBendingMoment!: number;

  private failYBendingMoment!: number;

  private graphAngles!: number[];

  private internalMomentsDiagram!: [number, number][];

  constructor(
    rectanglesList: ConcreteRectangle[],
    rebarsList: Rebar[],
    concreteClass: Concrete,
    steelClass: Steel,
    numberOfDiscretizedX: number,
    numberOfDiscretizedY: number
  ) {
    if (
      rectanglesList.length == 0 ||
      rebarsList.length == 0 ||
      concreteClass == null ||
      steelClass == null
    ) {
      throw "Dados de entrada da seção transversal inválidos";
    }

    this.rectanglesList = rectanglesList;
    this.rebarsList = rebarsList;
    this.concreteClass = concreteClass;
    this.steelClass = steelClass;
    this.discretizedElementsList = [];
    this.setInertialMoments(numberOfDiscretizedX, numberOfDiscretizedY);
  }

  discretizeCrossSection(
    rectangle: ConcreteRectangle,
    numberOfDiscretizedX: number,
    numberOfDiscretizedY: number
  ): void {
    const elementWidth = rectangle.getWidth() / numberOfDiscretizedX;
    const elementHeight = rectangle.getHeight() / numberOfDiscretizedY;
    const elementHalfWidth = elementWidth / 2;
    const elementHalfHeight = elementHeight / 2;

    for (let i = 0; i < numberOfDiscretizedX; i++) {
      for (let j = 0; j < numberOfDiscretizedY; j++) {
        const xCenterCoord =
          rectangle.getVerticesArray()[0][0] +
          i * elementWidth +
          elementHalfWidth;
        const yCenterCoord =
          rectangle.getVerticesArray()[0][1] +
          j * elementHeight +
          elementHalfHeight;
        const concElement = new DiscretizedConcElement(
          this.concreteClass,
          this.steelClass,
          elementWidth,
          elementHeight,
          xCenterCoord,
          yCenterCoord
        );
        this.discretizedElementsList.push(concElement);
      }
    }
  }

  setElementsCenterOfGravity(): void {
    this.discretizedElementsList.forEach((element) => {
      element.setCoordRelativeToCSCenter(this);
    });

    this.rebarsList.forEach((rebar) => {
      rebar.setCoordRelativeToCSCenter(this);
    });
  }

  setInertialMoments(
    numberOfDiscretizedX: number,
    numberOfDiscretizedY: number
  ): void {
    let totalArea = 0;
    let xStaticalMoment = 0;
    let yStaticalMoment = 0;

    this.rectanglesList.forEach((rectangle) => {
      totalArea += rectangle.getArea();
      xStaticalMoment += rectangle.getXStaticalMoment();
      yStaticalMoment += rectangle.getYStaticalMoment();
      this.discretizeCrossSection(
        rectangle,
        numberOfDiscretizedX,
        numberOfDiscretizedY
      );
    });

    this.xCenterOfGravity = yStaticalMoment / totalArea;
    this.yCenterOfGravity = xStaticalMoment / totalArea;
    this.setElementsCenterOfGravity();

    this.totalArea = totalArea;
    this.xInertialMoment = 0;
    this.yInertialMoment = 0;

    this.rectanglesList.forEach((rectangle) => {
      const yDistance = this.yCenterOfGravity - rectangle.getyCenterCoord();
      const xDistance = this.xCenterOfGravity - rectangle.getxCenterCoord();

      this.xInertialMoment +=
        rectangle.getXInertialMoment() +
        rectangle.getArea() * Math.pow(yDistance, 2);
      this.yInertialMoment +=
        rectangle.getYInertialMoment() +
        rectangle.getArea() * Math.pow(xDistance, 2);
    });
  }

  rotateCoordinates(coordinates: number[], angle: number): number[] {
    const angleRadians = angle * (Math.PI / 180);

    const newCoordinates = [
      coordinates[0] * Math.cos(angleRadians) +
        coordinates[1] * Math.sin(angleRadians),
      -coordinates[0] * Math.sin(angleRadians) +
        coordinates[1] * Math.cos(angleRadians),
    ];

    return newCoordinates;
  }

  setCrossSectionCalcParameters(angle: number): void {
    let auxVerificationD: number[] = [];
    let auxVertices: number[][] = [];

    this.rectanglesList.forEach((rectangle) => {
      for (let i = 0; i < 4; i++) {
        const coordinates = [
          rectangle.getVerticesArray()[i][0] - this.xCenterOfGravity,
          rectangle.getVerticesArray()[i][1] - this.yCenterOfGravity,
        ];

        const rotatedVertice = this.rotateCoordinates(coordinates, angle);
        auxVertices.push(rotatedVertice);
      }
    });

    this.yMinParam = 0;
    this.yMaxParam = 0;

    auxVertices.forEach((vertice) => {
      this.yMaxParam = Math.max(vertice[1], this.yMaxParam);
      this.yMinParam = Math.max(vertice[1], this.yMinParam);
    });

    this.hParam = this.yMaxParam - this.yMinParam;

    this.rebarsList.forEach((rebar) => {
      const coordinates = [
        rebar.getxCoord() - this.xCenterOfGravity,
        rebar.getyCoord() - this.yCenterOfGravity,
      ];

      auxVerificationD.push(this.rotateCoordinates(coordinates, angle)[1]);
    });

    this.dParam = this.yMaxParam - Math.min(...auxVerificationD);
  }

  setNormalForcesSum(
    load: number,
    neutralAxisDepthAttempt: number,
    angle: number
  ): void {
    this.normalForcesSum = 0;

    const ultConcStrain = this.concreteClass.getUltConcStrain();
    const yieldSteelStrain = this.steelClass.getYieldStrain();
    let strainDomain: number;

    if (
      neutralAxisDepthAttempt <=
      (ultConcStrain / (yieldSteelStrain + ultConcStrain)) * this.dParam
    ) {
      strainDomain = 2;
    } else if (neutralAxisDepthAttempt <= this.hParam) {
      strainDomain = 3;
    } else {
      strainDomain = 5;
    }

    this.discretizedElementsList.forEach((element) => {
      const elementPosition = [
        element.getxCoord() - this.xCenterOfGravity,
        element.getyCoord() - this.yCenterOfGravity,
      ];
      const elementRotatedPosition = this.rotateCoordinates(
        elementPosition,
        angle
      );
      element.calculateStrain(
        elementRotatedPosition[1],
        neutralAxisDepthAttempt,
        this.yMaxParam,
        this.hParam,
        this.dParam,
        strainDomain
      );
      element.calculateConcStress(false);
      this.normalForcesSum += element.getConcreteStress() * element.getArea();
    });

    this.rebarsList.forEach((rebar) => {
      const rebarPosition = [
        rebar.getxCoord() - this.xCenterOfGravity,
        rebar.getyCoord() - this.yCenterOfGravity,
      ];
      const rebarRotatedPosition = this.rotateCoordinates(rebarPosition, angle);
      rebar.calculateStrain(
        rebarRotatedPosition[1],
        neutralAxisDepthAttempt,
        this.yMaxParam,
        this.hParam,
        this.dParam,
        strainDomain
      );
      rebar.calculateSteelStress();
      rebar.calculateConcStress(false);
      this.normalForcesSum -=
        (rebar.getSteelStress() - rebar.getConcreteStress()) * rebar.getArea();
    });

    this.normalForcesSum -= load;
  }

  setEquilibriumNeutralAxisDepth(
    load: number,
    tolerance: number,
    angle: number
  ): void {
    this.setCrossSectionCalcParameters(angle);
    let minNeutralAxisDepthAtt = -this.dParam;
    let maxNeutralAxisDepthAtt = 2 * this.dParam;
    let averageNeutralAxisDepthAtt =
      (minNeutralAxisDepthAtt + maxNeutralAxisDepthAtt) / 2;

    this.setNormalForcesSum(load, minNeutralAxisDepthAtt, angle);
    let minAttemptInternalForces = this.getNormalForcesSum();

    this.setNormalForcesSum(load, maxNeutralAxisDepthAtt, angle);
    let maxAttemptInternalForces = this.getNormalForcesSum();

    this.setNormalForcesSum(load, averageNeutralAxisDepthAtt, angle);
    let avgAttemptInternalForces = this.getNormalForcesSum();

    let counter = 1;

    while (minAttemptInternalForces * maxAttemptInternalForces > 0) {
      minNeutralAxisDepthAtt = maxNeutralAxisDepthAtt;
      maxAttemptInternalForces = maxNeutralAxisDepthAtt * 10;
      counter++;
      if (counter > 10) {
        // TODO: ERRORS
        throw "error";
      }
    }

    while ((maxNeutralAxisDepthAtt - minNeutralAxisDepthAtt) / 2 > tolerance) {
      if (minAttemptInternalForces * avgAttemptInternalForces < 0) {
        maxNeutralAxisDepthAtt = averageNeutralAxisDepthAtt;
        averageNeutralAxisDepthAtt =
          (minNeutralAxisDepthAtt + maxNeutralAxisDepthAtt) / 2;
      } else {
        minNeutralAxisDepthAtt = averageNeutralAxisDepthAtt;
        averageNeutralAxisDepthAtt =
          (minNeutralAxisDepthAtt + maxNeutralAxisDepthAtt) / 2;
        minAttemptInternalForces = avgAttemptInternalForces;
      }
      this.setNormalForcesSum(load, averageNeutralAxisDepthAtt, angle);
      avgAttemptInternalForces = this.getNormalForcesSum();
    }

    this.equilibriumNeutralAxisDepth = averageNeutralAxisDepthAtt;
  }

  setInternalBendingMoments() {
    this.failXBendingMoment = 0;
    this.failYBendingMoment = 0;

    this.discretizedElementsList.forEach((element) => {
      this.failXBendingMoment -=
        element.getConcreteStress() *
        element.getArea() *
        (element.getxCoord() - this.xCenterOfGravity);
      this.failYBendingMoment +=
        element.getConcreteStress() *
        element.getArea() *
        (element.getyCoord() - this.yCenterOfGravity);
    });

    this.rebarsList.forEach((rebar) => {
      this.failXBendingMoment -=
        (rebar.getSteelStress() - rebar.getConcreteStress()) *
        rebar.getArea() *
        (rebar.getxCoord() - this.xCenterOfGravity);
      this.failYBendingMoment +=
        (rebar.getSteelStress() - rebar.getConcreteStress()) *
        rebar.getArea() *
        (rebar.getyCoord() - this.yCenterOfGravity);
    });
  }

  setInternalMomentsDiagram(
    load: number,
    tolerance: number,
    stepAngle: number
  ): void {
    let graphAngle;

    let auxInternalMomentsDiagram: [number, number][] = [];
    let auxGraphAngles = [];

    for (let angle = 0; angle <= 360; angle += stepAngle) {
      this.setEquilibriumNeutralAxisDepth(load, tolerance, angle);
      this.setInternalBendingMoments();
      const auxAngle =
        Math.atan(
          Math.abs(this.failXBendingMoment) / Math.abs(this.failYBendingMoment)
        ) *
        (180 / Math.PI);

      if (this.failYBendingMoment == 0) {
        // No neutral axis case

        if (this.failXBendingMoment > 0) {
          graphAngle = 90;
          auxGraphAngles.push(graphAngle);
        } else if (this.failXBendingMoment < 0) {
          graphAngle = 270;
          auxGraphAngles.push(graphAngle);
        } else {
          graphAngle = 0;
          auxGraphAngles.push(graphAngle);
        }
      } else if (this.failYBendingMoment > 0 && this.failXBendingMoment > 0) {
        // First quadrant case

        graphAngle = auxAngle;
        auxGraphAngles.push(graphAngle);
      } else if (this.failYBendingMoment < 0 && this.failXBendingMoment >= 0) {
        //Second quadrant case

        graphAngle = 180 - auxAngle;
        auxGraphAngles.push(graphAngle);
      } else if (this.failYBendingMoment < 0 && this.failXBendingMoment < 0) {
        // Third quadrant case

        graphAngle = 180 + auxAngle;
        auxGraphAngles.push(graphAngle);
      } else {
        // Fourth quadrant case

        graphAngle = 360 - auxAngle;
        auxGraphAngles.push(graphAngle);
      }
      const internalMomentsComponent: [number, number] = [
        this.failYBendingMoment / 100,
        this.failXBendingMoment / 100,
      ];

      auxInternalMomentsDiagram.push(internalMomentsComponent);

      this.internalMomentsDiagram = auxInternalMomentsDiagram;
      this.graphAngles = auxGraphAngles;
    }
  }

  calcInternalForces(
    axialStrain: number,
    yCurvature: number,
    xCurvature: number,
    creep: boolean
  ): number[] {
    let ndNormalForces = 0;
    let myBendingMoment = 0;
    let mxBendingMoment = 0;

    let counter = 0;

    this.discretizedElementsList.forEach((element) => {
      const xRelativeCoord = element.getxCoordRelativeToCSCenter();
      const yRelativeCoord = element.getyCoordRelativeToCSCenter();

      element.setStrain(
        axialStrain +
          (yRelativeCoord * yCurvature) / 100 +
          (xRelativeCoord * xCurvature) / 100
      );
      element.calculateConcStress(creep);
      const concStress = element.getConcreteStress();
      const area = element.getArea();

      ndNormalForces += concStress * area;
      myBendingMoment += concStress * area * yRelativeCoord;
      mxBendingMoment += concStress * area * xRelativeCoord;
    });

    this.rebarsList.forEach((rebar) => {
      const xRelativeCoord = rebar.getxCoordRelativeToCSCenter();
      const yRelativeCoord = rebar.getyCoordRelativeToCSCenter();

      rebar.setStrain(
        axialStrain +
          (rebar.getyCoordRelativeToCSCenter() * yCurvature) / 100 +
          (rebar.getxCoordRelativeToCSCenter() * xCurvature) / 100
      );
      rebar.calculateSteelStress();
      rebar.calculateConcStress(creep);
      const concStress = rebar.getConcreteStress();
      const steelStress = rebar.getSteelStress();
      const area = rebar.getArea();

      ndNormalForces += (steelStress - concStress) * area;
      myBendingMoment += (steelStress - concStress) * area * yRelativeCoord;
      mxBendingMoment += (steelStress - concStress) * area * xRelativeCoord;
    });

    return [ndNormalForces, myBendingMoment / 100, mxBendingMoment / 100];
  }

  checkIsFailed(): boolean {
    this.discretizedElementsList.forEach((element) => {
      if (element.isConcreteFailed()) {
        throw "A seção transversal falhou: Concreto atingiu a deformação máxima permitida";
      }
    });

    this.rebarsList.forEach((rebar) => {
      if (rebar.isRebarFailed()) {
        throw "A seção transversal falhou: Aço atingiu a deformação máxima permitida";
      }
    });

    return false;
  }

  getxCenterOfGravity(): number {
    return this.xCenterOfGravity;
  }

  getyCenterOfGravity(): number {
    return this.yCenterOfGravity;
  }

  getConcreteClass(): Concrete {
    return this.concreteClass;
  }

  getXInertialMoment(): number {
    return this.xInertialMoment;
  }

  getYInertialMoment(): number {
    return this.yInertialMoment;
  }

  getTotalArea(): number {
    return this.totalArea;
  }

  getEquilibriumNeutralAxisDepth(): number {
    return this.equilibriumNeutralAxisDepth;
  }

  getNormalForcesSum(): number {
    return this.normalForcesSum;
  }

  getInternalMomentsDiagram(): [number, number][] {
    return this.internalMomentsDiagram;
  }

  getGraphAngles(): number[] {
    return this.graphAngles;
  }
}
