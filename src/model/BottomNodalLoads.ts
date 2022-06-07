export class BottomNodalLoads {
  private readonly px: number;

  private readonly py: number;

  private readonly mx: number;

  private readonly my: number;

  constructor(px: number, py: number, mx: number, my: number) {
    this.px = px;
    this.py = py;
    this.mx = mx;
    this.my = my;
  }

  getPx(): number {
    return this.px;
  }

  getPy(): number {
    return this.py;
  }

  getMx(): number {
    return this.mx;
  }

  getMy(): number {
    return this.my;
  }
}
