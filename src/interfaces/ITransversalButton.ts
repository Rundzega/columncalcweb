import { ButtonHTMLAttributes } from "react";
import { ITransversalResultsDisplay } from "./ITransversalResultsDisplay";

export type ITransversalButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    diagram: "ndMaxResistanceDiagramPoints" |  "ndMinResistanceDiagramPoints" | "mxMinResistanceDiagramPoints" |
     "mxMaxResistanceDiagramPoints" | "myMinResistanceDiagramPoints" | "myMaxResistanceDiagramPoints",
    forces: "ndMaxSolicitingForces" |  "ndMinSolicitingForces" | "mxMinSolicitingForces" |
    "mxMaxSolicitingForces" | "myMinSolicitingForces" | "myMaxSolicitingForces",
    title: string,
}