import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
	// const t = await getTranslations("Site");
	const t = await getTranslations();

	return {
		title: `${t("Index.title")} - ${t("Site.title")}`,
		description: t("Site.description"),
	};
}

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const locale = useLocale();

	// Show a 404 error if the user requests an unknown locale
	if (params.locale !== locale) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<div className="bg-mlt-dark-2 min-h-screen text-mlt-gray-5">{children}</div>
			</body>
		</html>
	);
}
