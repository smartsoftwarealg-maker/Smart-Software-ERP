import { MAIN_PAGE_URL } from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { TotalComponent } from '@ss/logistics/ui-totals';
import { CirculationComponent } from '@ss/logistics/ui-circulation';
import { AgentBalanceComponent } from '@ss/logistics/ui-agent-balance';
import { AgentDebtsComponent } from '@ss/logistics/ui-agent-debts';
import { CardComponent } from '@ss/logistics/ui-card';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import {AppArchiveDetailComponent, AppArchiveListComponent} from '@ss/common/app-archive';

// common
export const LOOKUPS_URL = 'lookups';
export const COMMON_ACCOUNT_URL     = 'accounts';
export const ASSET_ACCOUNT_URL      = 'asset-accounts';
export const TRANSAC_ACCOUNT_URL    = 'transac-accounts';
export const GENERATION_ACCOUNT_URL = 'generation-accounts';
export const STOCK_ACCOUNT_URL      = 'stock-accounts';
export const CASHFLOW_ACCOUNTS_URL  = 'cashflow-accounts';
export const COMMON_MARKS_URL = 'marks';
export const COMMON_REPORTS_URL = 'reports';


// apps
export const ADMINISTRATION_APP_URL = 'administration';
export const STOCK_APP_URL = 'stock';
export const SALES_APP_URL = 'sales';
export const TREASURY_APP_URL = 'treasury';
export const ACCOUNTING_APP_URL = 'accounting';
export const DASHBOARD_APP_URL = 'dashboard';
export const PAYROLL_APP_URL = 'payroll';
export const HR_APP_URL = 'hr';
export const FINANCE_APP_URL = 'finance';
export const PURCHASES_APP_URL = 'purchases';
export const LOGISTICS_APP_URL = 'logistics';
export const WEBARCH_APP_URL = 'webarch';
export const ASSETS_APP_URL = 'assets-app';
export const ORGANIZATIONS_APP_URL = 'organizations';
export const SCHEDULED_SALES_APP_URL = 'scheduled-sales';
export const MISSIONS_APP_URL = 'missions';
export const CONTRACTS_APP_URL = 'contracts';
export const SHOPPING_CART_APP_URL = 'scart';
export const FOOD_CART_APP_URL = 'food';
export const WORK_FLOW_APP_URL = 'workflow';
export const BUDGET_APP_URL = 'budget';

// treasury
export const TREASURY_AGENT_URL = 'agents';
export const TREASURY_CHECKS_URL = 'checks';
export const TREASURY_PROCESSED_CHECKS_URL = 'processed-checks';
export const TREASURY_CHECK_BOOKS_URL = 'checkBooks';
export const TREASURY_JOURNALS_URL = 'journals';
export const TREASURY_GROUPS_URL = 'treasury-groups';
export const TREASURY_JOURNAL_TYPE_URL = 'journal-types';
export const TREASURY_TRANSACTION_URL = 'transactions';
export const TREASURY_BANK_EXPENSE_URL = 'bank-expenses';
export const TREASURY_CHECK_MATCHING_URL = 'check-matching';

// Administration
export const ADMINISTRATION_COMPANY_URL = 'companies';
export const ADMINISTRATION_CENTER_URL = 'centers';
export const ADMINISTRATION_USER_URL = 'users';
export const ADMINISTRATION_ROLE_URL = 'roles';
export const ADMINISTRATION_BANK_URL = 'banks';
export const ADMINISTRATION_ATTRIBUTE_URL = 'attributes';
export const ADMINISTRATION_SMTP_URL = 'smtps';
export const ADMINISTRATION_REPORT_CATALOG_URL = 'report-catalog';
export const ADMINISTRATION_CITY_URL = 'cities';
export const ADMINISTRATION_COUNTRY_URL = 'countries';
export const ADMINISTRATION_ARCHIVE_DOCUMENTS_URL = 'archive_documents';
export const ADMINISTRATION_WILAYA_URL = 'wilayas';
export const ADMINISTRATION_ACCCESSRIGHTS_URL = 'accessrights';
export const ADMINISTRATION_TRACEABILITY_URL = 'logging';
export const ADMINISTRATION_DB_UPDATER_URL   = 'db_updater';
export const ADMIN_DARIRA_URL = 'dairas';
export const ADMIN_USER_MESSAGES_URL = 'user-messages';
export const ADMIN_USER_DOCUMENTS_URL = 'user-documents';
export const ADMIN_WORKFLOW_INBOX_URL = 'workflow-inbox';


