import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function compare(a: string, b:string) {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}