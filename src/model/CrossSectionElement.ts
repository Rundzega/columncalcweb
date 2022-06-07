import { Concrete } from "./Concrete";
import { CrossSection } from "./CrossSection";
import { Steel } from "./Steel";

export class CrossSectionElement {
  private readonly xCoord: number;

  private readonly yCoord: number;

  private readonly concreteClass: Concrete;

  private readonly steelClass: Steel;

  private strain!: number;

  private concreteStress!: number;

  private concreteFailed!: boolean;

  private xCoordRelativetoCSCenter!: number;

  private yCoordRelativeToCSCenter!: number;

  constructor(
    concreteClass: Concrete,
    steelClass: Steel,
    xCoord: number,
    yCoord: number
  ) {
    this.concreteClass = concreteClass;
    this.steelClass = steelClass;

    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  calculateConcStress(creep: boolean) {
    const concAltStrainModif = creep
      ? this.concreteClass.getAltConcStrainCreepModif()
      : this.concreteClass.getAltConcStrainModif();
    const concAltStrain = creep
      ? this.concreteClass.getAltConcStrainCreep()
      : this.concreteClass.getAltConcStrain();

    if (this.strain < 0) {
      if (Math.abs(this.strain) < concAltStrainModif) {
        this.concreteStress = -(
          this.concreteClass.getAlpha() *
          this.concreteClass.getFcd() *
          (1 -
            Math.pow(
              1 - Math.abs(this.strain) / concAltStrain,
              this.concreteClass.getNParam()
            ))
        );
      } else if (
        Math.abs(this.strain) <= this.concreteClass.getUltConcStrainCreep()
      ) {
        this.concreteStress = -(
          this.concreteClass.getBeta() * this.concreteClass.getFcd()
        );
      } else {
        this.concreteStress = 0;
      }
    } else {
      this.concreteStress = 0;
      this.concreteFailed = !creep;
    }
  }

  getStrain(): number {
    return this.strain;
  }

  calculateStrain(
    yLine: number,
    neutralAxisCoord: number,
    yMaxParam: number,
    hParam: number,
    dParam: number,
    strainDomain: number
  ): void {
    const diParam = yMaxParam - yLine;

    switch (strainDomain) {
      case 2:
        this.strain = -(
          this.steelClass.getYieldStrain() *
          ((neutralAxisCoord - diParam) / (dParam - neutralAxisCoord))
        );
        break;
      case 3:
      case 4:
        this.strain = -(
          this.concreteClass.getUltConcStrain() *
          ((neutralAxisCoord - diParam) / neutralAxisCoord)
        );
        break;
      default:
        const concAltStrain = this.concreteClass.getAltConcStrain();
        const concUltStrain = this.concreteClass.getUltConcStrain();

        this.strain = -(
          concAltStrain *
          ((neutralAxisCoord - diParam) /
            (neutralAxisCoord - (1 - concAltStrain / concUltStrain) * hParam))
        );
        break;
    }
  }

  setStrain(strain: number): void {
    this.strain = strain;
  }

  setCoordRelativeToCSCenter(crossSection: CrossSection): void {
    this.xCoordRelativetoCSCenter =
      this.xCoord - crossSection.getxCenterOfGravity();
    this.yCoordRelativeToCSCenter =
      this.yCoord - crossSection.getyCenterOfGravity();
  }

  getSteelClass(): Steel {
    return this.steelClass;
  }

  getConcreteStress(): number {
    return this.concreteStress;
  }

  isConcreteFailed(): boolean {
    return this.concreteFailed;
  }

  getxCoord(): number {
    return this.xCoord;
  }

  getyCoord(): number {
    return this.yCoord;
  }

  getxCoordRelativeToCSCenter(): number {
    return this.xCoordRelativetoCSCenter;
  }

  getyCoordRelativeToCSCenter(): number {
    return this.yCoordRelativeToCSCenter;
  }
}
