import { MAIN_PAGE_URL } from '@ss/common/api-common';

// CSPACE
export const CSPACE_CART_URL = 'cart';
export const CSPACE_CARTDETAIL_URL = 'cartdetail';
export const COMMON_CUSTOMER_PROFILE_URL = 'profile';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const CSPACE_APP_URL = 'cspace';

// common
export const COMMON_REPORT_PARAMS_URL = 'report-params';
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
export const ABS_CUSTOMER_PROFILE = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, COMMON_CUSTOMER_PROFILE_URL].join('/');
export const ABS_CART = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, CSPACE_CART_URL].join('/');
export const ABS_CART_DETAIL = '/' + [MAIN_PAGE_URL, CSPACE_APP_URL, CSPACE_CARTDETAIL_URL].join('/');

