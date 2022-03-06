import { MAIN_PAGE_URL } from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { TotalComponent } from '@ss/logistics/ui-totals';
import { CirculationComponent } from '@ss/logistics/ui-circulation';
import { AgentBalanceComponent } from '@ss/logistics/ui-agent-balance';
import { AgentDebtsComponent } from '@ss/logistics/ui-agent-debts';
import { CardComponent } from '@ss/logistics/ui-card';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';

// common
export const LOOKUPS_URL = 'lookups';

// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const STOCK_APP_URL = 'stock';
export const SALES_APP_URL = 'sales';
export const DASHBOARD_APP_URL = 'dashboard';
export const PAYROLL_APP_URL = 'payroll';
export const HR_APP_URL = 'hr';
export const FINANCE_APP_URL = 'finance';
export const PURCHASES_APP_URL = 'purchases';
export const LOGISTICS_APP_URL = 'logistics';
export const WEBARCH_APP_URL = 'webarch';

// common
export const COMMON_REPORTS_URL = 'reports';
export const ABS_COMMON_REPORTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, COMMON_REPORTS_URL].join('/');

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
export const ADMINISTRATION_ACCCESSRIGHTS_URL = 'accessrights';
export const ADMINISTRATION_TRACEABILITY_URL = 'logging';
export const ADMINISTRATION_ORGANIZATIONS_URL = 'organizations';


// Stock
export const LOGISTICS_VAT_URL = 'vat';
export const STOCK_ARTICLES_URL = 'articles';
export const STOCK_ARTICLES_STORE_URL = 'articlestores';
export const STOCK_ANOMALY_URL = 'anomalies';
export const STOCK_INVENTORY_ENTRY_URL = 'inventory-entries';
export const STOCK_INVENTORY_EXIT_URL = 'inventory-exits';
export const STOCK_CONSUMPTION_URL = 'consumptions';
export const STOCK_INVENTORY_URL = 'inventory';
export const STOCK_AGENT_URL = 'agents';
export const STOCK_ACCOUNT_URL = 'accounts';
export const STOCK_AGENT_PRICE_URL = 'agent-prices';
export const STOCK_COST_CENTER_URL = 'cost-centers';
export const STOCK_MARKS_URL = 'marks';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_SUBCLASSES_URL = 'subclasses';
export const STOCK_STORE_NAMES_URL = 'storeNames';
export const STOCK_STORES_URL = 'stores';
export const STOCK_UNITS_URL = 'units';
export const LOGISTICS_AGENT_TYPE_URL = 'agentTypes';
export const LOGISTICS_COMPANY_TYPE_URL = 'companyTypes';
export const LOGISTICS_ACTIVITY_URL = 'activities';
export const LOGISTICS_CURRENCY_URL = 'currencies';
export const STOCK_REPORT_CATALOG_URL = 'report-catalog';

// Purchase
export const PURCHASE_RECEPTION_URL = 'receptions';
export const PURCHASE_ORDER_URL = 'porders';
export const PURCHASE_QUOTATION_URL = 'offers';

// Logistics
export const LOGISTICS_PAY_METHOD_URL = 'mpay';
export const LOGISTICS_PAYMENTS_URL = 'payments';
export const LOGISTICS_SPAYMENTS_URL = 'spayments';
export const LOGISTICS_CPAYMENTS_URL = 'cpayments';
export const LOGISTICS_COMPENSATION_URL = 'compensations';
export const LOGISTICS_SCOMPENSATION_URL = 'scompensations';
export const LOGISTICS_CCOMPENSATION_URL = 'ccompensations';
export const LOGISTICS_OPTION_URL = 'options';
export const LOGISTICS_AGENT_URL = 'agents';
export const LOGISTICS_NUMBERING_URL = 'documents';

// Sales
export const SALES_DELIVERY_URL = 'delivery';
export const SALES_INVOICE_URL = 'invoice';
export const SALES_INVOICE_CANCEL_URL = 'cinvoice';
export const SALES_DELIVERY_CANCEL_URL = 'cdelivery';
export const SALES_ORDER_URL = 'order';
export const SALES_PROFORMA_URL = 'proforma';

// HR
export const HR_CATEGORIES_URL = 'categories';
export const HR_SERVICES_URL = 'services';
export const HR_DIPLOMAS_URL = 'diplomas';
export const HR_PROFESSIONAL_FAULT_URL = 'prof-faults';
export const HR_PUNISHMENT_TYPE_URL = 'punishment-types';
export const HR_EDUCATION_LEVELS_URL = 'educationLevels';
export const HR_MARITAL_STATUS_URL = 'maritalStatus';
export const HR_POSTS_URL = 'posts';
export const HR_NATIONALITIES_URL = 'nationalities';
export const HR_EMPLOYEES_URL = 'employees';
export const HR_EMPLOYMENT_TYPE_URL = 'employmentType';
export const HR_SUSPENSION_REASON_URL = 'suspensionReason';
export const HR_DIVISIONS_URL = 'divisions';
export const HR_DEPARTMENTS_URL = 'departments'

