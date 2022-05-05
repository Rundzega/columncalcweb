

export function fitLinearPolynomialFunction(ax:number, bx:number, ay:number, by:number) {
    const m = (by - ay) / (bx - ax)

    const n = by - m * bx
    
    return [m, n]
}