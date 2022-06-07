export class Steel {
  private readonly fyd: number;

  private readonly youngModulus: number;

  private readonly yieldStrain: number;

  constructor(
    fyk: number,
    gammaSteel: number,
    youngModulus: number,
    yieldStrain: number
  ) {
    this.fyd = fyk / (10 * gammaSteel); // in kN/cm2
    this.youngModulus = youngModulus / 10; // in kn/cm2
    this.yieldStrain = yieldStrain;
  }

  getFyd(): number {
    return this.fyd;
  }

  getYoungModulus(): number {
    return this.youngModulus;
  }

  getYieldStrain(): number {
    return this.yieldStrain;
  }
}
