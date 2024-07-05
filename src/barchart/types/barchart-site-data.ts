import { Cookie } from 'puppeteer';

export interface BarchartSiteData {
	headers: Record<string, string>;
	cookies: Cookie[];
}
