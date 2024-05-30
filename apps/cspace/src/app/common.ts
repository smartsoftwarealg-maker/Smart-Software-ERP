import { MAIN_PAGE_URL } from '@ss/common/api-common';

// CSPACE
export const CSPACE_CART_URL = 'cart';
export const CSPACE_CARTDETAIL_URL = 'cartdetail';
export const COMMON_CUSTOMER_PROFILE_URL = 'profile';
export const SS_PARTNER_SCHEDULE_URL     = 'customer-schedules';
export const SS_QUOTA_URL     = 'sales-quotas';
export const SS_COMPLAINTS_URL     = 'sales-complaints';
export const SS_CUSTOMER_BALANCE_URL     = 'balance';
export const SS_HOME_PAGE_URL     = 'home';
export const SS_CUSTOMER_HISTORY_URL     = 'customer-history';
export const SS_PAYMENT_URL     = 'customer-payments';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const CSPACE_APP_URL = 'cspace';

// common
export const CSPACE_REPORTS_URL = 'capace-reports';
export const LOOKUPS_URL = 'lookups';

// Administration
export const ADMINISTRATION_REPORT_CATALOG_URL = 'report-catalog';


// #############
// # FULL URLS #
// #############

// administration
export const ABS_ADMINISTRATION_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_REPORT_CATALOG_URL].join('/');

// ######################################
// #            Other things            #
// ######################################
// cspace
export const ABS_CUSTOMER_PROFILE_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, COMMON_CUSTOMER_PROFILE_URL].join('/');
export const ABS_CART = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, CSPACE_CART_URL].join('/');
export const ABS_CUSTOMER_SCHEDULES_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_PARTNER_SCHEDULE_URL].join('/');
export const ABS_SALES_QUOTAS_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_QUOTA_URL].join('/');
export const ABS_CUSTOMER_BALANCE_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_CUSTOMER_BALANCE_URL].join('/');
export const ABS_CUSTOMER_HISTORY_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_CUSTOMER_HISTORY_URL].join('/');
export const ABS_CSPACE_REPORTS_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, CSPACE_REPORTS_URL].join('/');
export const ABS_CUSTOMER_COMPLAINTS_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_COMPLAINTS_URL].join('/');
export const ABS_PAYMENTS_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_PAYMENT_URL].join('/');
export const ABS_SALES_HOME_URL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, SS_HOME_PAGE_URL].join('/');

