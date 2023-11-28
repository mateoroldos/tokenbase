export interface Toast{
    id:string,
    timeout:number,
    type: ToastType,
    message: string,
    date: Date,
    color: string
}

export type ToastType = "error" | "info" | "success" | "warning";
