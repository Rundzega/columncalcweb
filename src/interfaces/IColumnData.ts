
export interface IColumnData {
    Length: number,
    Concrete: {
        fck: number,
        gammaConc: number,
        alpha: number,
        beta: number,
        creepCoefficient: number
    },
    Steel: {
        fyk: number,
        gammaSteel: number,
        youngModulus: number,
        yieldStrain: number
    },
    BottomRestrictions: {
        ux: boolean,
        uy: boolean,
        uz: boolean,
        rx: boolean,
        ry: boolean
    },
    TopRestrictions: {
        ux: boolean,
        uy: boolean,
        uz: boolean,
        rx: boolean,
        ry: boolean
    },
    BottomLoads: {
        px: number,
        py: number,
        mx: number,
        my: number
    },
    TopLoads: {
        fz: number,
        hx: number,
        hy: number,
        px: number,
        py: number,
        mx: number,
        my: number
    },
    Criteria: {
        finiteElementsNumber: number,
        xDiscretizationsNumber: number,
        yDiscretizationsNumber: number,
        diagramPointsNumber: number,
        loadIncrementsNumber: number,
        maxIterationsPerIncrement: number,
        displacementsTolerance: number,
        forcesTolerance: number,
        neutralAxisDepthTolerance: number
    }
    RebarList: {
        concreteClass: {
            fck: number,
            gammaConc: number,
            alpha: number,
            beta: number,
            creepCoefficient: number
        },
        steelClass: {
            fyk: number,
            gammaSteel: number,
            youngModulus: number,
            yieldStrain: number
        },
        diameter: number,
        xCoord: number,
        yCoord: number
    }[],
    RectangleList: {
        width: number,
        height: number,
        xCenterCoord: number,
        yCenterCoord: number
    }[]
}