import React, { CSSProperties } from "react";

import { ThemeColorsList } from "@/interfaces/ThemeTW";

import IconEmbedSvg, { IconEmbSvgPathType } from "./IconEmbedSvg";

interface Props {
	text: string;
	c1?: ThemeColorsList;
	c2?: ThemeColorsList;
	op1?: string;
	op2?: string;
	bgColor?: ThemeColorsList;
	size?: number;
	height?: number;
	width?: number;
	type?: IconEmbSvgPathType;
	style?: CSSProperties;
	styleIcon?: CSSProperties;
	stylePosWrapper?: CSSProperties;
	wrapperClass?: string;
	onClick?: (e: React.SyntheticEvent) => void;
	isActive?: boolean;
}

const IconEmbedSvgPop: React.FC<Props> = ({
	text,
	c1 = "mlt-orange-secondary",
	c2 = "mlt-orange-dark",
	op1 = "84",
	op2 = "FF",
	bgColor = "bg-mlt-orange-secondary",
	type = "clipboard-check",
	style,
	styleIcon,
	stylePosWrapper,
	height = 22,
	width = 22,
	onClick,
	wrapperClass = "default",
	isActive, // force position_wrapper_default hover behavior
}) => {
	return (
		<div
			className={`icon_pop_style ${bgColor} ${isActive ? "active" : ""}`}
			style={{ width: "40px", height: "40px", ...style }}
			onClick={onClick}
		>
			<div
				className={`position_wrapper_${wrapperClass}`}
				style={{ transform: "translate(3.5px, -1px)", ...stylePosWrapper }}
			>
				<IconEmbedSvg
					alt={text}
					color1={c1}
					color2={c2}
					height={height}
					opacity1={op1}
					opacity2={op2}
					style={{ zIndex: 10, ...styleIcon }}
					type={type}
					width={width}
				/>
			</div>
		</div>
	);
};

export default IconEmbedSvgPop;
