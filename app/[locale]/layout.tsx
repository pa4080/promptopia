import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth-options";

import { PromptopiaContextProvider } from "@/contexts/PromptopiaContext";
import AuthSessionProvider from "@/contexts/AuthSessionProvider";
import Nav from "@/components/Nav";

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

	// const session = await getServerSession(authOptions);
	// console.log(session);

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
				{/* <Provider session={session}> */}
				<AuthSessionProvider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<NextIntlClientProvider locale={locale} messages={messages}>
							<div className="app_inner">
								<PromptopiaContextProvider>
									<Nav />
									{children}
								</PromptopiaContextProvider>
							</div>
						</NextIntlClientProvider>
					</main>
				</AuthSessionProvider>
			</body>
		</html>
	);
};

export default LocaleLayout;
