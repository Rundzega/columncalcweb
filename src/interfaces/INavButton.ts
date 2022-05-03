import { ButtonHTMLAttributes } from "react"

export type INavButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: string
}