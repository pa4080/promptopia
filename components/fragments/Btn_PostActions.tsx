import React, { CSSProperties } from "react";

import { ThemeColorsList } from "@/interfaces/ThemeTW";

import IconEmbedSvg, { IconEmbSvgPathType } from "@/components/fragments/IconEmbedSvg";

interface Props {
	text: string;
	onClick: () => void;
	c1?: ThemeColorsList;
	c2?: ThemeColorsList;
	bgColor?: string;
	icon?: {
		size?: number;
		color?: string;
		type?: IconEmbSvgPathType;
		style?: CSSProperties;
	};
	style?: CSSProperties;
}

const Btn_PostActions: React.FC<Props> = ({
	text,
	onClick,
	c1 = "mlt-orange-secondary",
	c2 = "mlt-orange-secondary",
	bgColor = "bg-white",
	icon = {
		type: "brush",
	},
	style,
}) => {
	return (
		<span className={`post_button ml-2 ${bgColor}`} style={{ ...style }} onClick={onClick}>
			<IconEmbedSvg
				color1={c1}
				color2={c2}
				height={20}
				opacity1="84"
				style={{ zIndex: 10, display: "inline-block", marginRight: "3px", ...icon.style }}
				type={icon.type}
				width={20}
			/>
			{text}
		</span>
	);
};

export default Btn_PostActions;
