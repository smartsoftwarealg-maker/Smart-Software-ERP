import {MAIN_PAGE_URL} from '@ss/common/api-common';

// common
export const LOOKUPS_URL = 'lookups';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const STOCK_APP_URL = 'stock';
export const SALES_APP_URL = 'sales';
export const PAYROLL_APP_URL = 'payroll';
export const PURCHASES_APP_URL = 'purchases';
export const LOGISTICS_APP_URL = 'logistics';

// common
export const STOCK_VAT_URL = 'vat';
export const COMMON_WILAYAS_URL = 'wilayas';
export const COMMON_REPORT_PARAMS_URL = 'report-params';

// Administration
export const ADMINISTRATION_COMPANY_URL = 'companies';
export const ADMINISTRATION_CENTER_URL = 'centers';
export const ADMINISTRATION_USER_URL = 'users';
export const ADMINISTRATION_ROLE_URL = 'roles';
export const ADMINISTRATION_BANK_URL = 'banks';
export const ADMINISTRATION_SMTP_URL = 'smtps';
export const ADMINISTRATION_REPORT_CATALOG_URL = 'report-catalog';


// Stock
export const STOCK_ARTICLES_URL = 'articles';
export const STOCK_INVENTORY_ENTRY_URL = 'inventory-entries';
export const STOCK_INVENTORY_EXIT_URL = 'inventory-exits';
export const STOCK_CONSUMPTION_URL = 'consumptions';
export const PURCHASE_RECEPTION_URL = 'receptions';
export const PURCHASE_ORDER_URL = 'porders';
export const STOCK_INVENTORY_URL = 'inventorys';
export const STOCK_AGENT_URL = 'agents';
export const STOCK_ACCOUNT_URL = 'accounts';
export const STOCK_AGENT_PRICE_URL = 'agent-prices';
export const STOCK_COST_CENTER_URL = 'cost-centers';

export const STOCK_MARKS_URL = 'marks';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_SUBCLASSES_URL = 'subclasses';
export const STOCK_STORE_NAMES_URL = 'storeNames';
export const STOCK_UNITS_URL = 'units';
export const STOCK_AGENT_TYPE_URL = 'agentTypes';
export const STOCK_COMPANY_TYPE_URL = 'companyTypes';
export const STOCK_ACTIVITY_URL = 'activities';
export const STOCK_CURRENCY_URL = 'currencies';
export const STOCK_CITY_URL = 'cities';
export const STOCK_COUNTRY_URL = 'countries';
export const LOGISTICS_PAY_METHOD_URL = 'mpay';

// Sales
export const SALES_DELIVERY_URL = 'delivery';
export const SALES_INVOICE_URL = 'invoice';
export const SALES_INVOICE_CANCEL_URL = 'cinvoice';
export const SALES_DELIVERY_CANCEL_URL = 'cdelivery';
export const SALES_ORDER_URL = 'order';

// Payroll
export const PAYROLL_CATEGORIES_URL = 'categories';
export const PAYROLL_SERVICES_URL = 'services';
export const PAYROLL_DIPLOMAS_URL = 'diplomas';
export const PAYROLL_EDUCATION_LEVELS_URL = 'educationLevels';
export const PAYROLL_MARITAL_STATUS_URL = 'maritalStatus';
export const PAYROLL_POSTS_URL = 'posts';
export const PAYROLL_NATIONALITIES_URL = 'nationalities';
export const PAYROLL_PERSONS_URL = 'persons';
export const PAYROLL_PERSONS_ACTIVATION = 'activation';

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


// stock
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_MARKS_URL].join('/');
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_URL].join('/');
export const ABS_STOCK_INVENTORY_ENTRY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_ENTRY_URL].join('/');
export const ABS_STOCK_INVENTORY_EXIT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_EXIT_URL].join('/');
export const ABS_STOCK_CONSUMPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_URL].join('/');
export const ABS_PURCHASE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_URL].join('/');
export const ABS_PURCHASE_ORDER_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_ORDER_URL].join('/');
export const ABS_STOCK_INVENTORY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_URL].join('/');
export const ABS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_URL].join('/');
export const ABS_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ACCOUNT_URL].join('/');
export const ABS_STOCK_AGENT_PRICE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_PRICE_URL].join('/');
export const ABS_STOCK_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_COMMON_REPORT_PARAMS = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_REPORT_PARAMS_URL].join('/');
export const ABS_STOCK_VAT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_VAT_URL].join('/');
export const ABS_STOCK_STORE_NAMES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_STORE_NAMES_URL].join('/');
export const ABS_STOCK_UNITS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_UNITS_URL].join('/');
export const ABS_STOCK_AGENT_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_AGENT_TYPE_URL].join('/');
export const ABS_STOCK_COMPANY_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_COMPANY_TYPE_URL].join('/');
export const ABS_ADMINISTRATION_CITY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CITY_URL].join('/');
export const ABS_ADMIN_COUNTRY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_COUNTRY_URL].join('/');
export const ABS_STOCK_ACTIVITY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_ACTIVITY_URL].join('/');
export const ABS_STOCK_CURRENCY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CURRENCY_URL].join('/');

//Logistics
export const ABS_LOGISTICS_PAY_METHOD = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');

// payroll
export const ABS_PAYROLL_CATEGORIES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_CATEGORIES_URL].join('/');
export const ABS_PAYROLL_DIPLOMAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_DIPLOMAS_URL].join('/');
export const ABS_PAYROLL_EDUCATION_LEVELS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_EDUCATION_LEVELS_URL].join('/');
export const ABS_PAYROLL_MARITAL_STATUS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_MARITAL_STATUS_URL].join('/');
export const ABS_PAYROLL_POSTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_POSTS_URL].join('/');
export const ABS_PAYROLL_WILAYAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, COMMON_WILAYAS_URL].join('/');
export const ABS_PAYROLL_NATIONALITIES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_NATIONALITIES_URL].join('/');
export const ABS_PAYROLL_SERVICES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_SERVICES_URL].join('/');
export const ABS_PAYROLL_PERSONS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_PERSONS_URL].join('/');
export const ABS_PAYROLL_EMPLOYEE_ACTIVATION_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_PERSONS_URL, PAYROLL_PERSONS_ACTIVATION].join('/');

// sales
export const ABS_SALES_DELIVERY_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_URL].join('/');
export const ABS_SALES_INVOICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_URL].join('/');
export const ABS_SALES_INVOICE_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_CANCEL_URL].join('/');
export const ABS_SALES_DELIVERY_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_CANCEL_URL].join('/');
export const ABS_SALES_ORDER_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_ORDER_URL].join('/');