// Organizations
export const ORGANIZATIONS_CHART_URL = 'chart';
export const ORGANIZATIONS_DIVISIONS_URL = 'divisions';
export const ORGANIZATIONS_DEPARTMENTS_URL = 'departments';
export const ORGANIZATIONS_SERVICES_URL = 'services';
export const ORGANIZATIONS_OFFICES_URL = 'offices';

// CSPACE
export const CSPACE_CART_URL = 'cart';
export const CSPACE_CARTDETAIL_URL = 'cartdetail';
export const COMMON_CUSTOMER_PROFILE_URL = 'profile';

//Food
export const FOOD_CART_URL       = 'cart';
export const FOOD_CARTDETAIL_URL = 'cartdetail';
export const PAYPAL_CHECKOUT_URL = 'checkout';
export const PAYPAL_REVIEW_URL   = 'review_payment';

// Stock
export const LOGISTICS_VAT_URL = 'vat';
export const STOCK_ARTICLES_STORE_URL = 'articlestores';
export const USER_STORES_URL = 'user-stores';
export const STOCK_ANOMALY_URL = 'anomalies';
export const STOCK_INVENTORY_ENTRY_URL = 'inventory-entries';
export const STOCK_INVENTORY_EXIT_URL = 'inventory-exits';
export const STOCK_TRANSFER_URL       = 'transfers';
export const STOCK_TRANSFER_RECEPTION_URL  = 'transfer-reception';
export const STOCK_CONSUMPTION_URL = 'consumptions';
export const STOCK_INVENTORY_URL = 'inventory';
export const STOCK_AGENT_URL = 'agents';
export const STOCK_AGENT_PRICE_URL = 'agent-prices';
export const STOCK_COST_CENTER_URL = 'cost-centers';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_DASHBOARD_URL = 'dashboard';
export const STOCK_SUBCLASSES_URL = 'subclasses';
export const STOCK_STORE_NAMES_URL = 'storeNames';
export const STOCK_STORES_URL = 'stores';
export const STOCK_UNITS_URL = 'units';
export const STOCK_REPORT_CATALOG_URL = 'report-catalog';
export const STOCK_REPORTS_URL = 'stock-reports';
export const STOCK_ARTICLE_URL = 'stock-articles';

// Budget
export const BUDGET_BUDGET_URL = 'budgets'

// common
export const ABS_COMMON_REPORTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_ASSETS_REPORTS_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_COMMON_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, COMMON_MARKS_URL].join('/');

// Purchase
export const PURCHASE_RECEPTION_URL = 'receptions';
export const PURCHASE_RECEPTION_CANCELLATION_URL = 'creceptions';
export const PURCHASE_ORDER_URL = 'porders';
export const PURCHASE_REQUEST_URL = 'prequests';
export const PURCHASE_QUOTATION_URL = 'offers';
export const PAYMENT_ORDER = 'payment-orders';

// Logistics
export const LOGISTICS_ARTICLES_URL = 'articles';
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
export const LOGISTICS_AGENT_TYPE_URL = 'agentTypes';
export const LOGISTICS_COMPANY_TYPE_URL = 'companyTypes';
export const LOGISTICS_ACTIVITY_URL = 'activities';
export const LOGISTICS_CURRENCY_URL = 'currencies';
export const LOGISTICS_CATEGORY_URL = 'sales-categories';
export const FURNITURE_STATUS_URL = 'furniture-states';
export const LOGISTICS_WORKFLOW_URL = 'workflow-messages';


