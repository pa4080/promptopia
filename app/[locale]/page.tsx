import React from "react";

import { useTranslations } from "next-intl";

import TextGradient from "@/app/components/fragments/TextGradient";

// http://localhost:3000
// http://localhost:3000/bg

export default function Index() {
	const t = useTranslations("Index");

	return (
		<div className="flex flex-auto w-full h-screen items-center justify-center">
			<h1 className="text-4xl md:text-6xl text-center font-bold">
				<TextGradient>{t("title")}</TextGradient>
			</h1>
		</div>
	);
}
