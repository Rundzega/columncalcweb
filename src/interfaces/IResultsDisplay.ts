import React from "react";

export type IResultsDisplay = React.SVGProps<SVGSVGElement> & {
    result: "ndForces" | "mxForces" | "myForces" | "uyDisplacements" | "uxDisplacements",
    unit: string,
    title: string,
}