// Contracts
export const CONTRACTS_PROJECT_TYPE_URL = 'projectTypes';
export const CONTRACTS_PROJECT_MOTIVE_URL = 'projectMotives';
export const CONTRACTS_AWARD_PROCEDURE_URL = 'award-procedure';
export const CONTRACT_PROJECT_URL = 'contracts';


// Sales
export const SALES_DELIVERY_URL = 'delivery';
export const SALES_INVOICE_URL = 'invoice';
export const SALES_INVOICE_CANCEL_URL = 'cinvoice';
export const SALES_DELIVERY_CANCEL_URL = 'cdelivery';
export const SALES_ORDER_URL = 'order';
export const SALES_PROFORMA_URL = 'proforma';
export const SALES_AD_URL = 'sales-ads';
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
export const HR_JUDICIAL_FRAMES_URL = 'judicial-frames';
export const HR_DECISION_MOTIVE_URL = 'decision-motives';
export const HR_CONTRACT_MOTIVE_URL = 'contract-motives';
export const HR_MOTIVE_URL          = 'motives';
export const HR_EMPLOYEES_URL       = 'employees';
export const HR_INACTIVE_EMPLOYEES_URL = 'inactive-employees';
export const HR_PERSON_LIST_URL = 'stats';
export const HR_EMPLOYMENT_TYPE_URL = 'employmentType';
export const HR_SUSPENSION_REASON_URL = 'suspensionReason';
export const HR_DIVISIONS_URL = 'divisions';
export const HR_DEPARTMENTS_URL = 'departments';

// Payroll
export const PAYROLL_EMPLOYEES_URL = 'pay-employees';
export const PAY_ELEMENTSINFO_URL     = 'elementsinfo';
export const PAY_SPECIAL_PAYROLL_URL  = 'special-payroll';
export const PAY_ELEMENT_TYPES_URL    = 'elementtypes';
export const PAY_FORMULAS_URL         = 'formulas';
export const PAY_MONTH_CLOSER         = 'close';
export const PAY_VACATION_PLANNING    = 'vac-planning';
export const PAY_XLS_INJECTION        = 'xls-injection';
export const PAY_MONTH_CANCELER       = 'cancel';
export const PAY_ARCHIVE_GENERATOR    = 'arch-generator';
export const PAY_MONTH_SELECTOR       = 'select';
export const PAY_INPUT_FILTERS        = 'inputfilters';
export const PAY_SALARY_GRID          = 'salary-grid';
export const PAY_ELEMENTS_ENTRY_URL   = 'elementsentry';
export const PAY_AMENDMENT_URL        = 'amendments';
export const PAY_LOANS_URL            = 'loans';
export const PAY_FIXED_ELEMENTS_URL   = 'fixedelements';
export const PAY_EDO_URL              = 'edo';
export const PAY_DAS_URL              = 'das';
export const PAY_ARCHIVE_VIEWER_URL   = 'archive-viewer';
export const PAY_CACO_URL             = 'caco';

// Assets
export const ASSETS_ASSET_URL            = 'assets';
export const ASSET_COST_TYPE_URL         = 'cost_types';
export const ASSET_BLOCKING_TYPE_URL     = 'blocking_types';
export const ASSET_END_TYPE_URL          = 'end_types';
export const ASSET_CLASS_URL             = 'asset_classes';
export const ASSET_LOCATIONS_URL         = 'locations';
export const ASSET_REVALUATION_TYPE_URL  = 'revaluation_types';
export const ASSETS_COST_URL             = 'costs';
export const ASSETS_DEPRECIATION_URL     = 'rates';
export const ASSETS_REVALUATION_URL      = 'revaluations'
export const ASSETS_APPOINTMENTS_URL     = 'appointments'
export const ASSETS_BLOCKING_URL         = 'blockings'
export const ASSETS_OFFICES_URL          = 'offices';
export const ASSET_OPTIONS_URL           = 'asset-policies';
export const ASSET_TRANSFER_URL          = 'asset-transfer';
export const ASSETS_SEARCH_URL           = 'asset-search';
export const ASSETS_INJECTION_URL        = 'asset-injection';
export const ASSET_INVENTORY_URL         = 'asset-inventories';
export const ASSET_RECEPTIONS_URL        = 'asset-receptions';
export const ASSETS_APPOINTMENTS_DOC_URL = 'asset-appointments'
export const ASSETS_AGENT_URL            = 'agents';
export const ASSET_BUILDING_URL          = 'buildings';

