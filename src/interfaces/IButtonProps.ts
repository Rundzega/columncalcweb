import { ButtonHTMLAttributes } from "react";

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    result: "ndForces" | "mxForces" | "myForces" | "uyDisplacements" | "uxDisplacements",
    unit: string,
    title: string
};
