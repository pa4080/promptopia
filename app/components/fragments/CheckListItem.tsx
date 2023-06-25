import React, { CSSProperties } from "react";

import IconEmbedSVG, { IconEmbSvgPathType } from "./IconEmbedSVG";

interface Props {
	size?: number;
	color?: string;
	checked?: boolean;
	type?: IconEmbSvgPathType;
	style?: CSSProperties;
}

const CheckListItem: React.FC<Props> = ({
	size = 32,
	color = "mlt-purple-secondary",
	checked,
	type = "check-square",
	style,
}) => {
	let opacity1 = "40";
	let opacity2 = "00";

	if (checked) {
		opacity1 = "40";
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

export default CheckListItem;