// Scheduled sales
export const SS_PROJECTS_URL             = 'ss_projects';
export const SS_QUOTA_URL                = 'ss_quotas';
export const SS_ARTICLE_URL              = 'ss_article';
export const SS_DISCOUNTS_URL            = 'discounts';
export const SS_SCHEDULE_URL             = 'schedules';
export const SS_PARTNER_SCHEDULE_URL     = 'partner-schedules';
export const SS_SALES_MODE_URL           = 'sales-modes';
export const SS_TRUCKS_URL               = 'supplier-trucks';

// Missions
export const MISSION_PREPARATION_URL = 'missions';
export const MISSION_TRAJECTORIES = 'trajectories';

//Missions
export const ABS_MISSION_PREPARATION_URL = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_PREPARATION_URL].join('/');
export const ABS_MISSION_TRAJECTORY_URL  = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_TRAJECTORIES].join('/');

//Dashboard
export const DASHBOARD_QUERY_URL = 'queries';
export const DASHBOARD_URL       = 'dashbaord';


//Web arch
export const ARCHIVE_URL    = 'arch';
export const TAG_URL        = 'tags';
export const ARCHIVE_VIEWER = 'viewer';

//Accounting
export const ACC_POLICIES_URL         = 'acc-policies';
export const ACC_JOURNALS_URL         = 'journals';
export const ACC_TRANSACTIONS_URL     = 'transactions';
export const ACC_FILE_SELECTOR_URL    = 'file-select';
export const ACC_GENERATION_URL       = 'acc-generation';
export const ACC_DEPRECIATION_GEN_URL = 'deprec-gen';
export const ACC_REOPEN_URL           = 'acc-reopen';
export const ACC_PERIOD_SELECTOR_URL  = 'period-select';
export const ACC_FILES_URL            = 'acc-files';
export const ACC_PROJECTS_URL         = 'acc-projects';
export const ACC_BALANCE_QUERIES_URL  = 'balance-queries';

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
export const ABS_ADMINISTRATION_ATTRIBUTES_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ATTRIBUTE_URL].join('/');
export const ABS_ADMINISTRATION_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_REPORT_CATALOG_URL].join('/');
export const ABS_ADMINISTRATION_CITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_CITY_URL].join('/');
export const ABS_ADMINISTRATION_COUNTRY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_COUNTRY_URL].join('/');
export const ABS_ADMINISTRATION_WILAYA_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_WILAYA_URL].join('/');
export const ABS_ADMINISTRATION_DAIRAS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_DARIRA_URL].join('/');
export const ABS_ADMINISTRATION_ACCESS_RIGHTS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ACCCESSRIGHTS_URL].join('/');
export const ABS_ADMINISTRATION_TRACEABILITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_TRACEABILITY_URL].join('/');
export const ABS_DB_UPDATER_URL                  = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_DB_UPDATER_URL].join('/');
export const ABS_APP_ARCHIVE_DOCUMENTS_URL       = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ARCHIVE_DOCUMENTS_URL].join('/');
export const ABS_ADMINISTRATION_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, LOGISTICS_NUMBERING_URL].join('/');
export const ABS_ADMINISTRATION_WORKFLOW_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, LOGISTICS_WORKFLOW_URL].join('/');
export const ABS_ADMINISTRATION_USER_MESSAGES_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_USER_MESSAGES_URL].join('/');
export const ABS_ADMINISTRATION_USER_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_USER_DOCUMENTS_URL].join('/');
export const ABS_ADMINISTRATION_WORKFLOW_INBOX_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_WORKFLOW_INBOX_URL].join('/');

