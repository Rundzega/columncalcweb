export class TopNodalLoads {
  private readonly fz: number;

  private readonly hx: number;

  private readonly hy: number;

  private readonly px: number;

  private readonly py: number;

  private readonly mx: number;

  private readonly my: number;

  constructor(
    fz: number,
    hx: number,
    hy: number,
    px: number,
    py: number,
    mx: number,
    my: number
  ) {
    this.fz = fz;
    this.hx = hx;
    this.hy = hy;
    this.px = px;
    this.py = py;
    this.mx = mx;
    this.my = my;
  }

  getFz(): number {
    return this.fz;
  }

  getHx(): number {
    return this.hx;
  }

  getHy(): number {
    return this.hy;
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
