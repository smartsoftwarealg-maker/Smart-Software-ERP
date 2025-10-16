import { MAIN_PAGE_URL } from '@ss/common/api-common';

// SSPACE
export const COMMON_CUSTOMER_PROFILE_URL = 'profile';
export const SS_CUSTOMER_COMPLAINTS_URL  = 'customer-complaints';
export const SS_CUSTOMER_SUGGESTION_URL  = 'customer-suggestions';
export const SSPACE_REPORTS_URL          = 'capace-reports';
export const SS_CUSTOMER_POLL_URL        = 'customer-poll';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const SSPACE_APP_URL = 'sspace';

// common
export const LOOKUPS_URL = 'lookups';

// Administration
export const ADMINISTRATION_REPORT_CATALOG_URL = 'report-catalog';
export const ABS_SSPACE_REPORTS_URL = '/' + [MAIN_PAGE_URL, SSPACE_APP_URL, SSPACE_REPORTS_URL].join('/');
export const ABS_SSPACE_PROFILE_URL = '/' + [MAIN_PAGE_URL, SSPACE_APP_URL, COMMON_CUSTOMER_PROFILE_URL].join('/');
export const ABS_CUSTOMER_POLL_URL = '/' + [MAIN_PAGE_URL, SSPACE_APP_URL, SS_CUSTOMER_POLL_URL].join('/');
export const ABS_CUSTOMER_SUGGESTIONS_URL = '/' + [MAIN_PAGE_URL, SSPACE_APP_URL, SS_CUSTOMER_SUGGESTION_URL].join('/');
export const ABS_CUSTOMER_COMPLAINTS_URL = '/' + [MAIN_PAGE_URL, SSPACE_APP_URL, SS_CUSTOMER_COMPLAINTS_URL].join('/');

// #############
// # FULL URLS #
// #############

// administration