// Organizations
export const ABS_ORGANIZATIONS_CHART_URL = '/' + [MAIN_PAGE_URL, ORGANIZATIONS_APP_URL, ORGANIZATIONS_CHART_URL].join('/');
export const ABS_ORGANIZATIONS_DIVISIONS_URL = '/' + [MAIN_PAGE_URL, ORGANIZATIONS_APP_URL, ORGANIZATIONS_DIVISIONS_URL].join('/');
export const ABS_ORGANIZATIONS_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, ORGANIZATIONS_APP_URL, ORGANIZATIONS_DEPARTMENTS_URL].join('/');
export const ABS_ORGANIZATIONS_SERVICES_URL = '/' + [MAIN_PAGE_URL, ORGANIZATIONS_APP_URL, ORGANIZATIONS_SERVICES_URL].join('/');
export const ABS_ORGANIZATIONS_OFFICES_URL = '/' + [MAIN_PAGE_URL, ORGANIZATIONS_APP_URL, ORGANIZATIONS_OFFICES_URL].join('/');

// treasury
export const ABS_TREASURY_AGENT_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_AGENT_URL].join('/');
export const ABS_TREASURY_CHECKS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_CHECKS_URL].join('/');
export const ABS_TREASURY_PROCESSED_CHECKS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_PROCESSED_CHECKS_URL].join('/');
export const ABS_TREASURY_CHECK_BOOKS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_CHECK_BOOKS_URL].join('/');
export const ABS_TREASURY_JOURNALS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_JOURNALS_URL].join('/');
export const ABS_TREASURY_GROUPS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_GROUPS_URL].join('/');
export const ABS_TREASURY_DASHBOARD_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, DASHBOARD_URL].join('/');
export const ABS_TREASURY_REPORTS_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_TREASURY_JOURNAL_TYPE_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_JOURNAL_TYPE_URL].join('/');
export const ABS_TREASURY_TRANSACTION_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_TRANSACTION_URL].join('/');
export const ABS_TREASURY_BANK_EXPENSES_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_BANK_EXPENSE_URL].join('/');
export const ABS_TREASURY_CHECK_MATCHING_URL =  '/' + [MAIN_PAGE_URL, TREASURY_APP_URL, TREASURY_CHECK_MATCHING_URL].join('/');

// stock
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STORE_ASSIGNMENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_STORE_URL].join('/');
export const ABS_USER_STORE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, USER_STORES_URL].join('/');
export const ABS_STOCK_STORES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_STORES_URL].join('/');
export const ABS_STOCK_INVENTORY_ENTRY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_ENTRY_URL].join('/');
export const ABS_STOCK_INVENTORY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_URL].join('/');
export const ABS_STOCK_INVENTORY_EXIT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_EXIT_URL].join('/');
export const ABS_STOCK_CONSUMPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_URL].join('/');
export const ABS_STOCK_TRANSFER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_TRANSFER_URL].join('/');
export const ABS_STOCK_TRANSFER_RECEPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_TRANSFER_RECEPTION_URL].join('/');
export const ABS_INVENTORY_ANOMALIES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ANOMALY_URL].join('/');
export const ABS_STOCK_AGENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_URL].join('/');
export const ABS_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_ACCOUNT_URL].join('/');
export const ABS_STOCK_AGENT_PRICE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_AGENT_PRICE_URL].join('/');
export const ABS_STOCK_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_STOCK_STORE_NAMES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_STORE_NAMES_URL].join('/');
export const ABS_STOCK_UNITS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, STOCK_UNITS_URL].join('/');
export const ABS_STOCK_AGENT_TYPE = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, LOGISTICS_AGENT_TYPE_URL].join('/');
export const ABS_STOCK_REPORT_PARAMS = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_STOCK_REPORT_CATALOG = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_REPORT_CATALOG_URL].join('/');
export const ABS_STOCK_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, DASHBOARD_URL].join('/');
export const ABS_STOCK_REPORTS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_REPORTS_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLE_URL].join('/');
export const ABS_STOCK_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ACCOUNT_URL].join('/');
export const ABS_STOCK_GENERATION_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, GENERATION_ACCOUNT_URL].join('/');

