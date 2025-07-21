import { auth } from "@/auth"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Loading from '../../front/app/loading';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}