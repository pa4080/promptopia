// Ref.: https://youtu.be/Xc6G3oV24yE
// This is done in much easier way by pure Tailwind CSS :)

import React from "react";

import twTheme from "@/tailwind.config";

interface Props {
	children: string;
}

const TextGradient: React.FC<Props> = ({ children }) => {
	const ThemeColors = twTheme.theme.extend.colors as unknown as { [key: string]: string };

	const colorLeft = ThemeColors["mlt-blue-primary"];
	const colorRight = ThemeColors["mlt-purple-primary"];
	const colorFallback = ThemeColors["mlt-gray-4"];

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
