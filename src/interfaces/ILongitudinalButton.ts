import { ButtonHTMLAttributes } from "react";

export type ILongitudinalButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    result: "ndForces" | "mxForces" | "myForces" | "uyDisplacements" | "uxDisplacements",
    unit: string,
    title: string
};
