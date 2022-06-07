import * as mathjs from "mathjs";

export class NodeFiniteElement {
  private readonly id: number;

  private readonly zPosition: number;

  private nodalRestrictions: mathjs.Matrix;

  private nodalLoads: mathjs.Matrix;

  private nodalDisplacements: mathjs.Matrix;

  constructor(id: number, zPosition: number) {
    this.id = id;
    this.zPosition = zPosition;
    this.nodalRestrictions = mathjs.matrix(mathjs.ones(5));
    this.nodalLoads = mathjs.matrix(mathjs.zeros(5));
    this.nodalDisplacements = mathjs.matrix(mathjs.zeros(5));
  }

  updateNodalDisplacements(globalDisplacementsVector: mathjs.Matrix) {
    this.nodalDisplacements = mathjs.subset(
      globalDisplacementsVector,
      mathjs.index(mathjs.range(5 * this.id, 5 * this.id + 5))
    );
  }

  getNodalDisplacements(): mathjs.Matrix {
    return this.nodalDisplacements;
  }

  getNodalRestrictions(): mathjs.Matrix {
    return this.nodalRestrictions;
  }

  getNodalLoads(): mathjs.Matrix {
    return this.nodalLoads;
  }

  getId(): number {
    return this.id;
  }

  getZPosition(): number {
    return this.zPosition;
  }

  setNodalRestrictions(nodalRestrictions: mathjs.Matrix): void {
    this.nodalRestrictions = nodalRestrictions.clone();
  }

  setNodalLoads(nodalLoads: mathjs.Matrix): void {
    this.nodalLoads = nodalLoads.clone();
  }
}
