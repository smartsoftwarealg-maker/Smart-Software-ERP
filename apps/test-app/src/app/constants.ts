// common
import {MAIN_PAGE_URL} from '@ss/common/api-common';

export const LOOKUPS_URL = 'lookups';

// Stock

export const STOCK_APP_URL = 'stock';
export const STOCK_ARTICLES_URL = 'articles';
export const STOCK_VAT_URL = 'vat';
export const STOCK_MARKS_URL = 'marks';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_SUBCLASSES_URL = 'subclasses';

// FULL URLS
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_MARKS_URL].join('/');
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_URL].join('/');
export const ABS_STOCK_VAT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_VAT_URL].join('/');
