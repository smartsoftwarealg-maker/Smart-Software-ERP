import { MAIN_PAGE_URL } from '@ss/common/api-common';


// common
export const LOOKUPS_URL = 'lookups';
export const EXCHANGE_APP_URL = 'exchange';

// apps
export const ADMINISTRATION_APP_URL = 'administration';

// common
export const COMMON_REPORT_PARAMS_URL = 'report-params';

// Administration
export const ADMINISTRATION_COMPANY_URL = 'companies';
export const ADMINISTRATION_ACCCESSRIGHTS_URL = 'accessrights';
export const ADMINISTRATION_TRACEABILITY_URL = 'logging';
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
export const ABS_ADMINISTRATION_ACCESS_RIGHTS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ACCCESSRIGHTS_URL].join('/');
export const ABS_ADMINISTRATION_TRACEABILITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_TRACEABILITY_URL].join('/');
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
// exchange
export const EXCHANGE_AGENT_URL = 'agents';
export const EXCHANGE_CURRENCY_URL = 'currencies';
export const EXCHANGE_DEPOSIT_URL = 'deposits';
export const EXCHANGE_GLOBAL_BALANCE_URL = 'gbalance';
export const EXCHANGE_COMMISSION_URL = 'commissions';
export const EXCHANGE_TRANSFER_URL = 'ctransfers';
export const EXCHANGE_EXCHANGE_URL = 'exchanges';
export const EXCHANGE_HISTORY_URL = 'history';
export const EXCHANGE_BALANCE_URL = 'balance';
export const EXCHANGE_CBALANCE_URL = 'cbalance';
export const EXCHANGE_COMMISSIONS_URL = 'commissions';
export const EXCHANGE_DEPOSIT_TYPE_URL = 'deposit_types';
export const ABS_EXCHANGE_AGENT_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_AGENT_URL].join('/');
export const ABS_EXCHANGE_CURRENCY_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_CURRENCY_URL].join('/');
export const ABS_EXCHANGE_DEPOSIT_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_DEPOSIT_URL].join('/');
export const ABS_EXCHANGE_COMMISSION_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_COMMISSION_URL].join('/');
export const ABS_EXCHANGE_TRANSFER_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_TRANSFER_URL].join('/');
export const ABS_EXCHANGE_EXCHANGE_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_EXCHANGE_URL].join('/');
export const ABS_EXCHANGE_GLOBAL_BALANCE_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_GLOBAL_BALANCE_URL].join('/');
export const ABS_EXCHANGE_DEPOSIT_TYPE_URL = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, EXCHANGE_DEPOSIT_TYPE_URL].join('/');
export const ABS_EXCHANGE_REPORT_PARAMS = '/' + [MAIN_PAGE_URL, EXCHANGE_APP_URL, COMMON_REPORT_PARAMS_URL].join('/');

