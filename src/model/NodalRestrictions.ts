export class NodalRestrictions {
  private readonly ux: boolean;

  private readonly uy: boolean;

  private readonly uz: boolean;

  private readonly rx: boolean;

  private readonly ry: boolean;

  constructor(ux: boolean, uy: boolean, uz: boolean, rx: boolean, ry: boolean) {
    this.ux = ux;
    this.uy = uy;
    this.uz = uz;
    this.rx = rx;
    this.ry = ry;
  }

  isUx(): boolean {
    return this.ux;
  }

  isUy(): boolean {
    return this.uy;
  }

  isUz(): boolean {
    return this.uz;
  }

  isRx(): boolean {
    return this.rx;
  }

  isRy(): boolean {
    return this.ry;
  }
}
