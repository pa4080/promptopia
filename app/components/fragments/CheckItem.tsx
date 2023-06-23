import React, { CSSProperties } from "react";

import IconEmbedSVG, { IconEmbSvgPathType } from "./IconEmbedSVG";

interface Props {
	size?: number;
	color?: string;
	checked?: boolean;
	type?: IconEmbSvgPathType;
	style?: CSSProperties;
}

const CheckItem: React.FC<Props> = ({
	size = 24,
	color = "mlt-purple-secondary",
	checked,
	type = "check-square",
	style,
}) => {
	let opacity1 = "44";
	let opacity2 = "00";

	if (checked) {
		opacity1 = "44";
		opacity2 = "FF";
	}

	return (
		<IconEmbedSVG
			color1={color}
			color2={color}
			height={size}
			opacity1={opacity1}
			opacity2={opacity2}
			style={style}
			type={type}
			width={size}
		/>
	);
};

export default CheckItem;
