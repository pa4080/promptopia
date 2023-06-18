// Ref.: https://youtu.be/Xc6G3oV24yE

import React from "react";

import twTheme from "@/tailwind.config";

interface Props {
	children: string;
}

const TextGradient: React.FC<Props> = ({ children }) => {
	const mltColors = twTheme.theme.extend.colors as unknown as { [key: string]: string };

	const colorLeft = mltColors["mlt-blue-primary"];
	const colorRight = mltColors["mlt-purple-primary"];
	const colorFallback = mltColors["mlt-gray-4"];

	return (
		<span
			style={{
				background: `${colorFallback} linear-gradient(to right, ${colorLeft}, ${colorRight})`,
				// backgroundImage: `linear-gradient(90deg, ${colorLeft} 0%, ${colorRight} 100%)`,
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
				// color: "transparent",
				// backgroundClip: "text",
			}}
		>
			{children}
		</span>
	);
};

export default TextGradient;
