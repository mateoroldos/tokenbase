import type { ToastType } from "./types/toast.interface";

export const TOAST_TIMEOUT: {
    [key in ToastType]: number
} = {
    error: 20000,
    success: 4000,
    info: 10000,
    warning: 10000
}

export const TOAST_COLOR: {
    [key in ToastType]: string
} = {
    error: "red",
    success: "green",
    info: "blue",
    warning: "orange"
}
