// common
import {MAIN_PAGE_URL} from '@ss/common/api-common';

export const LOOKUPS_URL = 'lookups';

// Stock

export const STOCK_APP_URL = 'stock';
export const STOCK_ARTICLE_URL = 'articles';
export const STOCK_VAT_URL = 'vat';
export const STOCK_MARK_URL = 'marks';

// FULL URLS
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_MARK_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLE_URL].join('/');
export const ABS_STOCK_VAT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_VAT_URL].join('/');
