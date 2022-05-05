import React from "react";

export type ILongitudinalResultsDisplay = React.SVGProps<SVGSVGElement> & {
    result: "ndForces" | "mxForces" | "myForces" | "uyDisplacements" | "uxDisplacements"
    unit: string,
    title: string,
}


