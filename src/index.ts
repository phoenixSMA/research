import { scrapOverSold } from './finviz/scrap-oversold';
import { scrapBarchart } from './barchart/scrap-barchart';

scrapOverSold().then();
scrapBarchart().then();