// Payroll
export const PAY_ELEMENTSINFO_URL     = 'elementsinfo';
export const PAY_SPECIAL_PAYROLL_URL  = 'special-payroll';
export const PAY_ELEMENT_TYPES_URL    = 'elementtypes';
export const PAY_FORMULAS_URL         = 'formulas';
export const PAY_MONTH_CLOSER         = 'close';
export const PAY_VACATION_PLANNING    = 'vac-planning';
export const PAY_XLS_INJECTION        = 'xls-injection';
export const PAY_MONTH_CANCELER       = 'cancel';
export const PAY_MONTH_SELECTOR       = 'select';
export const PAY_INPUT_FILTERS        = 'inputfilters';
export const PAY_SALARY_GRID          = 'salary-grid';
export const PAY_ELEMENTS_ENTRY_URL   = 'elementsentry';
export const PAY_AMENDMENT_URL        = 'amendments';
export const PAY_LOANS_URL            = 'loans';
export const PAY_FIXED_ELEMENTS_URL   = 'fixedelements';
export const PAY_EDO_URL              = 'edo';
export const PAY_DAS_URL              = 'das';
export const PAY_CACO_URL             = 'caco';

//Missions
export const MISSION_PREPARATION_URL = 'missions';
export const MISSION_TRAJECTORIES = 'trajectories';

//Missions
export const ABS_MISSION_PREPARATION_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, MISSION_PREPARATION_URL].join('/');
export const ABS_TRAJECTORY_URL          = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, MISSION_TRAJECTORIES].join('/');

//Dashboard
export const DASHBOARD_QUERY_URL = 'queries'
export const DASHBOARD_URL       = 'dashbaord'

//Web arch
export const ARCHIVE_URL    = 'arch';
export const TAG_URL        = 'tags';
export const ARCHIVE_VIEWER = 'viewer';


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
export const ABS_ADMINISTRATION_ACCESS_RIGHTS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ACCCESSRIGHTS_URL].join('/');
export const ABS_ADMINISTRATION_TRACEABILITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_TRACEABILITY_URL].join('/');
export const ABS_ADMINISTRATION_ORGANIZATIONS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ORGANIZATIONS_URL].join('/');

// stock
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_MARKS_URL].join('/');
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_URL].join('/');
export const ABS_STORE_ASSIGNMENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_STORE_URL].join('/');
export const ABS_STOCK_STORES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_STORES_URL].join('/');
export const ABS_STOCK_INVENTORY_ENTRY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_ENTRY_URL].join('/');
export const ABS_STOCK_INVENTORY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_URL].join('/');
export const ABS_STOCK_INVENTORY_EXIT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_EXIT_URL].join('/');
export const ABS_STOCK_CONSUMPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_URL].join('/');
export const ABS_INVENTORY_ANOMALIES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ANOMALY_URL].join('/');
export const ABS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_URL].join('/');
export const ABS_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ACCOUNT_URL].join('/');
export const ABS_STOCK_AGENT_PRICE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_PRICE_URL].join('/');
export const ABS_STOCK_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_STOCK_STORE_NAMES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_STORE_NAMES_URL].join('/');
export const ABS_STOCK_UNITS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_UNITS_URL].join('/');
export const ABS_STOCK_AGENT_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, LOGISTICS_AGENT_TYPE_URL].join('/');
export const ABS_STOCK_REPORT_PARAMS = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_STOCK_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_REPORT_CATALOG_URL].join('/');


//Logistics
export const ABS_LOGISTICS_PAY_METHOD = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');
export const ABS_LOGISTICS_OPTIONS = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_OPTION_URL].join('/');
export const LOGISTICS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_AGENT_URL].join('/');
export const LOGISTICS_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_NUMBERING_URL].join('/');
export const ABS_LOGISTICS_VAT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_VAT_URL].join('/');
export const ABS_LOGISTICS_COMPANY_TYPE = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL,  LOGISTICS_COMPANY_TYPE_URL].join('/');
export const ABS_LOGISTICS_ACTIVITY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_ACTIVITY_URL].join('/');
export const ABS_LOGISTICS_CURRENCY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_CURRENCY_URL].join('/');

//Finance
export const ABS_FINANCE_CPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CPAYMENTS_URL].join('/');
export const ABS_FINANCE_SPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SPAYMENTS_URL].join('/');
export const ABS_FINANCE_PAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_PAYMENTS_URL].join('/');
export const ABS_FINANCE_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_COMPENSATION_URL].join('/');
export const ABS_FINANCE_SCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SCOMPENSATION_URL].join('/');
export const ABS_FINANCE_CCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CCOMPENSATION_URL].join('/');

