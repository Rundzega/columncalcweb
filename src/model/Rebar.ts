import { Concrete } from "./Concrete";
import { CrossSectionElement } from "./CrossSectionElement";
import { Steel } from "./Steel";

export class Rebar extends CrossSectionElement {
  private readonly diameter: number;

  private readonly area: number;

  private rebarFailed: boolean;

  private steelStress!: number;

  constructor(
    concreteClass: Concrete,
    steelClass: Steel,
    diameter: number,
    xCoord: number,
    yCoord: number
  ) {
    super(concreteClass, steelClass, xCoord, yCoord);

    this.diameter = diameter;
    this.area = (Math.PI * Math.pow(diameter, 2)) / 400; //cm2
    this.rebarFailed = false;
  }

  calculateSteelStress(): void {
    if (this.getStrain() <= this.getSteelClass().getYieldStrain()) {
      this.steelStress =
        this.getSteelClass().getYoungModulus() * this.getStrain();

      if (this.steelStress >= 0) {
        this.steelStress = Math.min(
          this.steelStress,
          this.getSteelClass().getFyd()
        );
      }
      if (this.steelStress < 0) {
        this.steelStress = Math.max(
          this.steelStress,
          -this.getSteelClass().getFyd()
        );
      }
    } else {
      this.rebarFailed = true;
      this.steelStress = 0;
    }
  }

  getDiameter(): number {
    return this.diameter;
  }

  getArea(): number {
    return this.area;
  }

  getSteelStress(): number {
    return this.steelStress;
  }

  isRebarFailed(): boolean {
    return this.rebarFailed;
  }
}
