import { Lookup } from '@ss/common/api-lookup';

export const APP_DASHBOARD = 1;
export const APP_PURCHASE = 2;
export const APP_STOCK = 3;
export const APP_PAYROLL = 4;
export const APP_HR = 5;
export const APP_ASSET = 6;
export const APP_SALES = 7;
export const APP_TREASURY = 8;
export const APP_LTM = 9;
export const APP_SCHEDULED_SALES = 10;
export const APP_ACCOUNTING = 11;

export const INDEX_PAGE_URL = 'index';
export const MAIN_PAGE_URL = 'app';
export const PROFILE_PAGE_URL = 'profile';
export const LOGIN_URL = 'login';
export const HOME_URL = 'app/cspace/home';
export const UPDATE_PASSWORD_URL = 'update-password';
export const AUTH_2FA_URL = 'auth-2fa';
export const BLOCKED_REASON_PAGE_URL = 'block-page';

export const LIST_URL = '';


export const LINES_DETAIL_URL = 'lines';


export const CENTER_SELECT_URL = 'cclogin';
// FULL URLS
export const ABS_INDEX_URL = '/' + [MAIN_PAGE_URL, INDEX_PAGE_URL].join('/');
export const APPLICATIONS_URL = '/applications';

export const APPLICATIONS: Lookup[] = [
    { id: APP_DASHBOARD,       description: 'DASHBOARD' },
    { id: APP_ACCOUNTING,      description: 'ACCOUNTING_APP'},
    { id: APP_PURCHASE,        description: 'PURCHASES' },
    { id: APP_STOCK,           description: 'STOCK'     },
    { id: APP_SALES,           description: 'SALES'     },
    { id: APP_PAYROLL,         description: 'PAYROLL'   },
    { id: APP_HR,              description: 'HR'        },
    { id: APP_ASSET,           description: 'ASSETS'    },
    { id: APP_TREASURY,        description: 'TREASURY'  },
    { id: APP_LTM,             description: 'LTM'       },
    { id: APP_SCHEDULED_SALES, description: 'SCHEDULED_SALES'  },
];

