import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { writeFileSync } from 'node:fs';

export class Barchart {
	private apiRequestHeaders: Record<string, string> = {};
	private apiUrl = 'https://www.barchart.com/proxies/core-api/v1/options/'

	async init() {
		const launchOptions: PuppeteerLaunchOptions = {
			devtools: false,
			headless: false,
			args: [`--window-size=1920,1800`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
		};

		const baseUrl = 'https://www.barchart.com';
		// const url = 'https://www.barchart.com/options/highest-implied-volatility';
		const url = 'https://www.barchart.com/options/naked-puts';
		const browser = await puppeteer.launch(launchOptions);
		const page = await browser.newPage();

		page.on('request', async (req) => {
			if (req.url().includes('www.barchart.com/proxies/core-api/v1')) {
				this.apiRequestHeaders = req.headers();
			}
		})

		await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 0 });

		await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
		const cookies = await page.cookies('https://www.barchart.com');

		this.apiRequestHeaders.cookie = cookies
			.map((cookie) => {
				return `${cookie.name}=${cookie.value}`
			})
			.join(';');

		await browser.close();
	}

	async unusualActivity() {
		const params: Record<string, string | number | boolean> = {
			fields: 'symbol%2CbaseSymbol%2CbaseLastPrice%2CbaseSymbolType%2CsymbolType%2CstrikePrice%2CexpirationDate%2CdaysToExpiration%2CbidPrice%2Cmidpoint%2CaskPrice%2ClastPrice%2Cvolume%2CopenInterest%2CvolumeOpenInterestRatio%2Cvolatility%2Cdelta%2CtradeTime%2CsymbolCode',
			limit: 1000,
			orderDir: 'desc',
			orderBy: 'volumeOpenInterestRatio',
			'between(volumeOpenInterestRatio%2C1.24%2C)': '',
			'between(lastPrice%2C.10%2C)': '',
			'between(tradeTime%2C2024-07-03%2C2024-07-05)': '',
			'between(volume%2C500%2C)': '',
			'between(openInterest%2C100%2C)': '',
			'in(exchange%2C(AMEX%2CNYSE%2CNASDAQ%2CINDEX-CBOE))': '',
			meta: 'field.shortName%2Cfield.type%2Cfield.description',
			hasOptions: true,
			raw: 1,
		}

		for (const baseSymbolTypes of ['stock', 'etf', 'index']) {
			params.baseSymbolTypes = baseSymbolTypes;
			const url = `${this.apiUrl}get?${Object.entries(params).map((entrie) => {
				return `${entrie[0]}=${entrie[1]}`
			}).join('&')}`;
			const res = await fetch(url, { headers: this.apiRequestHeaders, body: null, method: 'GET' });

			writeFileSync(`data/barchart/unusual-activity/unusual-activity.${baseSymbolTypes}.${(this.timestamp())}.json`, JSON.stringify(await res.json()));
		}
	}

	async highestIV() {
		const params: Record<string, string | number | boolean> = {
			fields: 'symbol%2CbaseSymbol%2CbaseLastPrice%2CbaseSymbolType%2CsymbolType%2CstrikePrice%2CexpirationDate%2CdaysToExpiration%2CbidPrice%2CaskPrice%2ClastPrice%2Cvolume%2CopenInterest%2CvolumeOpenInterestRatio%2Cdelta%2Cvolatility%2CtradeTime%2CsymbolCode%2ChasOptions',
			limit: 1000,
			orderDir: 'desc',
			orderBy: 'volatility',
			'between(lastPrice%2C.10%2C)': '',
			'between(daysToExpiration%2C15%2C)': '',
			'between(tradeTime%2C2024-07-03%2C2024-07-05)': '',
			'between(volatility%2C60%2C)': '',
			'between(volume%2C500%2C)': '',
			'between(openInterest%2C100%2C)': '',
			'in(exchange%2C(AMEX%2CNYSE%2CNASDAQ%2CINDEX-CBOE))': '',
			meta: 'field.shortName%2Cfield.type%2Cfield.description',
			hasOptions: true,
			raw: 1,
		}

		for (const baseSymbolTypes of ['stock', 'etf', 'index']) {
			params.baseSymbolTypes = baseSymbolTypes;
			const url = `${this.apiUrl}get?${Object.entries(params).map((entrie) => {
				return `${entrie[0]}=${entrie[1]}`
			}).join('&')}`;
			const res = await fetch(url, { headers: this.apiRequestHeaders, body: null, method: 'GET' });

			writeFileSync(`data/barchart/highest-iv/highest-iv.${baseSymbolTypes}.${this.timestamp()}.json`, JSON.stringify(await res.json()));
		}
	}

	async nakedPuts() {
		const params: Record<string, string | number | boolean> = {
			fields: 'symbol%2CbaseSymbol%2CbaseSymbolType%2CunderlyingLastPrice%2CexpirationDate%2CstrikePrice%2Cmoneyness%2CbidPrice%2CbreakEvenBid%2CbreakEvenPercent%2Cvolume%2CopenInterest%2Cvolatility%2Cdelta%2CotmProbability%2CpotentialReturn%2CpotentialReturnAnnual%2CtradeTime%2CexpirationType%2CexpirationDate%2CsymbolCode%2CsymbolType%2ChasOptions',
			orderBy: 'potentialReturn',
			orderDir: 'desc',
			limit: 1000,
			hasOptions: true,
			raw: 1,
			meta: 'field.shortName%2Cfield.type%2Cfield.description',
			'between(daysToExpiration,0,60)': '',
			'in(expirationType,(monthly))': '',
			'in(exchange,(AMEX,NYSE,NASDAQ,INDEX-CBOE))': '',
			'ge(tradeTime,previousTradingDay)': '',
			'in(baseSymbolType,(1))': '',
			'between(volume,100,)': '',
			'between(openInterest,500,)': '',
			'between(moneyness,,-1)': '',
			'gt(bidPrice,0.05)': '',
			'between(abs%28delta%29,0.2,0.4)': '',
		}

		const url = `${this.apiUrl}naked-puts?${Object.entries(params).map((entrie) => {
			return `${entrie[0]}${entrie[1] === '' ? '' : '='}${entrie[1]}`;
		}).join('&')}`;

		const res = await fetch(url, { headers: this.apiRequestHeaders, body: null, method: 'GET' });

		writeFileSync(`data/barchart/naked-puts/naked-puts.${this.timestamp()}.json`, JSON.stringify(await res.json()));
	}

	private timestamp() {
		return new Date().toISOString().substr(0, 19).replaceAll(':', '').replaceAll('-', '').replace('T', '.');
	}
}