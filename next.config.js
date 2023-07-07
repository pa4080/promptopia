/* eslint-disable @typescript-eslint/no-var-requires */
const withNextIntl = require("next-intl/plugin")(
	// This is the default (also the `src` folder is supported out of the box)
	"./i18n.ts"
);

/**
 * Tutorial Ref.:
 * > https://github.com/adrianhajdin/project_next_13_ai_prompt_sharing/blob/main/next.config.js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// https://nextjs.org/docs/messages/next-image-unconfigured-host
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	/**
	env: {
		HOT_JAR_ID: process.env.HOT_JAR_ID,
		OPTIMIZE_ID: process.env.OPTIMIZE_ID,
		GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
		GTAG: process.env.GTAG,
		REACT_APP_GATAG: process.env.REACT_APP_GATAG,
	},
	*/
	/**
	async rewrites() {
		return [
			{
				source: "/api_local/:path*",
				destination: "http://localhost:3001/api/:path*",
			},
			{
				source: "/api_tmp/:path*",
				destination: "https://appstimate_api.metalevel.tech/api/:path*",
			},
			{
				source: "/api_production/:path*",
				destination: "https://api.appstimate.io/api/:path*",
			},
		];
	},
   */
	async headers() {
		return [
			{
				source: "/:all*(svg|jpg|png|webp|webm|mkv|avi|mp4)",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=604800, s-maxage=604800, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = withNextIntl(nextConfig);
