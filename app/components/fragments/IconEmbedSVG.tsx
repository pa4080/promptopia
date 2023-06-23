import React, { CSSProperties } from "react";

import twTheme from "@/tailwind.config";

const mltColors = twTheme.theme.extend.colors as unknown as { [key: string]: string };

export type IconEmbSvgPathType =
	| "check-circle"
	| "check-square"
	| "radio"
	| "circle"
	| "square"
	| "tick";

interface Props {
	width?: number;
	height?: number;
	color1?: string;
	color2?: string;
	opacity1?: string;
	opacity2?: string;
	type?: IconEmbSvgPathType;
	cursor?: "pointer" | "default" | "inherit";
	style?: CSSProperties;
}

/**
 * @param width Width of the SVG element
 * @param height Height of the SVG element
 * @param color1 Hex color code of the outer color
 * @param color2 Hex color code of the inner color
 * @param opacity1 Opacity of the outer color in hex
 * @param opacity2 Opacity of the inner color in hex
 * @param type Type of the SVG element: check, check-square...
 * @param cursor Cursor type: pointer, default, inherit
 * @returns SVG element
 */
const IconEmbedSVG: React.FC<Props> = ({
	width = 24,
	height,
	color1 = "mlt-purple-secondary",
	color2 = "mlt-purple-secondary",
	opacity1 = "44",
	opacity2 = "FF",
	type = "check-square",
	cursor = "pointer",
	style,
}) => {
	const viewBoxWidth = 512;
	const viewBoxHeight = 512;

	const displayWidth =
		!width && height ? (viewBoxWidth / viewBoxHeight) * height : width ?? viewBoxWidth;
	const displayHeight =
		!height && width ? (viewBoxHeight / viewBoxWidth) * width : height ?? viewBoxHeight;

	const applyColor1 = `${mltColors[color1]}${opacity1}`;
	const applyColor2 = `${mltColors[color2]}${opacity2}`;

	return (
		<svg
			fill="none"
			height={displayHeight}
			style={{ cursor, ...style }}
			viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
			width={displayWidth}
			xmlns="http://www.w3.org/2000/svg"
		>
			<SvgPathLib c1={applyColor1} c2={applyColor2} type={type} />
		</svg>
	);
};

export default IconEmbedSVG;

/**
 * The dual color SVG path library starts here.
 */

interface SvgPathLibProps {
	type: IconEmbSvgPathType;
	c1: string;
	c2: string;
}

const SvgPathLib: React.FC<SvgPathLibProps> = ({ type, c1, c2 }) => {
	switch (type) {
		case "check-circle":
			return (
				<>
					<path
						d="M369 175c9.4 9.4 9.4 24.6 0 33.9L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0z"
						fill={c2}
					/>
					<path
						d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
						fill={c1}
					/>
				</>
			);
		case "radio":
			return (
				<>
					<path d="M256 160a96 96 0 1 0 0 192 96 96 0 1 0 0-192z" fill={c2} />
					<path
						d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
						fill={c1}
					/>
				</>
			);
		case "check-square":
			return (
				<>
					<path
						d="M337 175c9.4 9.4 9.4 24.6 0 33.9L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0z"
						fill={c2}
					/>
					<path
						d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
						fill={c1}
					/>
				</>
			);
		case "tick":
			return (
				<>
					<path
						d="M337 175c9.4 9.4 9.4 24.6 0 33.9L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0z"
						fill={c2}
					/>
				</>
			);
		case "square":
			return (
				<>
					<path
						d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"
						fill={c1}
					/>
				</>
			);
		case "circle":
			return (
				<>
					<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill={c1} />
				</>
			);
	}
};
