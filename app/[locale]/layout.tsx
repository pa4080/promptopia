import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { Inter } from "next/font/google";

import Nav from "@/app/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
	const t = await getTranslations();

	return {
		title: `${t("Site.title")} - ${t("Home.headingLn1")} ${t("Home.headingLn1")}`,
		description: t("Home.subHeading"),
	};
}

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

const LocaleLayout: React.FC<LocaleLayoutProps> = async ({ children, params }) => {
	const locale = useLocale();

	// Show a 404 error if the user requests an unknown locale
	if (params.locale !== locale) {
		notFound();
	}

	let messages;

	try {
		messages = (await import(`@/messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<div className="main">
					<div className="gradient" />
				</div>
				<main className="app">
					<NextIntlClientProvider locale={locale} messages={messages}>
						<Nav />

						{children}
					</NextIntlClientProvider>
				</main>
			</body>
		</html>
	);
};

export default LocaleLayout;
