/**
 * Used my "Shadcn-UI"
 * @see https://ui.shadcn.com/
 * @see "@/app/components/ui/"
 */
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
