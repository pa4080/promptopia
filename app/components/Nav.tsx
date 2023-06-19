"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import logo from "@/public/icons/svg/mlt.promptopia.logo.favicon.svg";

const Nav: React.FC = () => {
	const t = useTranslations("Nav");

	const isUserLoggedIn = true;

	const signOut = () => {
		return null;
	};

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
							{t("createPost")}
						</Link>

						<button className="outline_btn" type="button" onClick={signOut}>
							{t("signOut")}
						</button>

						<Link href="/profile">
							<Image alt="Profile" height={30} src={logo} width={30} />
						</Link>
					</div>
				) : (
					<> </>
				)}
			</div>
		</nav>
	);
};

export default Nav;
