/**
 * @see https://tailwindcss.com/docs/configuration#referencing-in-java-script
 * @see https://stackoverflow.com/questions/61118060/how-to-access-tailwind-colors-from-javascript
 */
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss";

import { RecursiveKeyValuePair } from "tailwindcss/types/config";

import tailwindConfig from "@/tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

/**
 * @example Access the theme props
 * 
fullConfig?.theme?.width?.[4]; // => '1rem'
fullConfig.theme?.backdropBlur?.["2xl"]; // => '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
 */

export const mltColors = tailwindConfig.theme.extend.colors;
export const allColors = fullConfig!.theme!.colors as RecursiveKeyValuePair<string, string>;

export type ThemeColorsList = keyof typeof allColors;
