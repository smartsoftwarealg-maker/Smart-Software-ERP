import { MAIN_PAGE_URL } from '@ss/common/api-common';
import { REPORT_PARAMS_URL } from '@ss/common/api-reports';


// EMPSPACE
export const EMPSPACE_HOLIDAY_REQUEST_URL = 'holiday-requests';
export const EMPSPACE_PROFILE_URL = 'person-profile';
export const EMPSPACE_REPOERT_URL = 'espace-reports';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const EMPSPACE_APP_URL = 'empspace';

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

//empspace
export const ABS_HOLIDAY_REQUEST = '/' + [MAIN_PAGE_URL, EMPSPACE_APP_URL, EMPSPACE_HOLIDAY_REQUEST_URL].join('/');
export const ABS_EMPLOYEE_PROFILE = '/' + [MAIN_PAGE_URL, EMPSPACE_APP_URL, EMPSPACE_PROFILE_URL].join('/');
export const ABS_ESPACE_REPORTS_URL = '/' + [MAIN_PAGE_URL, EMPSPACE_APP_URL, EMPSPACE_REPOERT_URL].join('/');