// cspace
export const ABS_CUSTOMER_PROFILE = '/' + [MAIN_PAGE_URL, SHOPPING_CART_APP_URL, COMMON_CUSTOMER_PROFILE_URL].join('/');
export const ABS_CART = '/' + [MAIN_PAGE_URL, SHOPPING_CART_APP_URL, CSPACE_CART_URL].join('/');

// food
export const ABS_FOOD = '/' + [MAIN_PAGE_URL, FOOD_CART_APP_URL, FOOD_CART_URL].join('/');

//Accounting
export const ABS_POLICIES_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_POLICIES_URL].join('/');
export const ABS_ACC_JOURNALS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_JOURNALS_URL].join('/');
export const ABS_ACC_FILES_URL   = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_FILES_URL].join('/');
export const ABS_ACC_PROJECT_URL   = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_PROJECTS_URL].join('/');
export const ABS_ACC_TRANSACTIONS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_TRANSACTIONS_URL].join('/');
export const ABS_DEPRECIATION_GENERATION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_DEPRECIATION_GEN_URL].join('/');
export const ABS_ACC_FILE_SELECTION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_FILE_SELECTOR_URL].join('/');
export const ABS_ACC_PERIOD_SELECTION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_PERIOD_SELECTOR_URL].join('/');
export const ABS_ACC_ACCOUNT_URL     = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, COMMON_ACCOUNT_URL].join('/');
export const ABS_ACC_ASSET_ACCOUNT_URL     = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ASSET_ACCOUNT_URL].join('/');
export const ABS_ACC_TRANSAC_ACCOUNT_URL     = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, TRANSAC_ACCOUNT_URL].join('/');
export const ABS_ACC_GENERATION_ACCOUNT_URL  = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, GENERATION_ACCOUNT_URL].join('/');
export const ABS_ACC_CASHFLOW_ACCOUNT_URL  = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, CASHFLOW_ACCOUNTS_URL].join('/');
export const ABS_ACC_REPORTS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_GENERATION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_GENERATION_URL].join('/');
export const ABS_REOPEN_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_REOPEN_URL].join('/');
export const ABS_BALANCE_QUERIES_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_BALANCE_QUERIES_URL].join('/');

//Budget
export const ABS_BUDGET_BUDGET_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_BUDGET_URL].join('/');


//Logistics
export const ABS_LOGISTICS_PAY_METHOD = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');
export const ABS_LOGISTICS_OPTIONS = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_OPTION_URL].join('/');
export const ABS_LOGISTICS_AGENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_AGENT_URL].join('/');
export const ABS_LOGISTICS_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_NUMBERING_URL].join('/');
export const ABS_LOGISTICS_VAT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_VAT_URL].join('/');
export const ABS_LOGISTICS_COMPANY_TYPE = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL,  LOGISTICS_COMPANY_TYPE_URL].join('/');
export const ABS_LOGISTICS_ACTIVITY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_ACTIVITY_URL].join('/');
export const ABS_LOGISTICS_CURRENCY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_CURRENCY_URL].join('/');
export const ABS_LOGISTICS_CATEGORY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_CATEGORY_URL].join('/');
export const ABS_LOGISTICS_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOGISTICS_ARTICLES_URL].join('/');

