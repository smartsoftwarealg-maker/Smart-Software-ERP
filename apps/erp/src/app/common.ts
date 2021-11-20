import { MAIN_PAGE_URL } from '@ss/common/api-common';
import { ACTIVATION_LIST_URL as activationListUrl } from '@ss/payroll/api-employee';
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
export const PAYROLL_APP_URL = 'payroll';
export const FINANCE_APP_URL = 'finance';
export const PURCHASES_APP_URL = 'purchases';
export const LOGISTICS_APP_URL = 'logistics';

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
export const ADMINISTRATION_ACCCESSRIGHTS_URL = 'accessrights';
export const ADMINISTRATION_TRACEABILITY_URL = 'logging';


// Stock
export const STOCK_VAT_URL = 'vat';
export const STOCK_ARTICLES_URL = 'articles';
export const STOCK_ARTICLES_STORE_URL = 'articlestores';
export const STOCK_ANOMALY_URL = 'anomalies';
export const STOCK_INVENTORY_ENTRY_URL = 'inventory-entries';
export const STOCK_INVENTORY_EXIT_URL = 'inventory-exits';
export const STOCK_CONSUMPTION_URL = 'consumptions';
export const STOCK_INVENTORY_URL = 'inventorys';
export const STOCK_AGENT_URL = 'agents';
export const LOGISTICS_AGENT_URL = 'agents';
export const STOCK_ACCOUNT_URL = 'accounts';
export const STOCK_AGENT_PRICE_URL = 'agent-prices';
export const STOCK_COST_CENTER_URL = 'cost-centers';
export const STOCK_MARKS_URL = 'marks';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_SUBCLASSES_URL = 'subclasses';
export const STOCK_STORE_NAMES_URL = 'storeNames';
export const STOCK_STORES_URL = 'stores';
export const STOCK_UNITS_URL = 'units';
export const STOCK_AGENT_TYPE_URL = 'agentTypes';
export const STOCK_COMPANY_TYPE_URL = 'companyTypes';
export const STOCK_ACTIVITY_URL = 'activities';
export const STOCK_CURRENCY_URL = 'currencies';
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

// Sales
export const SALES_DELIVERY_URL = 'delivery';
export const SALES_INVOICE_URL = 'invoice';
export const SALES_INVOICE_CANCEL_URL = 'cinvoice';
export const SALES_DELIVERY_CANCEL_URL = 'cdelivery';
export const SALES_ORDER_URL = 'order';
export const SALES_PROFORMA_URL = 'proforma';

// Payroll
export const PAYROLL_CATEGORIES_URL = 'categories';
export const PAYROLL_SERVICES_URL = 'services';
export const PAYROLL_DIPLOMAS_URL = 'diplomas';
export const PAYROLL_EDUCATION_LEVELS_URL = 'educationLevels';
export const PAYROLL_MARITAL_STATUS_URL = 'maritalStatus';
export const PAYROLL_POSTS_URL = 'posts';
export const PAYROLL_NATIONALITIES_URL = 'nationalities';
export const PAYROLL_EMPLOYEES_URL = 'employees';
export const PAYROLL_EMPLOYEE_ACTIVATION_URL = activationListUrl;
export const PAYROLL_EMPLOYMENT_TYPE_URL = 'employmentType';
export const PAYROLL_SUSPENSION_REASON_URL = 'suspensionReason';
export const PAYROLL_CAREER_URL = 'career';
export const PAYROLL_CONTRACTS_URL = 'contracts';
export const PAYROLL_DIVISIONS_URL = 'divisions';
export const PAYROLL_DEPARTMENTS_URL = 'departments'

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

// stock
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_MARKS_URL].join('/');
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_URL].join('/');
export const ABS_STORE_ASSIGNMENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_STORE_URL].join('/');
export const ABS_STOCK_STORES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_STORES_URL].join('/');
export const ABS_STOCK_INVENTORY_ENTRY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_ENTRY_URL].join('/');
export const ABS_STOCK_INVENTORY_EXIT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_EXIT_URL].join('/');
export const ABS_STOCK_CONSUMPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_URL].join('/');
export const ABS_INVENTORY_ANOMALIES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ANOMALY_URL].join('/');
export const ABS_STOCK_INVENTORY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_URL].join('/');
export const ABS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_URL].join('/');
export const ABS_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ACCOUNT_URL].join('/');
export const ABS_STOCK_AGENT_PRICE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_PRICE_URL].join('/');
export const ABS_STOCK_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_STOCK_VAT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_VAT_URL].join('/');
export const ABS_STOCK_STORE_NAMES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_STORE_NAMES_URL].join('/');
export const ABS_STOCK_UNITS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_UNITS_URL].join('/');
export const ABS_STOCK_AGENT_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_AGENT_TYPE_URL].join('/');
export const ABS_STOCK_COMPANY_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_COMPANY_TYPE_URL].join('/');
export const ABS_STOCK_ACTIVITY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_ACTIVITY_URL].join('/');
export const ABS_STOCK_CURRENCY = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CURRENCY_URL].join('/');
export const ABS_STOCK_REPORT_PARAMS = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_REPORT_PARAMS_URL].join('/');
export const ABS_STOCK_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_REPORT_CATALOG_URL].join('/');


//Logistics
export const ABS_LOGISTICS_PAY_METHOD = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');
export const ABS_LOGISTICS_OPTIONS = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_OPTION_URL].join('/');
export const LOGISTICS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_AGENT_URL].join('/');

//Finance
export const ABS_FINANCE_CPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CPAYMENTS_URL].join('/');
export const ABS_FINANCE_SPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SPAYMENTS_URL].join('/');
export const ABS_FINANCE_PAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_PAYMENTS_URL].join('/');
export const ABS_FINANCE_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_COMPENSATION_URL].join('/');
export const ABS_FINANCE_SCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SCOMPENSATION_URL].join('/');
export const ABS_FINANCE_CCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CCOMPENSATION_URL].join('/');

// payroll
export const ABS_PAYROLL_CATEGORIES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_CATEGORIES_URL].join('/');
export const ABS_PAYROLL_DIPLOMAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_DIPLOMAS_URL].join('/');
export const ABS_PAYROLL_EDUCATION_LEVELS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_EDUCATION_LEVELS_URL].join('/');
export const ABS_PAYROLL_MARITAL_STATUS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_MARITAL_STATUS_URL].join('/');
export const ABS_PAYROLL_POSTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_POSTS_URL].join('/');
export const ABS_PAYROLL_NATIONALITIES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_NATIONALITIES_URL].join('/');
export const ABS_PAYROLL_SERVICES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_SERVICES_URL].join('/');
export const ABS_PAYROLL_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL].join('/');
export const ABS_PAYROLL_EMPLOYEE_ACTIVATION_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL, PAYROLL_EMPLOYEE_ACTIVATION_URL].join('/');
export const ABS_PAYROLL_EMPLOYMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_EMPLOYMENT_TYPE_URL].join('/');
export const ABS_PAYROLL_SUSPENSION_REASON_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_SUSPENSION_REASON_URL].join('/');
export const ABS_PAYROLL_CAREER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL, PAYROLL_CAREER_URL].join('/');
export const ABS_PAYROLL_CONTRACTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL, PAYROLL_CONTRACTS_URL].join('/');
export const ABS_PAYROLL_DIVISIONS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_DIVISIONS_URL].join('/');
export const ABS_PAYROLL_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, LOOKUPS_URL, PAYROLL_DEPARTMENTS_URL].join('/');

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
