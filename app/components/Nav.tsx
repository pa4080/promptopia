"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
	signIn,
	signOut,
	useSession,
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
} from "next-auth/react";

import { BuiltInProviderType } from "next-auth/providers";

import logo from "@/public/icons/svg/mlt.promptopia.logo.favicon.svg";

type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const Nav: React.FC = () => {
	const t = useTranslations("Nav");

	const isUserLoggedIn = true;

	const [providers, setProviders] = useState<ProvidersType>(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getProviders();

			setProviders(response);
		})();
	}, []);

	const signOut = () => {
		return null;
	};

	const openMobileNavBar = () => {
		setToggleDropDown((prevState) => !prevState);
	};

	/**
	useEffect(() => {
		if (toggleDropDown) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [toggleDropDown]);
	*/

	return (
		<nav className="flex-between w-full mb-16 pt-4 sm:pt-8">
			<Link className="flex gap-1 flex-center" href="/">
				<Image
					alt="Promptopia MLT logo"
					className="object-contain"
					height={32}
					src={logo}
					width={32}
				/>
				<p className="logo_text">{t("logoSubText")}</p>
			</Link>

			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link className="black_btn" href="/create-prompt">
							{t("createPrompt")}
						</Link>

						<button className="outline_btn" type="button" onClick={signOut}>
							{t("signOut")}
						</button>

						<Link href="/profile">
							<Image
								alt={t("altUserProfile")}
								className="rounded-full"
								height={37}
								src={logo}
								width={37}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button key={provider.name} type="button" onClick={() => signIn(provider.id)}>
									{t("signIn")}
								</button>
							))}
					</>
				)}
			</div>

			<div className="sm:hidden flex relative">
				{isUserLoggedIn ? (
					<div className="flex">
						<div
							className={`flex-center w-12 h-12 cursor-pointer rounded-full z-10 ${
								toggleDropDown ? "bg-white drop-shadow-sm" : "bg-transparent"
							}`}
							onClick={openMobileNavBar}
						>
							<Image
								alt={t("altUserProfile")}
								className="rounded-full"
								height={37}
								src={logo}
								width={37}
							/>
						</div>
						{toggleDropDown && (
							<div className="dropdown">
								<Link
									className="dropdown_link mt-3"
									href="/profile"
									onClick={() => setToggleDropDown(false)}
								>
									{t("myProfile")}
								</Link>
								<Link
									className="dropdown_link"
									href="/create-prompt"
									onClick={() => setToggleDropDown(false)}
								>
									{t("createPrompt")}
								</Link>

								<button
									className="mt-2 w-full black_btn"
									type="button"
									onClick={() => {
										setToggleDropDown(false);
										signOut();
									}}
								>
									{t("signOut")}
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button key={provider.name} type="button" onClick={() => signIn(provider.id)}>
									{t("signIn")}
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
