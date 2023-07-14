/**
 * @desc The 'useBreakpoint()' hook is used to get the current
 * 			 screen breakpoint based on the TailwindCSS config.
 *
 * @usage
 *    import { useBreakpoint } from "@/hooks/useBreakpoint";
 *
 *    const { isAboveSm, isBelowSm, sm } = useBreakpoint("sm");
 *    console.log({ isAboveSm, isBelowSm, sm });
 *
 * @usage
 *    const { isAboveMd } = useBreakpoint("md");
 *    const { isAboveLg } = useBreakpoint("lg");
 *    const { isAbove2Xl } = useBreakpoint("2xl");
 *    console.log({ isAboveMd, isAboveLg, isAbove2Xl });
 *
 * @usage
 * 	In case Next.js complains the Server side rendering
 * 	doesn't match with the Client side:
 *
 * 		const [isBwXs, setIsBwXs] = React.useState<boolean>(false);
 * 		const { isBelowXs } = useBreakpoint("xs");
 *
 * 		useLayoutEffect(() => {
 *   		setIsBwXs(isBelowXs);
 * 		}, [isBelowXs]);
 *
 * @see https://stackoverflow.com/a/76630444/6543935
 * @requirements npm install react-responsive
 */
import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config, ScreensConfig } from "tailwindcss/types/config";

import tailwindConfig from "@/tailwind.config"; // Your tailwind config

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

const breakpoints = fullConfig?.theme?.screens || {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
};

type BreakpointKey = keyof ScreensConfig;

export function useBreakpoint<K extends string>(breakpointKey: K) {
	const breakpointValue = breakpoints[breakpointKey as BreakpointKey];
	const bool = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	});
	const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

	type KeyAbove = `isAbove${Capitalize<K>}`;
	type KeyBelow = `isBelow${Capitalize<K>}`;

	return {
		[breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
		[`isAbove${capitalizedKey}`]: !bool,
		[`isBelow${capitalizedKey}`]: bool,
	} as Record<typeof breakpointKey, number> & Record<KeyAbove | KeyBelow, boolean>;
}
