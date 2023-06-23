"use client";

import React, { useState, useEffect } from "react";
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

import Icon from "./fragments/Icon";

const providersIcons = ["google", "github"];

type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const Nav: React.FC = () => {
	const t = useTranslations("Nav");

	const { data: session } = useSession();

	// console.log(session);

	const [providers, setProviders] = useState<ProvidersType>(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getProviders();

			setProviders(response);
		})();
	}, []);

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

	const listLoginProviders = (
		<>
			{providers &&
				Object.values(providers).map((provider) => {
					if (providersIcons.includes(provider.id)) {
						return (
							<button
								key={provider.name}
								aria-label={t("signInWith", { provider: provider.name })}
								className="login_provider_btn"
								type="button"
								onClick={() => signIn(provider.id)}
							>
								<Icon icon={{ name: provider.id, size: 22 }} />
							</button>
						);
					}

					return (
						<button
							key={provider.name}
							className="_btn gray_invert "
							type="button"
							onClick={() => signIn(provider.id)}
						>
							{t("signIn")}
						</button>
					);
				})}
		</>
	);

	const avatar = (
		<div
			className={`flex_center w-12 h-12 cursor-pointer rounded-full z-10  ${
				toggleDropDown ? "bg-white drop-shadow-sm" : "bg-white drop-shadow-md "
			}`}
			onClick={openMobileNavBar}
		>
			<Image
				alt={t("altUserProfile")}
				className="rounded-full"
				height={37}
				src={session?.user?.image ?? logo}
				width={37}
			/>
		</div>
	);

	return (
		<nav className="flex_between w-full mb-16 pt-4 sm:pt-8 h-16">
			<Link
				className="flex gap-1 flex_center hover:drop-shadow-md transition-all duration-300"
				href="/"
			>
				<Image
					alt={t("altLogo")}
					className="object-contain w-10 h-10"
					height={40}
					src={logo}
					width={40}
				/>
				<p className="logo_text relative">
					<span className="logo_text_str0">{t("logoSubText.str0")}</span>
					<span className="max-md:block max-md:absolute max-md:right-0 max-md:text-sm max-md:-bottom-4">
						<span className="logo_text_str1">.{t("logoSubText.str1")}</span>
						<span className="logo_text_str1">{t("logoSubText.str2")}</span>
						<span className="logo_text_str3">{t("logoSubText.str3")}</span>
					</span>
				</p>
			</Link>

			<div className="sm:flex hidden">
				<div className="flex_center gap-3 md:gap-3">
					{session?.user ? (
						<>
							<Link className="_btn gray_invert " href="/create-prompt">
								{t("createPrompt")}
							</Link>

							<button className="_btn gray_light" type="button" onClick={() => signOut()}>
								{t("signOut")}
							</button>

							<Link href="/profile">{avatar}</Link>
						</>
					) : (
						listLoginProviders
					)}
				</div>
			</div>

			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						{avatar}
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
									className="mt-2 w-full _btn gray_heavy_invert "
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
					<div className="flex_center gap-3 md:gap-3">{listLoginProviders}</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
