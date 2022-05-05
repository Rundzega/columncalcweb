import React from "react";

export type ITransversalResultsDisplay = React.SVGProps<SVGSVGElement> & {
    diagram: "ndMaxResistanceDiagramPoints" |  "ndMinResistanceDiagramPoints" | "mxMinResistanceDiagramPoints" |
     "mxMaxResistanceDiagramPoints" | "myMinResistanceDiagramPoints" | "myMaxResistanceDiagramPoints",
    forces: "ndMaxSolicitingForces" |  "ndMinSolicitingForces" | "mxMinSolicitingForces" |
    "mxMaxSolicitingForces" | "myMinSolicitingForces" | "myMaxSolicitingForces",
    title: string,
}


