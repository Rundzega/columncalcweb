export class Concrete {
  private readonly gammaConc: number;

  private readonly creepCoefficient: number;

  private readonly fcd: number;

  private readonly effectiveCreepCoefficient: number;

  private readonly ultConcStrain: number;

  private readonly altConcStrain: number;

  private readonly ultConcStrainCreep: number;

  private readonly altConcStrainCreep: number;

  private readonly alpha: number;

  private readonly beta: number;

  private readonly nParam: number;

  private readonly youngModulus: number;

  private readonly altConcStrainModif: number;

  private readonly altConcStrainCreepModif: number;

  constructor(
    fck: number,
    gammaConc: number,
    creepCoefficient: number,
    alpha: number,
    beta: number
  ) {
    this.gammaConc = gammaConc;
    this.creepCoefficient = creepCoefficient;
    this.fcd = fck / (10 * gammaConc); // in kN/cm2
    this.effectiveCreepCoefficient = 0.57 * creepCoefficient;
    this.alpha = alpha;
    this.beta = beta;
    this.ultConcStrain =
      fck <= 50 ? 0.0035 : 0.0026 + 0.035 * Math.pow(90.0 - fck / 100.0, 4);
    this.altConcStrain =
      fck <= 50 ? 0.002 : 0.002 + 0.000085 * Math.pow(fck - 50, 0.53);
    this.ultConcStrainCreep =
      this.ultConcStrain * (1 + this.effectiveCreepCoefficient);
    this.altConcStrainCreep =
      this.altConcStrain * (1 + this.effectiveCreepCoefficient);

    // Stress strain diagram parameters
    this.youngModulus = (21500 * Math.pow(fck / 10, 1.0 / 3.0)) / 10; // in kN/cm2
    const ecd = this.youngModulus / 0.12;
    const auxNParam = (gammaConc * ecd * this.altConcStrain) / (alpha * fck);
    this.nParam = auxNParam <= 2 ? auxNParam : 2;
    const auxStrainParam =
      1 - (1 - Math.pow(this.beta / this.alpha, 1 / this.nParam));
    this.altConcStrainModif = this.altConcStrain * auxStrainParam;
    this.altConcStrainCreepModif = this.altConcStrainCreep * auxStrainParam;
  }

  getFcd(): number {
    return this.fcd;
  }

  getUltConcStrain(): number {
    return this.ultConcStrain;
  }

  getAltConcStrain(): number {
    return this.altConcStrain;
  }

  getUltConcStrainCreep(): number {
    return this.ultConcStrainCreep;
  }

  getAltConcStrainCreep(): number {
    return this.altConcStrainCreep;
  }

  getAlpha(): number {
    return this.alpha;
  }

  getBeta(): number {
    return this.beta;
  }

  getNParam(): number {
    return this.nParam;
  }

  getYoungModulus(): number {
    return this.youngModulus;
  }

  getAltConcStrainModif(): number {
    return this.altConcStrainModif;
  }

  getAltConcStrainCreepModif(): number {
    return this.altConcStrainCreepModif;
  }
}
