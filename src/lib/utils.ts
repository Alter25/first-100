import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function randomNumber(min: number = 0, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function randomBool() {
  return randomNumber(0, 10) > 4 ? true : false;
}
