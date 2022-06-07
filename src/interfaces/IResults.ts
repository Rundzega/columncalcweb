export interface IResults {
  isResultsAvailable: boolean;
  uyDisplacements: number[] | null;
  uxDisplacements: number[] | null;
  ndForces: number[] | null;
  mxForces: number[] | null;
  myForces: number[] | null;
  ndMaxResistanceDiagramPoints: [number, number][] | null;
  ndMinResistanceDiagramPoints: [number, number][] | null;
  mxMinResistanceDiagramPoints: [number, number][] | null;
  mxMaxResistanceDiagramPoints: [number, number][] | null;
  myMinResistanceDiagramPoints: [number, number][] | null;
  myMaxResistanceDiagramPoints: [number, number][] | null;
  anglesResistanceDiagramPoints: number[] | null;
  lengthPoints: number[] | null;
  ndMaxSolicitingForces: number[] | null;
  ndMinSolicitingForces: number[] | null;
  mxMinSolicitingForces: number[] | null;
  mxMaxSolicitingForces: number[] | null;
  myMinSolicitingForces: number[] | null;
  myMaxSolicitingForces: number[] | null;
}
