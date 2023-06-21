// Ref.:  https://youtu.be/wm5gMKuwSYk?t=4550
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
	children: React.ReactNode;
}
const Provider: React.FC<Props> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
