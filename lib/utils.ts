/**
 * Used my "Shadcn-UI"
 * @see https://ui.shadcn.com/
 */
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
