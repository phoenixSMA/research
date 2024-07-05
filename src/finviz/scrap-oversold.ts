import { JSDOM } from 'jsdom';
import { writeFileSync } from 'node:fs';

const getScreenerTable = async (url: string): Promise<[HTMLTableElement, number]> => {
	const response = await fetch(url);
	const content = await response.text();
	const dom = new JSDOM(content);
	const pageSelector = dom.window.document.querySelector('select#pageSelect') as HTMLSelectElement;
	const pages = pageSelector.options.length

	return [dom.window.document.querySelector('table.screener_table') as HTMLTableElement, pages];
};

export const scrapOverSold = async () => {
	const url = 'https://finviz.com/screener.ashx?v=131&f=sh_opt_option,sh_short_o30';
	let [screenerTable, pages] = await getScreenerTable(url);

	const headers = Array.from(screenerTable.tHead.rows[0].cells)
		.map(cell => {
			return cell.textContent
				.toLowerCase()
				.replaceAll('\n', '')
				.replaceAll('.', '')
				.replace(/[^a-z0-9](.)/g, (_, c) => c.toUpperCase())
				.replaceAll(' ', '');
		});

	const result: string[] = [headers.join(',')];
	for (let page = 1; page <= pages; page++) {
		Array.from(screenerTable.tBodies[0].rows)
			.forEach(row => {
				const cellsConent: string[] = Array.from(row.cells)
					.map(cell => {
						return cell.textContent;
					})
				result.push(cellsConent.join(','));
			});

		if (page < pages) {
			[screenerTable] = await getScreenerTable(`${url}&r=${page * 2}1`);
		}
	}

	const timestamp = new Date().toISOString().substr(0, 19).replaceAll(':', '').replaceAll('-', '').replace('T', '.');

	writeFileSync(`data/finviz/oversold.${timestamp}.csv`, result.join('\n'));
	console.log(result);
}