// Contracts
export const ABS_CONTRACTS_PROJECT_TYPE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL,  CONTRACTS_PROJECT_TYPE_URL].join('/');
export const ABS_CONTRACTS_PROJECT_URL = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACT_PROJECT_URL].join('/');
export const ABS_CONTRACTS_PROJECT_MOTIVE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACTS_PROJECT_MOTIVE_URL].join('/');
export const ABS_CONTRACTS_AWARD_PROCEDURE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACTS_AWARD_PROCEDURE_URL].join('/');

// Scheduled sales
export const ABS_SCHEDULED_SALES_PROJECTS           = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_PROJECTS_URL].join('/');
export const ABS_SCHEDULED_SALES_ARTICLE            = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_ARTICLE_URL].join('/');
export const ABS_SCHEDULED_SALES_QUOTAS             = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_QUOTA_URL].join('/');
export const ABS_SCHEDULED_SALES_SCHEDULES          = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SCHEDULE_URL].join('/');
export const ABS_SCHEDULED_SALES_DISCOUNT_TYPES     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_DISCOUNTS_URL].join('/');
export const ABS_SALES_MODES_URL                    = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SALES_MODE_URL].join('/');
export const ABS_SCHEDULED_SALES_PARTNER_SCHEDULES  = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_PARTNER_SCHEDULE_URL].join('/');
export const ABS_SCHEDULED_SALES_PARTNER_TRUCKS     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_TRUCKS_URL].join('/');



//Finance
export const ABS_FINANCE_CPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CPAYMENTS_URL].join('/');
export const ABS_FINANCE_SPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SPAYMENTS_URL].join('/');
export const ABS_FINANCE_PAYMENT_ORDERS   = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, PAYMENT_ORDER].join('/');
export const ABS_FINANCE_DASHBOARD_URL    = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, DASHBOARD_URL].join('/');
export const ABS_FINANCE_PAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_PAYMENTS_URL].join('/');
export const ABS_FINANCE_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_COMPENSATION_URL].join('/');
export const ABS_FINANCE_SCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SCOMPENSATION_URL].join('/');
export const ABS_FINANCE_CCOMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CCOMPENSATION_URL].join('/');
export const ABS_FINANCE_REPORTS_URL = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, COMMON_REPORTS_URL].join('/');
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
export const ABS_HR_JUDICIAL_FRAMES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_JUDICIAL_FRAMES_URL].join('/');
export const ABS_HR_DECISION_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_DECISION_MOTIVE_URL].join('/');
export const ABS_HR_CONTRACT_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_CONTRACT_MOTIVE_URL].join('/');
export const ABS_HR_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_MOTIVE_URL].join('/');
export const ABS_INACTIVE_HR_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_INACTIVE_EMPLOYEES_URL].join('/');
export const ABS_HR_EMPLOYMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_EMPLOYMENT_TYPE_URL].join('/');
export const ABS_HR_SUSPENSION_REASON_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_SUSPENSION_REASON_URL].join('/');
export const ABS_HR_DIVISIONS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_DIVISIONS_URL].join('/');
export const ABS_HR_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, LOOKUPS_URL, HR_DEPARTMENTS_URL].join('/');
export const ABS_HR_PERSON_LIST_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_PERSON_LIST_URL].join('/');
export const ABS_HR_REPORTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_HR_DASHBOARD_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, DASHBOARD_URL].join('/');


// payroll
export const ABS_PAYROLL_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL].join('/');
export const ABS_ELEMENTSINFO_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENTSINFO_URL].join('/');
export const ABS_ELEMENT_TYPES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENT_TYPES_URL].join('/');
export const ABS_FORMULAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_FORMULAS_URL].join('/');
export const ABS_MONTH_CLOSER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_CLOSER].join('/');
export const ABS_VACATION_PLANNING_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_VACATION_PLANNING].join('/');
export const ABS_MONTH_CANCELER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_CANCELER].join('/');
export const ABS_ARCHIVE_GENERATOR_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ARCHIVE_GENERATOR].join('/');
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
export const ABS_ARCHIVE_VIEWER_URL  = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ARCHIVE_VIEWER_URL].join('/');
export const ABS_CACO_URL            = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_CACO_URL].join('/');
export const ABS_SALARY_GRID_URL     = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_SALARY_GRID].join('/');
export const ABS_PAYROLL_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, DASHBOARD_URL].join('/');

