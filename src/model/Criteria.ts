export class Criteria {
  private readonly finiteElementsNumber: number;

  private readonly xDiscretizationsNumber: number;

  private readonly yDiscretizationsNumber: number;

  private readonly diagramPointsNumber: number;

  private readonly loadIncrementsNumber: number;

  private readonly maxIterationsPerIncrement: number;

  private readonly displacementsTolerance: number;

  private readonly forcesTolerance: number;

  private readonly neutralAxisDepthTolerance: number;

  constructor(
    finiteElementsNumber: number,
    xDiscretizationsNumber: number,
    yDiscretizationsNumber: number,
    diagramPointsNumber: number,
    loadIncrementsNumber: number,
    maxIterationsPerIncrement: number,
    displacementsTolerance: number,
    forcesTolerance: number,
    neutralAxisDepthTolerance: number
  ) {
    this.finiteElementsNumber = finiteElementsNumber;
    this.xDiscretizationsNumber = xDiscretizationsNumber;
    this.yDiscretizationsNumber = yDiscretizationsNumber;
    this.diagramPointsNumber = diagramPointsNumber;
    this.loadIncrementsNumber = loadIncrementsNumber;
    this.maxIterationsPerIncrement = maxIterationsPerIncrement;
    this.displacementsTolerance = displacementsTolerance;
    this.forcesTolerance = forcesTolerance;
    this.neutralAxisDepthTolerance = neutralAxisDepthTolerance;
  }

  getFiniteElementsNumber(): number {
    return this.finiteElementsNumber;
  }

  getxDiscretizationsNumber(): number {
    return this.xDiscretizationsNumber;
  }

  getyDiscretizationsNumber(): number {
    return this.yDiscretizationsNumber;
  }

  getDiagramPointsNumber(): number {
    return this.diagramPointsNumber;
  }

  getLoadIncrementsNumber(): number {
    return this.loadIncrementsNumber;
  }

  getMaxIterationsPerIncrement(): number {
    return this.maxIterationsPerIncrement;
  }

  getDisplacementsTolerance(): number {
    return this.displacementsTolerance;
  }

  getForcesTolerance(): number {
    return this.forcesTolerance;
  }

  getNeutralAxisDepthTolerance(): number {
    return this.neutralAxisDepthTolerance;
  }
}