// HR
export const ABS_HR_CATEGORIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_CATEGORIES_URL].join('/');
export const ABS_HR_DIPLOMAS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_DIPLOMAS_URL].join('/');
export const ABS_HR_EDUCATION_LEVELS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_EDUCATION_LEVELS_URL].join('/');
export const ABS_HR_MARITAL_STATUS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_MARITAL_STATUS_URL].join('/');
export const ABS_PROFESSIONAL_FAULTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_PROFESSIONAL_FAULT_URL].join('/');
export const ABS_PUNISHMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_PUNISHMENT_TYPE_URL].join('/');
export const ABS_HR_POSTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_POSTS_URL].join('/');
export const ABS_HR_NATIONALITIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_NATIONALITIES_URL].join('/');
export const ABS_HR_SERVICES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_SERVICES_URL].join('/');
export const ABS_HR_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_EMPLOYEES_URL].join('/');
export const ABS_HR_EMPLOYMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_EMPLOYMENT_TYPE_URL].join('/');
export const ABS_HR_SUSPENSION_REASON_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_SUSPENSION_REASON_URL].join('/');
export const ABS_HR_DIVISIONS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_DIVISIONS_URL].join('/');
export const ABS_HR_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_DEPARTMENTS_URL].join('/');

// payroll
export const ABS_ELEMENTSINFO_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENTSINFO_URL].join('/');
export const ABS_ELEMENT_TYPES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENT_TYPES_URL].join('/');
export const ABS_FORMULAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_FORMULAS_URL].join('/');
export const ABS_MONTH_CLOSER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_CLOSER].join('/');
export const ABS_VACATION_PLANNING_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_VACATION_PLANNING].join('/');
export const ABS_MONTH_CANCELER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_CANCELER].join('/');
export const ABS_MONTH_SELECTOR_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_SELECTOR].join('/');
export const ABS_INPUT_FILTERS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_INPUT_FILTERS].join('/');
export const ABS_SPECIAL_PAYROLL_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_SPECIAL_PAYROLL_URL].join('/');
export const ABS_ELEMENTS_ENTRY_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENTS_ENTRY_URL].join('/');
export const ABS_FIXED_ELEMENTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_FIXED_ELEMENTS_URL].join('/');
export const ABS_EXCEL_INJECTION_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_XLS_INJECTION].join('/');
export const ABS_AMENDMENT_URL       = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_AMENDMENT_URL].join('/');
export const ABS_LOANS_URL           = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_LOANS_URL].join('/');
export const ABS_EDO_URL             = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_EDO_URL].join('/');
export const ABS_DAS_URL             = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_DAS_URL].join('/');
export const ABS_CACO_URL            = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_CACO_URL].join('/');
export const ABS_SALARY_GRID_URL     = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_SALARY_GRID].join('/');

// sales
export const ABS_SALES_DELIVERY_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_URL].join('/');
export const ABS_SALES_INVOICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_URL].join('/');
export const ABS_SALES_INVOICE_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_CANCEL_URL].join('/');
export const ABS_SALES_DELIVERY_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_CANCEL_URL].join('/');
export const ABS_SALES_ORDER_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_ORDER_URL].join('/');
export const ABS_SALES_PROFORMA_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_PROFORMA_URL].join('/');

// Purchace
export const ABS_PURCHASE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_URL].join('/');
export const ABS_PURCHASE_ORDER_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_ORDER_URL].join('/');
export const ABS_PURCHASE_QUOTATION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_QUOTATION_URL].join('/');

//dashboard
export const ABS_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, DASHBOARD_APP_URL, DASHBOARD_URL].join('/');
export const ABS_DASHBOARD_QUERY_URL = '/' + [MAIN_PAGE_URL, DASHBOARD_APP_URL, DASHBOARD_QUERY_URL].join('/');

// ARCHIVE
export const ABS_ARCHIVE_URL = '/' + [MAIN_PAGE_URL, WEBARCH_APP_URL, ARCHIVE_URL].join('/');
export const ABS_TAG_URL = '/' + [MAIN_PAGE_URL, WEBARCH_APP_URL, TAG_URL].join('/');



// ######################################
// #            Other things            #
// ######################################

export const docInfoRoutes: Routes = [
    {
        path: 'totals',
        component: TotalComponent
    },
    {
        path: 'circulation',
        component: CirculationComponent
    },
    {
        path: 'stock',
        component: UiStockInfoComponent
    },
    {
        path: 'card',
        component: CardComponent
    },
    {
        path: 'agent-balance',
        component: AgentBalanceComponent
    },
    {
        path: 'agent-debts',
        component: AgentDebtsComponent
    }
];