// Assets
export const ABS_ASSETS_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_ASSET_URL].join('/');
export const ABS_ASSET_COST_TYPES = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_COST_TYPE_URL].join('/');
export const ABS_ASSET_ACTIVITY = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, LOGISTICS_ACTIVITY_URL].join('/');
export const ABS_ASSET_END_TYPES = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_END_TYPE_URL].join('/');
export const ABS_ASSET_BLOCKING_TYPES = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_BLOCKING_TYPE_URL].join('/');
export const ABS_ASSET_CLASSES = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_CLASS_URL].join('/');
export const ABS_ASSET_REVALUATION_TYPES = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_REVALUATION_TYPE_URL].join('/');
export const ABS_ASSET_LOCATIONS = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_LOCATIONS_URL].join('/');
export const ABS_ASSET_OFFICES_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_OFFICES_URL].join('/');
export const ABS_ASSET_OPTIONS_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_OPTIONS_URL].join('/');
export const ABS_ASSET_RECEPTIONS_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_RECEPTIONS_URL].join('/');
export const ABS_ASSET_APPOINTMENT_DOC_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_APPOINTMENTS_DOC_URL].join('/');
export const ABS_ASSET_SEARCH_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_SEARCH_URL].join('/');
export const ABS_ASSET_INJECTION_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_INJECTION_URL].join('/');
export const ABS_ASSET_INVENTORY_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_INVENTORY_URL].join('/');
export const ABS_ASSET_TRANSFER_URL  = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_TRANSFER_URL].join('/');
export const ABS_ASSETS_AGENT_URL    = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_AGENT_URL].join('/');
export const ABS_ASSET_BUILDINGS     = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_BUILDING_URL].join('/');
export const ABS_ASSET_ACCOUNT_URL   = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_ACCOUNT_URL].join('/');
export const ABS_ASSET_MARKS_URL     = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, COMMON_MARKS_URL].join('/');
export const ABS_ASSET_STATUS_TYPES  = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, FURNITURE_STATUS_URL].join('/');
export const ABS_ASSET_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, DASHBOARD_URL].join('/');

// sales
export const ABS_SALES_DELIVERY_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_URL].join('/');
export const ABS_SALES_INVOICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_URL].join('/');
export const ABS_SALES_INVOICE_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_CANCEL_URL].join('/');
export const ABS_SALES_DELIVERY_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_CANCEL_URL].join('/');
export const ABS_SALES_ORDER_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_ORDER_URL].join('/');
export const ABS_SALES_PROFORMA_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_PROFORMA_URL].join('/');
export const ABS_SALES_REPORTS_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, COMMON_REPORTS_URL].join('/')
export const ABS_SALES_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, DASHBOARD_URL].join('/')
export const ABS_SALES_ADS = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_AD_URL].join('/');

// Purchace
export const ABS_PURCHASE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_URL].join('/');
export const ABS_PURCHASE_RECEPTION_CANCELLATION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_CANCELLATION_URL].join('/');
export const ABS_PURCHASE_ORDER_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_ORDER_URL].join('/');
export const ABS_PURCHASE_REQUEST_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_REQUEST_URL].join('/');
export const ABS_PURCHASE_QUOTATION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_QUOTATION_URL].join('/');
export const ABS_PURCHASE_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, DASHBOARD_URL].join('/')
export const ABS_PURCHASE_REPORTS_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, COMMON_REPORTS_URL].join('/')

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
        path: 'archive',
        children: [
            {path: '', component: AppArchiveListComponent, pathMatch: 'full' },
            {path: ':id', component: AppArchiveDetailComponent},
        ]
    },
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
