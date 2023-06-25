import React, { CSSProperties } from "react";

import twTheme from "@/tailwind.config";

const mltColors = twTheme.theme.extend.colors as unknown as { [key: string]: string };

export type IconEmbSvgPathType =
	| "check-circle"
	| "check-square"
	| "radio"
	| "circle"
	| "square"
	| "tick"
	| "cloud"
	| "cloud-arrow-up"
	| "cloud-check"
	| "cloud-binary";

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
			{/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
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
		case "cloud-arrow-up":
			return (
				<>
					<path
						d="M223 297c-9.4-9.4-9.4-24.6 0-33.9l80-80c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-39-39L344 392c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-134.1-39 39c-9.4 9.4-24.6 9.4-33.9 0z"
						fill={c2}
					/>
					<path
						d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
						fill={c1}
					/>
				</>
			);
		case "cloud-check":
			return (
				<>
					<path
						d="M433 207c9.4 9.4 9.4 24.6 0 33.9L305 369c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L399 207c9.4-9.4 24.6-9.4 33.9 0z"
						fill={c2}
					/>
					<path
						d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zM433 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L433 241z"
						fill={c1}
					/>
				</>
			);
		case "cloud-binary":
			return (
				<>
					<path
						d="M200 160c-22.1 0-40 17.9-40 40v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V200c0-22.1-17.9-40-40-40H200zm-8 40c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H200c-4.4 0-8-3.6-8-8V200zm112-40c-8.8 0-16 7.2-16 16s7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V176c0-8.8-7.2-16-16-16H304zm80 40v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V200c0-22.1-17.9-40-40-40H424c-22.1 0-40 17.9-40 40zm40-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H424c-4.4 0-8-3.6-8-8V200c0-4.4 3.6-8 8-8zM192 304c-8.8 0-16 7.2-16 16s7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V320c0-8.8-7.2-16-16-16H192zm120 0c-22.1 0-40 17.9-40 40v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V344c0-22.1-17.9-40-40-40H312zm-8 40c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8V344zm96-24c0 8.8 7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V320c0-8.8-7.2-16-16-16H416c-8.8 0-16 7.2-16 16z"
						fill={c2}
					/>
					<path
						d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm16-280v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V200c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40zm40-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H200c-4.4 0-8-3.6-8-8V200c0-4.4 3.6-8 8-8zm88-16c0 8.8 7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V176c0-8.8-7.2-16-16-16H304c-8.8 0-16 7.2-16 16zm136-16c-22.1 0-40 17.9-40 40v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V200c0-22.1-17.9-40-40-40H424zm-8 40c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H424c-4.4 0-8-3.6-8-8V200zM176 320c0 8.8 7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V320c0-8.8-7.2-16-16-16H192c-8.8 0-16 7.2-16 16zm96 24v32c0 22.1 17.9 40 40 40h16c22.1 0 40-17.9 40-40V344c0-22.1-17.9-40-40-40H312c-22.1 0-40 17.9-40 40zm40-8h16c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8H312c-4.4 0-8-3.6-8-8V344c0-4.4 3.6-8 8-8zm104-32c-8.8 0-16 7.2-16 16s7.2 16 16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V320c0-8.8-7.2-16-16-16H416z"
						fill={c1}
					/>
				</>
			);
		case "cloud":
			return (
				<>
					<path
						d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"
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
