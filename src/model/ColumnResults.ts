import { Column } from "./Column";
import { Criteria } from "./Criteria";
import { CrossSection } from "./CrossSection";

export class ColumnResults {
  private uyDisplacements: number[];

  private uxDisplacements: number[];

  private uzDisplacements: number[];

  private ndForces: number[];

  private mxForces: number[];

  private myForces: number[];

  private lengthPoints: number[];

  private ndMinResistanceDiagramPoints: [number, number][];

  private ndMaxResistanceDiagramPoints: [number, number][];

  private mxMinResistanceDiagramPoints: [number, number][];

  private mxMaxResistanceDiagramPoints: [number, number][];

  private myMinResistanceDiagramPoints: [number, number][];

  private myMaxResistanceDiagramPoints: [number, number][];

  private anglesResistanceDiagramPoints: number[];

  private ndMinSolicitingForces: number[];

  private ndMaxSolicitingForces: number[];

  private mxMinSolicitingForces: number[];

  private mxMaxSolicitingForces: number[];

  private myMinSolicitingForces: number[];

  private myMaxSolicitingForces: number[];

  constructor(column: Column, crossSection: CrossSection, criteria: Criteria) {
    this.uzDisplacements = column.getUzDisplacements();
    this.uxDisplacements = column.getUxDisplacements();
    this.uyDisplacements = column.getUyDisplacements();
    this.mxForces = column.getMxForces();
    this.myForces = column.getMyForces();
    this.ndForces = column.getNdForces();
    this.mxForces = column.getMxForces();
    this.lengthPoints = column.getLengthPoints();

    const ndMinIndex = this.ndForces.indexOf(Math.min(...this.ndForces));
    const mxMinIndex = this.mxForces.indexOf(Math.min(...this.mxForces));
    const myMinIndex = this.myForces.indexOf(Math.min(...this.myForces));
    const ndMaxIndex = this.ndForces.indexOf(Math.max(...this.ndForces));
    const mxMaxIndex = this.mxForces.indexOf(Math.max(...this.mxForces));
    const myMaxIndex = this.myForces.indexOf(Math.max(...this.myForces));

    this.ndMinResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      ndMinIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.ndMaxResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      ndMaxIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.mxMinResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      mxMinIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.mxMaxResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      mxMaxIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.myMinResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      myMinIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.myMaxResistanceDiagramPoints = column.getResistanceDiagramPoints(
      crossSection,
      criteria,
      myMaxIndex,
      this.ndForces,
      this.mxForces,
      this.myForces
    );

    this.anglesResistanceDiagramPoints =
      column.getAnglesResistanceDiagram(crossSection);

    this.ndMinSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      ndMinIndex
    );

    this.ndMaxSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      ndMaxIndex
    );

    this.mxMinSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      mxMinIndex
    );

    this.mxMaxSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      mxMaxIndex
    );

    this.myMinSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      myMinIndex
    );

    this.myMaxSolicitingForces = column.getSolicitingForcesPoints(
      this.mxForces,
      this.myForces,
      myMaxIndex
    );
  }

  getUyDisplacements(): number[] {
    return this.uyDisplacements;
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

  getMxForces(): number[] {
    return this.mxForces;
  }

  getMyForces(): number[] {
    return this.myForces;
  }

  getLengthPoints(): number[] {
    return this.lengthPoints;
  }

  getNdMinResistanceDiagramPoints(): [number, number][] {
    return this.ndMinResistanceDiagramPoints;
  }

  getNdMaxResistanceDiagramPoints(): [number, number][] {
    return this.ndMaxResistanceDiagramPoints;
  }

  getMxMinResistanceDiagramPoints(): [number, number][] {
    return this.mxMinResistanceDiagramPoints;
  }

  getMxMaxResistanceDiagramPoints(): [number, number][] {
    return this.mxMaxResistanceDiagramPoints;
  }

  getMyMinResistanceDiagramPoints(): [number, number][] {
    return this.myMinResistanceDiagramPoints;
  }

  getMyMaxResistanceDiagramPoints(): [number, number][] {
    return this.myMaxResistanceDiagramPoints;
  }

  getAnglesResistanceDiagramPoints(): number[] {
    return this.anglesResistanceDiagramPoints;
  }

  getNdMinSolicitingForces(): number[] {
    return this.ndMinSolicitingForces;
  }

  getNdMaxSolicitingForces(): number[] {
    return this.ndMaxSolicitingForces;
  }

  getMxMinSolicitingForces(): number[] {
    return this.mxMinSolicitingForces;
  }

  getMxMaxSolicitingForces(): number[] {
    return this.mxMaxSolicitingForces;
  }

  getMyMinSolicitingForces(): number[] {
    return this.myMinSolicitingForces;
  }

  getMyMaxSolicitingForces(): number[] {
    return this.myMaxSolicitingForces;
  }
}
