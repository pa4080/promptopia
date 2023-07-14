"use client";
import React, { useLayoutEffect } from "react";
import { useTranslations } from "next-intl";

import { usePromptopiaContext } from "@/contexts/PromptopiaContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";

import IconEmbedSvg from "./fragments/IconEmbedSvg";

const Footer: React.FC = () => {
	const { postCardListSize } = usePromptopiaContext();
	const t = useTranslations("Footer");

	const [isBwXs, setIsBwXs] = React.useState<boolean>(false);
	const { isBelowXs } = useBreakpoint("xs");

	useLayoutEffect(() => {
		setIsBwXs(isBelowXs);
	}, [isBelowXs]);

	return (
		<footer className="page_footer" style={{ width: `${postCardListSize ?? 480}px` }}>
			<div className="footer_col footer_col_1">Footer col 1</div>
			<div className="footer_col footer_col_2">Footer col 2</div>
			<div className="footer_col footer_col_3">
				<a
					aria-label={t("projectLink")}
					href={process.env.NEXT_PUBLIC_PROJECT_REPOSITORY}
					rel="noreferrer"
					target="_blank"
				>
					<span className="inline-flex gap-2 items-center text-mlt-dark-6 font-Unicephalon text-sm opacity-80 hover:opacity-95 active:brightness-125">
						{isBwXs ? t("projectDescShort") : t("projectDesc")}
						<IconEmbedSvg color2="mlt-dark-6" style={{ display: "inline-block" }} type="github" />
					</span>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
