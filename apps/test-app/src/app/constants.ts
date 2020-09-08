// common
export const LOOKUPS_URL = 'lookups';

// Stock

export const STOCK_APP_URL = 'stock';
export const STOCK_ARTICLE_URL = 'articles';

export const STOCK_MARK_URL = 'marks';

// FULL URLS

export const ABS_STOCK_MARKS_URL = '/' + [STOCK_APP_URL, LOOKUPS_URL, STOCK_MARK_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [STOCK_APP_URL, STOCK_ARTICLE_URL].join('/');
