import { Concrete } from "./Concrete";
import { CrossSectionElement } from "./CrossSectionElement";
import { Steel } from "./Steel";

export class DiscretizedConcElement extends CrossSectionElement {
  private readonly area: number;

  private verticesArray: number[][];

  constructor(
    concreteClass: Concrete,
    steelClass: Steel,
    width: number,
    height: number,
    xCenterCoord: number,
    yCenterCoord: number
  ) {
    super(concreteClass, steelClass, xCenterCoord, yCenterCoord);
    this.area = width * height;
    this.verticesArray = [
      [xCenterCoord - width / 2, yCenterCoord - height / 2],
      [xCenterCoord + width / 2, yCenterCoord - height / 2],
      [xCenterCoord + width / 2, yCenterCoord + height / 2],
      [xCenterCoord - width / 2, yCenterCoord + height / 2],
    ];
  }

  getArea(): number {
    return this.area;
  }
}
