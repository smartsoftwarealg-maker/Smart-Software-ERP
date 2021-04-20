import { MAIN_PAGE_URL } from '@ss/common/api-common';


// common
export const LOOKUPS_URL = 'lookups';

// apps
export const ADMINISTRATION_APP_URL = 'administration';

// common
export const COMMON_REPORT_PARAMS_URL = 'report-params';

// Administration
export const ADMINISTRATION_COMPANY_URL = 'companies';
export const ADMINISTRATION_CENTER_URL = 'centers';
export const ADMINISTRATION_USER_URL = 'users';
export const ADMINISTRATION_ROLE_URL = 'roles';
export const ADMINISTRATION_BANK_URL = 'banks';
export const ADMINISTRATION_SMTP_URL = 'smtps';
export const ADMINISTRATION_REPORT_CATALOG_URL = 'report-catalog';
export const ADMINISTRATION_CITY_URL = 'cities';
export const ADMINISTRATION_COUNTRY_URL = 'countries';
export const ADMINISTRATION_WILAYA_URL = 'wilayas';


// #############
// # FULL URLS #
// #############

// administration
export const ABS_ADMINISTRATION_COMPANY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_COMPANY_URL].join('/');
export const ABS_ADMINISTRATION_USER_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_USER_URL].join('/');
export const ABS_ADMINISTRATION_ROLE_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ROLE_URL].join('/');
export const ABS_ADMINISTRATION_CENTER_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_CENTER_URL].join('/');
export const ABS_ADMINISTRATION_BANK_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_BANK_URL].join('/');
export const ABS_ADMINISTRATION_SMTP_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_SMTP_URL].join('/');
export const ABS_ADMINISTRATION_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_REPORT_CATALOG_URL].join('/');
export const ABS_ADMINISTRATION_CITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_CITY_URL].join('/');
export const ABS_ADMINISTRATION_COUNTRY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_COUNTRY_URL].join('/');
export const ABS_ADMINISTRATION_WILAYA_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_WILAYA_URL].join('/');

// ######################################
// #            Other things            #
// ######################################
