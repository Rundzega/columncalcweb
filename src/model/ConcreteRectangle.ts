export class ConcreteRectangle {
  private readonly width: number;

  private readonly height: number;

  private readonly xCenterCoord: number;

  private readonly yCenterCoord: number;

  private readonly area: number;

  private readonly verticesArray: number[][];

  private readonly xStaticalMoment: number;

  private readonly yStaticalMoment: number;

  private readonly xInertialMoment: number;

  private readonly yInertialMoment: number;

  constructor(
    width: number,
    height: number,
    xCenterCoord: number,
    yCenterCoord: number
  ) {
    this.width = width;
    this.height = height;
    this.area = width * height;
    this.xCenterCoord = xCenterCoord;
    this.yCenterCoord = yCenterCoord;
    this.verticesArray = [
      [xCenterCoord - width / 2, yCenterCoord - height / 2],
      [xCenterCoord + width / 2, yCenterCoord - height / 2],
      [xCenterCoord + width / 2, yCenterCoord + height / 2],
      [xCenterCoord - width / 2, yCenterCoord + height / 2],
    ];
    this.xStaticalMoment = this.area * yCenterCoord;
    this.yStaticalMoment = this.area * xCenterCoord;
    this.xInertialMoment = (width * Math.pow(height, 3)) / 12;
    this.yInertialMoment = (height * Math.pow(width, 3)) / 12;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getxCenterCoord(): number {
    return this.xCenterCoord;
  }

  getyCenterCoord(): number {
    return this.yCenterCoord;
  }

  getArea(): number {
    return this.area;
  }

  getVerticesArray(): number[][] {
    return this.verticesArray;
  }

  getXStaticalMoment(): number {
    return this.xStaticalMoment;
  }

  getYStaticalMoment(): number {
    return this.yStaticalMoment;
  }

  getXInertialMoment(): number {
    return this.xInertialMoment;
  }

  getYInertialMoment(): number {
    return this.yInertialMoment;
  }
}
