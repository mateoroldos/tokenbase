import { writable } from "svelte/store";
import type { Toast, ToastType } from "../types/toast.interface";
import {v4 as uuidv4} from 'uuid'
import { TOAST_COLOR, TOAST_TIMEOUT } from "../toast.config";
import { Type } from "lucide-svelte";

export const toasts = writable<Toast[]>([]);

export const addToast = (message: string, type: ToastType) => {
    // Create a unique ID so we can easily find/remove it
    // if it is dismissible/has a timeout.
    const toastId = uuidv4()
    let toast: Toast = {
      id: toastId,
      message: message,
      type: type,
      timeout: TOAST_TIMEOUT[type],
      date: new Date(),
      color: TOAST_COLOR[type]
    }
    // Setup some sensible defaults for a toast.
    const defaults = {
      toastId,
      type: "info",
      timeout: 3000,
    };
  
    // Push the toast to the top of the list of toasts
    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);
  
    // If toast is dismissible, dismiss it after "timeout" amount of time.
    if (toast.timeout) setTimeout(() => dismissToast(toastId), toast.timeout);
  };

  export const dismissToast = (id: string) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
  };