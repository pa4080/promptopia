import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-[pulse_1.6s_ease-in-out_infinite] rounded-md bg-muted", className)}
			{...props}
		/>
	);
}

export { Skeleton };
