import { Barchart } from './barchart';

export const scrapBarchart = async () =>
{
	const barchart = new Barchart();
	await barchart.init();
	await barchart.unusualActivity();
	await barchart.highestIV();
	await barchart.nakedPuts();
}
