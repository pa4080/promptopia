import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
	messages: (await import(`./messages/${locale}.json`)).default,
}));

/**
 * Global request configuration
 * https://next-intl-docs.vercel.app/docs/next-13/server-components#global-request-configuration
 * 
import {headers} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
 
  // You can read from headers or cookies here
  timeZone: headers().get('x-time-zone') ?? 'Europe/Berlin'
}));
 */
