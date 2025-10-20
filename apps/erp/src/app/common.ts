import { MAIN_PAGE_URL } from '@ss/common/api-common';
import { Routes } from '@angular/router';
import { TotalComponent } from '@ss/logistics/ui-totals';
import { CirculationComponent } from '@ss/logistics/ui-circulation';
import { AgentBalanceComponent } from '@ss/logistics/ui-agent-balance';
import { AgentDebtsComponent } from '@ss/logistics/ui-agent-debts';
import { CardComponent } from '@ss/logistics/ui-card';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import {
    ACC_TRANSACTION_ARCHIVES,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/common/app-archive';
import {AgentAssetsListComponent} from '@ss/assets-component';
import { DocumentSourcesComponent } from 'logistics/ui-document-sources';
import { UiTransactionlineQuantitiesComponent } from '@ss/logistics/quantities';
import { UiMrpComponent } from '@ss/logistics/ui-mrp';
import {PAYROLL_MONTH_LOCK_URL} from "../../../../libs/payroll/payroll-lock/src/lib/payroll-lock/month-lock.api";
import { UiTotalStockComponent } from '../../../../libs/logistics/ui-total-stock/src';

// common
export const LOOKUPS_URL = 'lookups';
export const COMMON_ACCOUNT_URL     = 'accounts';
export const TRANSAC_ACCOUNT_URL    = 'transac-accounts';
export const GENERATION_ACCOUNT_URL = 'generation-accounts';
export const STOCK_ACCOUNT_URL      = 'stock-accounts';
export const CASHFLOW_ACCOUNTS_URL  = 'cashflow-accounts';
export const COMMON_MARKS_URL = 'marks';
export const COMMON_REPORTS_URL = 'reports';
export const COMMON_BLOOD_GROUPS_URL = 'blood-groups';
export const COMMON_COST_CENTER_GROUP_URL = 'cc-groups';

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
export const FURNITURE_APP_URL = 'furniture';
export const ARCH_VIEWER_APP_URL = 'arch-viewer';
export const ORGANIZATIONS_APP_URL = 'organizations';
export const LTM_APP_URL = 'ltm';
export const COSTING_APP_URL = 'costing';
export const CMMS_APP_URL = 'cmms';
export const CRM_APP_URL = 'crm';
export const PARK_APP_URL = 'park';
export const ARCH_VIEWER_URL = 'arch-viewer';
export const SERVICE_SALES = 'service-sales';
export const SCHEDULED_SALES_APP_URL = 'scheduled-sales';
export const MISSIONS_APP_URL = 'missions';
export const CONTRACTS_APP_URL = 'contracts';
export const SHOPPING_CART_APP_URL = 'scart';
export const FOOD_CART_APP_URL = 'food';
export const WORK_FLOW_APP_URL = 'workflow';
export const BUDGET_APP_URL = 'budget';
export const ATTENDANCE_APP_URL = 'attendance';
export const SERVICE_APP_URL = 'service-sales';
export const GICA_APP_URL = 'gica';
export const SOCIAL_APP_URL = 'social';
export const PRODUCTION_APP_URL = 'production';

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
export const ADMINISTRATION_REGION_URL = 'regions';
export const ADMINISTRATION_ACCCESSRIGHTS_URL = 'accessrights';
export const ADMINISTRATION_TRACEABILITY_URL = 'logging';
export const ADMINISTRATION_DB_UPDATER_URL   = 'db_updater';
export const ADMINISTRATION_REPORT_PRIVILEGE_URL   = 'report_privileges';
export const ADMIN_DARIRA_URL = 'dairas';
export const ADMIN_USER_MESSAGES_URL = 'user-messages';
export const ADMIN_USER_RECEIVED_MESSAGES_URL = 'received-messages';
export const ADMIN_USER_DOCUMENTS_URL = 'user-documents';
export const ADMIN_WORKFLOW_INBOX_URL = 'workflow-inbox';
export const ADMIN_WORKFLOW_CHART_URL = 'workflow-chart';
export const ADMIN_REPORT_RIGHTS_URL = 'report-rights';
export const ADMINISTRATION_PASS_ENCODING_URL = 'password-encoding';
export const ADMINISTRATION_GLOBAL_VALIDATION_URL = 'global-validation';


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
export const REFERENCE_CORRECTION_URL = 'reference-correction';
export const STOCK_ANOMALY_URL = 'anomalies';
export const STOCK_INVENTORY_ENTRY_URL = 'inventory-entries';
export const STOCK_PARTS_REQUEST_URL = 'parts-requests';
export const STOCK_INVENTORY_EXIT_URL = 'inventory-exits';
export const STOCK_TRANSFER_URL       = 'transfers';
export const STOCK_TRANSFER_RECEPTION_URL  = 'transfer-reception';
export const STOCK_TRANSFER_REINTEGRATION_URL  = 'transfer-reintegration';
export const STOCK_CONSUMPTION_URL = 'consumptions';
export const STOCK_RESERVATIONS_URL = 'reservations';
export const STOCK_CONSUMPTION_CANCELLATION_URL = 'cconsumptions';
export const STOCK_INVENTORY_URL = 'inventory';
export const STOCK_AGENT_URL = 'agents';
export const STOCK_AGENT_PRICE_URL = 'agent-prices';
export const STOCK_COST_CENTER_URL = 'cost-centers';
export const STOCK_CLASSES_URL = 'classes';
export const STOCK_DASHBOARD_URL = 'dashboard';
export const STOCK_SUBCLASSES_URL = 'subclasses';
export const STOCK_STORE_NAMES_URL = 'storeNames';
export const STOCK_UNITS_URL = 'units';
export const STOCK_REPORT_CATALOG_URL = 'report-catalog';
export const STOCK_REPORTS_URL = 'stock-reports';
export const STOCK_ARTICLE_URL = 'stock-articles';
export const BOM_URL = 'bom';
export const ACC_RECORDS = 'accrecords';
export const STOCK_PRICE_RECALCULATION_URL = 'price-recalculation';
export const STOCK_ARTICLE_TYPE_URL = 'article-types';
export const STOCK_DOCUMENT_RECALCULATION_URL = 'document-recalculation';

// Budget
export const BUDGET_BUDGET_URL   = 'budgets';
export const BUDGET_GROUP_URL    = 'budget-groups';
export const BUDGET_PLANNING_URL = 'budget-planning';
export const BUDGET_SELECTOR_URL = 'budget-selector';
export const BUDGET_COMMITMENT_URL = 'budget-commitment';
export const BUDGET_TRANSFER_URL   = 'budget-transfer';

// common
export const ABS_COMMON_REPORTS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_ASSETS_REPORTS_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_COMMON_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, LOOKUPS_URL, COMMON_MARKS_URL].join('/');

// Purchase
export const PURCHASE_RECEPTION_URL = 'receptions';
export const PURCHASE_RECEPTION_INVOICE_URL = 'purchase-invoices';
export const IMPORT_PURCHASE_RECEPTION_URL = 'import-receptions';
export const PURCHASE_RECEPTION_CANCELLATION_URL = 'creceptions';
export const PURCHASE_ORDER_URL = 'porders';
export const PURCHASE_REQUEST_URL = 'prequests';
export const PRICE_REQUEST_URL = 'price-requests';
export const PURCHASE_QUOTATION_URL = 'offers';
export const PAYMENT_ORDER = 'payment-orders';

// Logistics
export const LOGISTICS_ARTICLES_URL = 'articles';
export const LOGISTICS_PAY_METHOD_URL = 'mpay';
export const LOGISTICS_PAYMENTS_URL = 'payments';
export const LOGISTICS_ADVANCEMENTS_URL = 'advancements';
export const LOGISTICS_SPAYMENTS_URL = 'spayments';
export const LOGISTICS_CPAYMENTS_URL = 'cpayments';
export const LOGISTICS_COMPENSATION_URL = 'compensations';
export const LOGISTICS_SCOMPENSATION_URL = 'scompensations';
export const LOGISTICS_CCOMPENSATION_URL = 'ccompensations';
export const LOGISTICS_OPTION_URL = 'options';
export const LOGISTICS_ORDER_ANOMALIES_URL = 'order-anomalies';
export const LOGISTICS_AGENT_URL = 'agents';
export const LOGISTICS_CUSTOMER_URL = 'customers';
export const LOGISTICS_TRANSPORTER_URL = 'transporters';
export const LOGISTICS_SUPPLIER_URL = 'suppliers';
export const LOGISTICS_NUMBERING_URL = 'documents';
export const LOGISTICS_AGENT_TYPE_URL = 'agentTypes';
export const LOGISTICS_COMPANY_TYPE_URL = 'companyTypes';
export const LOGISTICS_ACTIVITY_URL = 'activities';
export const LOGISTICS_CURRENCY_URL = 'currencies';
export const FURNITURE_STATUS_URL = 'furniture-states';
export const LOGISTICS_WORKFLOW_URL = 'workflow-messages';
export const DELIVERY_TIME_URL = 'delivery-times';
export const LOGISTICS_AGENT_MERGE_URL = 'agent-merge';
export const LOGISTICS_DELIVERY_TIME_URL = 'delivery-time';
export const LOGISTICS_SHIPMENT_MODE_URL = 'shipment-mode';


// Contracts
export const CONTRACTS_PROJECT_TYPE_URL = 'projectTypes';
export const CONTRACTS_PROJECT_MOTIVE_URL = 'projectMotives';
export const CONTRACTS_AWARD_PROCEDURE_URL = 'award-procedure';
export const CONTRACT_PROJECT_URL = 'contracts';
export const CONTRACT_CEMENT_URL = 'cements';
export const CONTRACTS_PURCHASE_CONTRACT_URL = 'purchase-contracts';
export const SALES_COMPENSATION_URL = 'sales-compensations';
export const SALES_PAYMENT_COMPENSATION_URL = 'payment-compensations';
export const SALES_INVOICE_VALIDATION_URL = 'invoice-validation';
export const TRANSPORT_CONTRACT_URL = 'transport-contracts';


// Sales
export const SALES_DELIVERY_URL = 'delivery';
export const SALES_INVOICE_URL = 'invoice';
export const SALES_INVOICE_CANCEL_URL = 'cinvoice';
export const SALES_EXPORT_INVOICE_CANCEL_URL = 'export-invoice';
export const SALES_DELIVERY_CANCEL_URL = 'cdelivery';
export const SALES_ORDER_URL = 'order';
export const SALES_PROFORMA_URL = 'proforma';
export const SALES_AD_URL = 'sales-ads';
export const SALES_SERVICE_ARTICLE_URL = 'service-articles';
export const SERVICE_INVOICE_URL = 'service-invoice';
export const SERVICE_INVOICE_CANCELLATION_URL = 'service-cinvoice';
export const SERVICE_CLASSES_URL = 'service-classes';
export const COMPLEMENT_INVOICE_URL = 'complement-invoice';
export const SALES_CATEGORY_URL = 'sales-categories';
export const SS_COMPLAINTS_URL     = 'sales-complaints';
export const SS_SUGGESTIONS_URL    = 'sales-suggestions';
export const SALES_PRICE_LIST_URL  = 'sales-pricelist';

// HR
export const HR_CATEGORIES_URL = 'categories';
export const HR_SERVICES_URL = 'services';
export const HR_DIPLOMAS_URL = 'diplomas';
export const HR_PROFESSIONAL_FAULT_URL = 'prof-faults';
export const HR_PUNISHMENT_TYPE_URL = 'punishment-types';
export const HR_EDUCATION_LEVELS_URL = 'educationLevels';
export const HR_MARITAL_STATUS_URL = 'maritalStatus';
export const HR_CAREER_MOTIVE_URL = 'career-motives';
export const HR_POSTS_URL = 'posts';
export const HR_NATIONALITIES_URL = 'nationalities';
export const HR_JUDICIAL_FRAMES_URL = 'judicial-frames';
export const HR_DECISION_MOTIVE_URL = 'decision-motives';
export const HR_CONTRACT_MOTIVE_URL = 'contract-motives';
export const HR_MOTIVE_URL          = 'motives';
export const HR_WORK_STOPPAGE_URL          = 'stoppages';
export const HR_EMPLOYEES_URL       = 'employees';
export const HR_INACTIVE_EMPLOYEES_URL = 'inactive-employees';
export const HR_PERSON_LIST_URL = 'stats';
export const HR_EMPLOYMENT_TYPE_URL = 'employmentType';
export const HR_SUSPENSION_REASON_URL = 'suspensionReason';
export const HR_DIVISIONS_URL = 'divisions';
export const HR_HOLIDAY_REQUEST_URL = 'holiday-requests';
export const HR_DEPARTMENTS_URL = 'departments';
export const HR_ACTIVITY_URL = 'activities';
export const HR_PHYSICIAN_URL = 'physicians';
export const HR_SPECIALTY_URL = 'specialties';
export const HR_ID_UPDATE_URL = 'id-update';
export const HR_CRITERIA_URL = 'hr-criteria';
export const HR_GRADING_URL = 'hr-grading';
export const HR_LANGUAGE_LEVELS_URL = 'language-levels';
export const HR_LANGUAGES_URL = 'languages';
export const HR_TRN_SUBJECTS_URL = 'training-subject';
export const HR_WORKSHOP_URL = 'workshop';
export const HR_VACATION_TYPES_URL = 'vacation-types';



// Payroll
export const PAYROLL_INACTIVE_EMPLOYEES_URL = 'pay-inactive-employees';
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
export const PAY_GRID_UPDATE_URL        = 'grid-update';
export const PAY_SALARY_GRID          = 'salary-grid';
export const PAY_ELEMENTS_ENTRY_URL   = 'elementsentry';
export const PAY_AMENDMENT_URL        = 'amendments';
export const PAY_LOANS_URL            = 'loans';
export const PAY_FIXED_ELEMENTS_URL   = 'fixedelements';
export const PAY_EDO_URL              = 'edo';
export const PAY_DAS_URL              = 'das';
export const PAY_ARCHIVE_VIEWER_URL   = 'archive-viewer';
export const PAY_CACO_URL             = 'caco';
export const PAY_OPTIONS_URL          = 'payroll-options';
export const PAY_FUNDS_URL            = 'payroll-funds';
export const PAY_IRG_CALC             = 'irg-calc';
export const PAYROLL_LOAN_INJECTION_URL = 'loan-injection';
export const PAY_PERIOD_LOCK_URL = 'payroll-periods';

// Assets
export const ASSETS_ASSET_URL            = 'assets';
export const ASSETS_ASSET_PM_URL            = 'assets-pm';
export const ASSET_COST_TYPE_URL         = 'cost_types';
export const ASSET_BLOCKING_TYPE_URL     = 'blocking_types';
export const ASSET_END_TYPE_URL          = 'end_types';
export const ASSET_CLASS_URL             = 'asset_classes';
export const ASSET_LOCATIONS_URL         = 'locations';
export const ASSET_REVALUATION_TYPE_URL  = 'revaluation_types';
export const ASSETS_COST_URL             = 'costs';
export const ASSETS_DEPRECIATION_URL     = 'rates';
export const ASSETS_REVALUATION_URL      = 'revaluations';
export const ASSETS_APPOINTMENTS_URL     = 'appointments';
export const ASSETS_BLOCKING_URL         = 'blockings';
export const ASSETS_OFFICES_URL          = 'offices';
export const ASSET_OPTIONS_URL           = 'asset-policies';
export const ASSET_TRANSFER_URL          = 'asset-transfer';
export const ASSETS_SEARCH_URL           = 'asset-search';
export const ASSETS_INJECTION_URL        = 'asset-injection';
export const ASSET_INVENTORY_URL         = 'asset-inventories';
export const ASSET_QR_INVENTORY_URL         = 'asset-qr-inventories';
export const ASSET_RECEPTIONS_URL        = 'asset-receptions';
export const ASSETS_APPOINTMENTS_DOC_URL = 'asset-appointments';
export const ASSETS_AGENT_URL            = 'agents';
export const ASSET_BUILDING_URL          = 'buildings';
export const ASSET_ACCOUNT_URL           = 'asset-accounts';
export const ASSET_INVENTORY_DOC_URL     = 'inventory-docs';
export const ASSET_UNIDENTIFIED_INVENTORY_URL = 'unidentified-inventory';

// Scheduled sales
export const SS_PROJECTS_URL             = 'ss_projects';
export const SS_QUOTA_URL                = 'ss_quotas';
export const SS_ARTICLE_URL              = 'ss_article';
export const SS_DISCOUNTS_URL            = 'discounts';
export const SS_SCHEDULE_URL             = 'schedules';
export const SS_PARTNER_SCHEDULE_URL     = 'partner-schedules';
export const SS_SALES_MODE_URL           = 'sales-modes';
export const SS_TRUCKS_URL               = 'supplier-trucks';
export const SERVICE_ORDER_URL           = 'service-order';
export const INVOICE_DUPLICATE_URL       = 'service-duplicate';
export const PASSWORD_RESET_URL          = 'password-reset';
export const SS_SALES_POLL_URL           = 'sales-poll';
export const SS_POLL_QUESTION_URL        = 'question-poll';
export const SS_POLL_CHARTS_URL          = 'poll-charts';
export const SS_POLL_HISTORY_CHARTS_URL  = 'history-poll-charts';


// Missions
export const MISSION_PREPARATION_URL = 'missions';
export const MISSION_TRAJECTORIES = 'trajectories';
export const MISSION_EXPENSES_URL = 'journeys';
export const MISSION_ELEMENTS_URL = 'elements';
export const ELEMENT_GENERATION_URL = 'element-generation';

// Attendance
export const ATTENDANCE_MACHINES_URL = 'attendance-machines';
export const ABSENCE_MOTIVE_URL      = 'absence-motives';
export const WORK_SHIFTS_URL         = 'work-shifts';
export const SHIFT_ASSIGNMENT_URL    = 'shift-assignments';
export const ATTENDANCE_LOG_URL      = 'attendance-log';
export const MANUAL_ATTENDANCE_URL   = 'manual-attendance';
export const HOLIDAY_URL             = 'holidays';
export const ABSENCE_TYPE_URL        = 'absence-types';
export const ABSENCE_FIELDS_URL      = 'absence-fields';
export const SERIAL_ATTENDANCE_URL   = 'serial-attendance';


// Missions
export const ABS_MISSION_PREPARATION_URL = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_PREPARATION_URL].join('/');
export const ABS_MISSION_TRAJECTORY_URL  = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_TRAJECTORIES].join('/');
export const ABS_MISSION_EXPENSES_URL  = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_EXPENSES_URL].join('/');
export const ABS_MISSION_ELEMENTS_URL  = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, MISSION_ELEMENTS_URL].join('/');
export const ABS_ELEMENT_GENERATION_URL  = '/' + [MAIN_PAGE_URL, MISSIONS_APP_URL, ELEMENT_GENERATION_URL].join('/');

// Attendance
export const ABS_ATTENDANCE_WORKSHIFTS_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, WORK_SHIFTS_URL].join('/');
export const ABS_ATTENDANCE_MACHINES_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, ATTENDANCE_MACHINES_URL].join('/');
export const ABS_SHIFT_ASSIGNMENTS_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, SHIFT_ASSIGNMENT_URL].join('/');
export const ABS_ATTENDANCE_LOG_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, ATTENDANCE_LOG_URL].join('/');
export const ABS_ATTENDANCE_HOLIDAY_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, HOLIDAY_URL].join('/');
export const ABS_ATTENDANCE_ABSENCE_MOTIVE_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, ABSENCE_MOTIVE_URL].join('/');
export const ABS_MANUAL_SIGNATURE_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, MANUAL_ATTENDANCE_URL].join('/');
export const ABS_ABSENCE_TYPES_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, ABSENCE_TYPE_URL].join('/');
export const ABS_ABSENCE_FIELDS_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, ABSENCE_FIELDS_URL].join('/');
export const ABS_SERIAL_ATTENDANCE_URL = '/' + [MAIN_PAGE_URL, ATTENDANCE_APP_URL, SERIAL_ATTENDANCE_URL].join('/');

//Dashboard
export const DASHBOARD_QUERY_URL = 'queries';
export const DASHBOARD_URL       = 'dashbaord';

// GICA
export const GICA_WEIGHTS_URL = 'gica-motives';
export const GICA_FAULTS_URL = 'gica-faults';
export const GICA_CRITERIA_URL = 'gica-crieria';
export const GICA_CONSTANTS_URL = 'gica-constants';
export const GICA_SCALE_URL = 'gica-scale';
export const GICA_REPORTS_URL = 'gica-reports';
export const GICA_HISTORY_URL = 'gica-history';
export const GICA_GRADING_URL = 'gica-grading';
export const GICA_DEGRADING_URL = 'gica-degrading';
export const GICA_EVOLUTIONS_URL = 'gica-evolutions';
export const GICA_CAREER_MOTIVE_URL = 'gica-career-motives';


// LTM
export const LTM_TEST_EQUIPMENT_URL     = 'ltm-test-equipment';
export const LTM_LINES_URL              = 'ltm-lines';
export const LTM_TEST_URL               = 'ltm-tests';
export const LTM_UNIT_URL               = 'ltm-units';
export const LTM_MATTER_URL             = 'ltm-matters';
export const LTM_PERIODICITY_URL        = 'ltm-periodicities';
export const LTM_TESTING_URL            = 'ltm-testings';
export const LTM_CHARTS_URL             = 'ltm-reports';
export const LTM_CHEMICAL_TEST_URL      = 'ltm-chemical-test';
export const LTM_DEPOSIT_TEST_URL       = 'ltm-deposit-test';
export const LTM_RAW_MATERIAL_TEST_URL  = 'ltm-raw-test';
export const LTM_ALERT_URL              = 'ltm-alerts';
export const LTM_PHYSICAL_TEST_URL      = 'ltm-sample';
export const LTM_TEST_TYPE_URL          = 'test-types';
export const LTM_MIXTURE_URL            = 'ltm-mixtures';
export const LTM_ANOMALIES_URL          = 'ltm-anomalies';
export const LTM_EQUIPMENT_URL          = 'ltm-equipment';
export const LTM_PRODUCTS_URL           = 'ltm-products';
export const LTM_TESTING_ANOMALIES_URL   = 'ltm-testing-anomalies';
export const LTM_SILOS_URL   = 'ltm-silos';
export const LTM_PRODUCT_TYPE_URL   = 'ltm-product-types';
export const LTM_NORM_URL   = 'ltm-norms';
export const LTM_NORM_TREE_TREE   = 'ltm-norm-tree';
export const LTM_PICKUP_POINTS_URL   = 'ltm-pickup-points';
export const LTM_BLEACHER_URL   = 'ltm-bleachers';
export const LTM_ZONE_URL   = 'ltm-zones';
export const LTM_DEPOSIT_URL   = 'ltm-deposit';
export const LTM_SUPPLIER_URL   = 'ltm-suppliers';
export const LTM_CORRECTION_ACTION_URL = 'ltm-correction-actions';
export const LTM_TEST_EQUIPMENT_TESTING_URL = 'ltm-equipment-testing';
export const LTM_PRODUCT_LIBERATION_ROUTE_URL = 'ltm-liberation';
export const LTM_MAILING_LIST_URL = 'ltm-mailings';


// CMMS
export const CMMS_PERMIT_TYPE_URL        = 'permit-types';
export const CMMS_FAULTS_URL        = 'cmms-faults';
export const CMMS_STATUS_URL        = 'cmms-status';
export const CMMS_PRIORITY_URL      = 'cmms-priority';
export const CMMS_FAULT_CAUSE_URL   = 'cmms-causes';
export const CMMS_ROOT_CAUSE_URL    = 'cmms-root-causes';
export const CMMS_TYPE_URL          = 'cmms-types';
export const CMMS_ROUTING_URL       = 'cmms-routing';
export const CMMS__PLANS__URL       = 'cmms-plans';
export const CMMS__PM__URL          = 'cmms-pm';
export const CMMS_ALERT_URL         = 'cmms-alerts';
export const CMMS_METER_URL         = 'cmms-meters';
export const CMMS_READING_URL       = 'cmms-readings';
export const CMMS_TRIGGER_URL       = 'cmms-triggers';
export const CMMS_PREV_ORDER_URL  = 'prev-orders';
export const CMMS_CUR_WORK_ORDER_URL  = 'cur-orders';
export const CMMS_INSPECTION_ORDER_URL  = 'inspec-orders';
export const CMMS_SERVICE_REQUEST_URL  = 'srv-requets';
export const CMMS_SOLUTION_URL  = 'cmms-solutions';
export const CMMS_CHARTS_URL           = 'charts';
export const CMMS_GANT_URL           = 'gantt';
export const CMMS_ASSET_TREE           = 'cmms-asset-tree';
export const CMMS_EMPLOYEES_URL           = 'cmms-employees';
export const CMMS_FUNCTION_URL           = 'cmms-functions';
export const CMMS_CHECKLIST_URL           = 'cmms-checkist';
export const CMMS_INSPECTION_URL           = 'cmms-inspections';

// assets
export const FURNITURE_URL            = 'furniture';
export const FURNITURE_RECEIVER_URL   = 'furniture-receivers';
export const FURNITURE_RECEPTION_URL  = 'furniture-receptions';
export const FURNITURE_ASSIGNMENT_URL = 'furniture-assignments';
export const FURNITURE_SALES_URL      = 'furniture-sales';
export const FURNITURE_TYPES_URL      = 'furniture-types';

// App. Archive viewer
export const AA_VIEWER = 'aa-viewer';
export const AA_RIGHTS = 'aa-rights';

// Costing
export const COSTING_ITEMS_URL = 'costing-items';
export const COSTING_KEY_URL = 'costing-keys';
export const COSTING_PRODUCTS_URL = 'costing-products';
export const COSTING_PROJECT_URL = 'costing-projects';
export const COSTING_FINAL_PRODUCT = 'final-products';
export const COSTING_ACCOUNTING_URL = 'cost-accounting';

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
export const ACC_SALES_INJECTION_URL  = 'sales-injection';
export const ACC_GENERAL_INJECTION_URL  = 'excel-injection';
export const ACC_DEPRECIATION_GEN_URL = 'deprec-gen';
export const ACC_REOPEN_URL           = 'acc-reopen';
export const ACC_PERIOD_SELECTOR_URL  = 'period-select';
export const ACC_FILES_URL            = 'acc-files';
export const ACC_PROJECTS_URL         = 'acc-projects';
export const ACC_BALANCE_QUERIES_URL  = 'balance-queries';
export const ACC_F8_URL   = 'f-8';
export const ACC_F82_URL  = 'f-82';
export const ACC_F12_URL  = 'f-12';
export const ACC_F13_URL  = 'f-13';
export const ACC_CONSOLIDATION_CENTERS_URL = 'consolidation-centers';
export const ACC_TRANSACTION_MATCHING_URL = 'transaction-matching';
export const ACC_CLOSED_PERIODS_URL   = 'closed-periods';
export const ACC_CATEGORY_ACCOUNTS_URL   = 'category-accounts';
export const ACC_CLASS_ACCOUNTS_URL   = 'class-accounts';

// park
export const PARK_DRIVER_URL = 'drivers';
export const PARK_MISSION_URL = 'missions';
export const PARK_VEHICLE_URL = 'vehicles';
export const PARK_VEHICLE_TYPES_URL = 'vehicle-types';
export const PARK_VEHICLE_STATES_URL = 'vehicle-state';
export const PARK_FUEL_TYPES_URL = 'fuel-types';
export const PARK_INSURANCE_POLICIES_URL = 'insurance-policies';
export const PARK_INSURANCE_AGENCIES_URL = 'insurance-agencies';
export const PARK_DESTINATION_URL = 'park-destinations';

// production
export const PRODUCTION_ORDER_URL = 'productions-order';
export const PRODUCTIONS_URL = 'productions';
export const PRODUCTION_MRP_URL = 'mrp';
export const PRODUCTION_BOM_URL = 'bom';
export const PRODUCTION_ARTICLE_URL = 'production-article';
export const PRODUCTION_LOT_MANAGEMENT_URL = 'lot-management';
export const PRODUCTION_LOT_ANALYSIS_URL = 'lot-analysis';
export const PRODUCTION_LOT_PRIORITY_URL = 'lot-priority';
export const PRODUCTION_INTER_STORE_TRANSFER_URL = 'inter-store-transfer';
export const PRODUCTION_UNLOCKING_LOTS_URL = 'unlocking-lots';
export const PRODUCTION_ARTICLE_TYPES_URL = 'article_types';
export const PRODUCTION_DOSAGE_UNITS_URL = 'dosage_units';
export const PRODUCTION_PACKAGING_UNITS_URL = 'packaging_units';

// crm
export const CRM_SALUTATIONS_URL = 'salutations';
export const CRM_JOBS_URL = 'jobs';
export const CRM_DEPARTMENTS_URL = 'departments';
export const CRM_CONTACT_METHODS_URL = 'contact-methods';
export const CRM_STATUS_URL = 'status';
export const CRM_PAYMENT_TERMS_URL = 'payment-terms';
export const CRM_CUSTOMER_URL = 'crm-customer';
export const CRM_LEADS_URL = 'crm-leads';
export const CRM_CAMPAIGN_URL = 'crm-campaign';
export const CRM_MAILING_LIST_URL = 'crm_mailing_lists';
export const CRM_TEAMS_URL = 'crm-teams-list';
export const CRM_OPPORTUNITY_URL = 'crm-opportunity';
export const CRM_EMAIL_TEMPLATE_URL = 'crm-email-template';
export const CRM_CALENDAR_URL = 'crm-calendar';

// #############
// # FULL URLS #
// #############

// administration
export const ABS_ADMINISTRATION_COMPANY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_COMPANY_URL].join('/');
export const ABS_ADMINISTRATION_USER_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_USER_URL].join('/');
export const ABS_ADMINISTRATION_ROLE_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ROLE_URL].join('/');
export const ABS_ADMINISTRATION_REGION_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_REGION_URL].join('/');
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
export const ABS_ADMINISTRATION_REPORT_RIGHTS_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_REPORT_RIGHTS_URL].join('/');
export const ABS_ADMINISTRATION_REPORT_PRIVILEGE_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_REPORT_PRIVILEGE_URL].join('/');
export const ABS_ADMINISTRATION_TRACEABILITY_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_TRACEABILITY_URL].join('/');
export const ABS_DB_UPDATER_URL                  = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_DB_UPDATER_URL].join('/');
export const ABS_APP_ARCHIVE_DOCUMENTS_URL       = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_ARCHIVE_DOCUMENTS_URL].join('/');
export const ABS_ADMINISTRATION_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, LOGISTICS_NUMBERING_URL].join('/');
export const ABS_ADMINISTRATION_WORKFLOW_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, LOGISTICS_WORKFLOW_URL].join('/');
export const ABS_ADMINISTRATION_USER_MESSAGES_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_USER_MESSAGES_URL].join('/');
export const ABS_ADMINISTRATION_USER_RECEIVED_MESSAGES_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_USER_RECEIVED_MESSAGES_URL].join('/');
export const ABS_ADMINISTRATION_USER_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_USER_DOCUMENTS_URL].join('/');
export const ABS_ADMINISTRATION_WORKFLOW_INBOX_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_WORKFLOW_INBOX_URL].join('/');
export const ABS_ADMINISTRATION_WORKFLOW_CHART_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMIN_WORKFLOW_CHART_URL].join('/');
export const ABS_ADMINISTRATION_PASS_ENCODING_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_PASS_ENCODING_URL].join('/');
export const ABS_ADMINISTRATION_GLOBAL_VALIDATION_URL = '/' + [MAIN_PAGE_URL, ADMINISTRATION_APP_URL, ADMINISTRATION_GLOBAL_VALIDATION_URL].join('/');

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
export const ABS_STOCK_CLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CLASSES_URL].join('/');
export const ABS_STOCK_SUBCLASSES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_SUBCLASSES_URL].join('/');
export const ABS_STORE_ASSIGNMENT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLES_STORE_URL].join('/');
export const ABS_USER_STORE_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, USER_STORES_URL].join('/');
export const ABS_STOCK_INVENTORY_ENTRY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_ENTRY_URL].join('/');
export const ABS_STOCK_INVENTORY_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_URL].join('/');
export const ABS_STOCK_INVENTORY_EXIT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_INVENTORY_EXIT_URL].join('/');
export const ABS_STOCK_CONSUMPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_URL].join('/');
export const ABS_STOCK_RESERVATION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_RESERVATIONS_URL].join('/');
export const ABS_STOCK_PARTS_REQUEST_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_PARTS_REQUEST_URL].join('/');
export const ABS_STOCK_CONSUMPTION_CANCELLATION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_CONSUMPTION_CANCELLATION_URL].join('/');
export const ABS_STOCK_TRANSFER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_TRANSFER_URL].join('/');
export const ABS_STOCK_TRANSFER_REINTEGRATION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_TRANSFER_REINTEGRATION_URL].join('/');
export const ABS_STOCK_TRANSFER_RECEPTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_TRANSFER_RECEPTION_URL].join('/');
export const ABS_INVENTORY_ANOMALIES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ANOMALY_URL].join('/');
export const ABS_REFERENCE_CORRECTION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, REFERENCE_CORRECTION_URL].join('/');
export const ABS_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_ACCOUNT_URL].join('/');
export const ABS_STOCK_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_STOCK_STORE_NAMES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_STORE_NAMES_URL].join('/');
export const ABS_STOCK_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, DASHBOARD_URL].join('/');
export const ABS_STOCK_REPORTS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_REPORTS_URL].join('/');
export const ABS_STOCK_ARTICLES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLE_URL].join('/');
export const ABS_STOCK_STOCK_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ACCOUNT_URL].join('/');
export const ABS_STOCK_GENERATION_ACCOUNT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, GENERATION_ACCOUNT_URL].join('/');
export const ABS_INVENTORY_PRICE_RECALCULATION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_PRICE_RECALCULATION_URL].join('/');
export const ABS_STOCK_REPORT_RIGHT_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, ADMIN_REPORT_RIGHTS_URL].join('/');
export const ABS_STOCK_ARTICLE_TYPES_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_ARTICLE_TYPE_URL].join('/');
export const ABS_STOCK_MARKS_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, COMMON_MARKS_URL].join('/');
export const ABS_INVENTORY_DOCUMENT_RECALCULATION_URL = '/' + [MAIN_PAGE_URL, STOCK_APP_URL, STOCK_DOCUMENT_RECALCULATION_URL].join('/');

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
export const ABS_ACC_F8_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_F8_URL].join('/');
export const ABS_ACC_F82_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_F82_URL].join('/');
export const ABS_ACC_F12_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_F12_URL].join('/');
export const ABS_ACC_F13_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_F13_URL].join('/');
export const ABS_ACC_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, DASHBOARD_URL].join('/');
export const ABS_SALES_GENERATION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_SALES_INJECTION_URL].join('/');
export const ABS_GENERAL_GENERATION_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_GENERAL_INJECTION_URL].join('/');
export const ABS_CONSOLIDATION_CENTERS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_CONSOLIDATION_CENTERS_URL].join('/');
export const ABS_ACC_TRANSACTION_MATCHING_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_TRANSACTION_MATCHING_URL].join('/');
export const ABS_ACC_CLOSED_PERIODS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_CLOSED_PERIODS_URL].join('/');
export const ABS_ACC_CATEGORY_ACCOUNTS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_CATEGORY_ACCOUNTS_URL].join('/');
export const ABS_ACC_CLASS_ACCOUNTS_URL = '/' + [MAIN_PAGE_URL, ACCOUNTING_APP_URL, ACC_CLASS_ACCOUNTS_URL].join('/');

//Budget
export const ABS_BUDGET_BUDGET_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_BUDGET_URL].join('/');
export const ABS_BUDGET_GROUP_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_GROUP_URL].join('/');
export const ABS_BUDGET_PLANNING_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_PLANNING_URL].join('/');
export const ABS_BUDGET_COMMITMENT_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_COMMITMENT_URL].join('/');
export const ABS_BUDGET_TRANSFER_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_TRANSFER_URL].join('/');
export const ABS_BUDGET_REPORTS_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_BUDGET_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, DASHBOARD_URL].join('/');
export const ABS_BUDGET_SELECTOR_URL = '/' + [MAIN_PAGE_URL, BUDGET_APP_URL, BUDGET_SELECTOR_URL].join('/');


//Logistics
export const ABS_LOGISTICS_PAY_METHOD = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');
export const ABS_LOGISTICS_OPTIONS = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_OPTION_URL].join('/');
export const ABS_LOGISTICS_AGENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_AGENT_URL].join('/');
export const ABS_LOGISTICS_CUSTOMER_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_CUSTOMER_URL].join('/');
export const ABS_LOGISTICS_TRANSPORTER_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_TRANSPORTER_URL].join('/');
export const ABS_LOGISTICS_SUPPLIER_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_SUPPLIER_URL].join('/');
export const ABS_LOGISTICS_ARTICLES_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_ARTICLES_URL].join('/');
export const ABS_LOGISTICS_DOCUMENT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_NUMBERING_URL].join('/');
export const ABS_LOGISTICS_VAT_URL = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_VAT_URL].join('/');
export const ABS_LOGISTICS_COMPANY_TYPE = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL,  LOGISTICS_COMPANY_TYPE_URL].join('/');
export const ABS_LOGISTICS_ACTIVITY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_ACTIVITY_URL].join('/');
export const ABS_LOGISTICS_CURRENCY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_CURRENCY_URL].join('/');
export const ABS_LOGISTICS_CATEGORY = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, SALES_CATEGORY_URL].join('/');
export const ABS_LOGISTICS_UNITS = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, STOCK_UNITS_URL].join('/');
export const ABS_LOGISTICS_ORDER_ANOMALIES = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_ORDER_ANOMALIES_URL].join('/');
export const ABS_LOGISTICS_DELIVERY_TIMES = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, DELIVERY_TIME_URL].join('/');
export const ABS_LOGISTICS_AGENT_MERGE = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_AGENT_MERGE_URL].join('/');
export const ABS_LOGISTICS_SHIPMENT_MODES = '/' + [MAIN_PAGE_URL, LOGISTICS_APP_URL, LOGISTICS_SHIPMENT_MODE_URL].join('/');

// Contracts
export const ABS_CONTRACTS_PROJECT_TYPE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL,  CONTRACTS_PROJECT_TYPE_URL].join('/');
export const ABS_CONTRACTS_PROJECT_URL = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACT_PROJECT_URL].join('/');
export const ABS_CONTRACTS_CONTRACT_URL = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACTS_PURCHASE_CONTRACT_URL].join('/');
export const ABS_CONTRACTS_PROJECT_MOTIVE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACTS_PROJECT_MOTIVE_URL].join('/');
export const ABS_CONTRACTS_AWARD_PROCEDURE = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACTS_AWARD_PROCEDURE_URL].join('/');
export const ABS_CONTRACTS_CEMENT_URL = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, CONTRACT_CEMENT_URL].join('/');
export const ABS_TRANSPORT_CONTRACT_URL = '/' + [MAIN_PAGE_URL, CONTRACTS_APP_URL, TRANSPORT_CONTRACT_URL].join('/');

// Scheduled sales
export const ABS_SCHEDULED_SALES_PROJECTS           = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_PROJECTS_URL].join('/');
export const ABS_SCHEDULED_SALES_ARTICLE            = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_ARTICLE_URL].join('/');
export const ABS_SCHEDULED_SALES_QUOTAS             = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_QUOTA_URL].join('/');
export const ABS_SCHEDULED_SALES_SCHEDULES          = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SCHEDULE_URL].join('/');
export const ABS_SCHEDULED_SALES_DISCOUNT_TYPES     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_DISCOUNTS_URL].join('/');
export const ABS_SALES_MODES_URL                    = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SALES_MODE_URL].join('/');
export const ABS_SCHEDULED_SALES_PARTNER_SCHEDULES  = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_PARTNER_SCHEDULE_URL].join('/');
export const ABS_SCHEDULED_SALES_PARTNER_TRUCKS     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_TRUCKS_URL].join('/');
export const ABS_SCHEDULED_SALES_AGENT_URL     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, LOGISTICS_AGENT_URL].join('/');
export const ABS_SCHEDULED_SALES_ACTIVITY     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, LOGISTICS_ACTIVITY_URL].join('/');
export const ABS_SCHEDULED_SALES_VAT_URL     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, LOGISTICS_VAT_URL].join('/');
export const ABS_SCHEDULED_SALES_PAY_METHOD     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, LOGISTICS_PAY_METHOD_URL].join('/');
export const ABS_SCHEDULED_SALES_CATEGORY     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SALES_CATEGORY_URL].join('/');
export const ABS_SCHEDULED_SALES_DASHBOARD_URL     = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, DASHBOARD_URL].join('/');
export const ABS_CUSTOMER_COMPLAINTS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_COMPLAINTS_URL].join('/');
export const ABS_CUSTOMER_SUGGESTIONS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SUGGESTIONS_URL].join('/');
export const ABS_SCHEDULED_SALES_REPORTS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_SCHEDULED_SALES_PASSWORD_RESET_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, PASSWORD_RESET_URL].join('/');
export const ABS_SALES_COMPENSATIONS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SALES_COMPENSATION_URL].join('/');
export const ABS_PAYMENT_COMPENSATIONS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SALES_PAYMENT_COMPENSATION_URL].join('/');
export const ABS_SALES_INVOICE_VALIDATION_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SALES_INVOICE_VALIDATION_URL].join('/');
export const ABS_SCHEDULED_SALES_POLL_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_SALES_POLL_URL].join('/');
export const ABS_SCHEDULED_POLL_QUESTION_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_POLL_QUESTION_URL].join('/');
export const ABS_SCHEDULED_POLL_CHARTS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_POLL_CHARTS_URL].join('/');
export const ABS_SCHEDULED_POLL_HISTORY_CHARTS_URL = '/' + [MAIN_PAGE_URL, SCHEDULED_SALES_APP_URL, SS_POLL_HISTORY_CHARTS_URL].join('/');


//Finance
export const ABS_FINANCE_CPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CPAYMENTS_URL].join('/');
export const ABS_FINANCE_SPAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SPAYMENTS_URL].join('/');
export const ABS_FINANCE_PAYMENT_ORDERS   = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, PAYMENT_ORDER].join('/');
export const ABS_FINANCE_DASHBOARD_URL    = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, DASHBOARD_URL].join('/');
export const ABS_FINANCE_PAYMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_PAYMENTS_URL].join('/');
export const ABS_FINANCE_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_COMPENSATION_URL].join('/');
export const ABS_FINANCE_CUSTOMER_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_CCOMPENSATION_URL].join('/');
export const ABS_FINANCE_SUPPLIER_COMPENSATIONS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_SCOMPENSATION_URL].join('/');
export const ABS_FINANCE_REPORTS_URL = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_FINANCE_ADVANCEMENTS = '/' + [MAIN_PAGE_URL, FINANCE_APP_URL, LOGISTICS_ADVANCEMENTS_URL].join('/');

// HR
export const ABS_HR_CATEGORIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_CATEGORIES_URL].join('/');
export const ABS_HR_DIPLOMAS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_DIPLOMAS_URL].join('/');
export const ABS_HR_EDUCATION_LEVELS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_EDUCATION_LEVELS_URL].join('/');
export const ABS_HR_MARITAL_STATUS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_MARITAL_STATUS_URL].join('/');
export const ABS_PROFESSIONAL_FAULTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_PROFESSIONAL_FAULT_URL].join('/');
export const ABS_ACTIVITIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_ACTIVITY_URL].join('/');
export const ABS_PHYSICIANS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_PHYSICIAN_URL].join('/');
export const ABS_PHYSICIAN_SPECIALTIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_SPECIALTY_URL].join('/');
export const ABS_PUNISHMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_PUNISHMENT_TYPE_URL].join('/');
export const ABS_HR_POSTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_POSTS_URL].join('/');
export const ABS_HR_NATIONALITIES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_NATIONALITIES_URL].join('/');
export const ABS_HR_SERVICES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_SERVICES_URL].join('/');
export const ABS_HR_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_EMPLOYEES_URL].join('/');
export const ABS_WORK_STOPPAGES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_WORK_STOPPAGE_URL].join('/');
export const ABS_HR_JUDICIAL_FRAMES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_JUDICIAL_FRAMES_URL].join('/');
export const ABS_HR_DECISION_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_DECISION_MOTIVE_URL].join('/');
export const ABS_HR_CONTRACT_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_CONTRACT_MOTIVE_URL].join('/');
export const ABS_HR_MOTIVES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_MOTIVE_URL].join('/');
export const ABS_INACTIVE_HR_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_INACTIVE_EMPLOYEES_URL].join('/');
export const ABS_HR_EMPLOYMENT_TYPE_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_EMPLOYMENT_TYPE_URL].join('/');
export const ABS_HR_SUSPENSION_REASON_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_SUSPENSION_REASON_URL].join('/');
export const ABS_HR_DIVISIONS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_DIVISIONS_URL].join('/');
export const ABS_HR_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL,  HR_DEPARTMENTS_URL].join('/');
export const ABS_HR_PERSON_LIST_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_PERSON_LIST_URL].join('/');
export const ABS_HR_HOLIDAY_REQUEST_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_HOLIDAY_REQUEST_URL].join('/');
export const ABS_HR_REPORTS_URL = '/' + [MAIN_PAGE_URL, HR_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_HR_DASHBOARD_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, DASHBOARD_URL].join('/');
export const ABS_HR_BLOOD_GROUP_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, COMMON_BLOOD_GROUPS_URL].join('/');
export const ABS_HR_REPORT_RIGHT_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, ADMIN_REPORT_RIGHTS_URL].join('/');
export const ABS_HR_CAREER_MOTIVE_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_CAREER_MOTIVE_URL].join('/');
export const ABS_EMPLOYEE_ID_UPDATE_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_ID_UPDATE_URL].join('/');
export const ABS_HR_CRITERIA_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_CRITERIA_URL].join('/');
export const ABS_HR_GRADING_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_GRADING_URL].join('/');
export const ABS_HR_LANGUAGE_LEVELS_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_LANGUAGE_LEVELS_URL].join('/');
export const ABS_HR_LANGUAGES_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_LANGUAGES_URL].join('/');
export const ABS_HR_TRN_SUBJECTS_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_TRN_SUBJECTS_URL].join('/');
export const ABS_HR_WORKSHOP_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_WORKSHOP_URL].join('/');
export const ABS_HR_VACATION_TYPE_URL    = '/' + [MAIN_PAGE_URL, HR_APP_URL, HR_VACATION_TYPES_URL].join('/');


// payroll
export const ABS_INACTIVE_PAYROLL_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_INACTIVE_EMPLOYEES_URL].join('/');
export const ABS_PAYROLL_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_EMPLOYEES_URL].join('/');
export const ABS_ELEMENTSINFO_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENTSINFO_URL].join('/');
export const ABS_ELEMENT_TYPES_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_ELEMENT_TYPES_URL].join('/');
export const ABS_FORMULAS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_FORMULAS_URL].join('/');
export const ABS_MONTH_CLOSER_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_MONTH_CLOSER].join('/');
export const ABS_MONTH_LOCK_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_MONTH_LOCK_URL].join('/');
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
export const ABS_SALARY_GRID_UPDATE_URL     = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_GRID_UPDATE_URL].join('/');
export const ABS_PAYROLL_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, DASHBOARD_URL].join('/');
export const ABS_PAYROLL_REPORT_RIGHT_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, ADMIN_REPORT_RIGHTS_URL].join('/');
export const ABS_PAYROLL_REPORT_PRIVILEGE_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, ADMINISTRATION_REPORT_PRIVILEGE_URL].join('/');
export const ABS_PAYROLL_OPTIONS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_OPTIONS_URL].join('/');
export const ABS_PAYROLL_FUNDS_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_FUNDS_URL].join('/');
export const ABS_PAYROLL_IRG_CALC_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAY_IRG_CALC].join('/');
export const ABS_PAYROLL_LOAN_INJECTION_URL = '/' + [MAIN_PAGE_URL, PAYROLL_APP_URL, PAYROLL_LOAN_INJECTION_URL].join('/');
// ltm
export const ABS_LTM_MATTERS_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_MATTER_URL].join('/');
export const ABS_LTM_PERIODICITIES_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PERIODICITY_URL].join('/');
export const ABS_LTM_TEST_TYPE_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TEST_TYPE_URL].join('/');
export const ABS_LTM_TESTS_URL         = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TEST_URL].join('/');
export const ABS_LTM_LINES_URL         = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_LINES_URL].join('/');
export const ABS_LTM_TESTINGS_URL      = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TESTING_URL].join('/');
export const ABS_LTM_MIXTURES_URL      = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_MIXTURE_URL].join('/');
export const ABS_LTM_REPORTS_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_LTM_CHARTS_URL        = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_CHARTS_URL].join('/');
export const ABS_LTM_BATCH_TESTINGS_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_CHEMICAL_TEST_URL].join('/');
export const ABS_LTM_PHYSICAL_TESTINGS_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PHYSICAL_TEST_URL].join('/');
export const ABS_LTM_DEPOSIT_TESTINGS_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_DEPOSIT_TEST_URL].join('/');
export const ABS_LTM_RAW_TESTINGS_URL = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_RAW_MATERIAL_TEST_URL].join('/');
export const ABS_LTM_DASHBOARD_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, DASHBOARD_URL].join('/');
export const ABS_LTM_UNIT_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_UNIT_URL].join('/');
export const ABS_LTM_ANOMALY_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_ANOMALIES_URL].join('/');
export const ABS_LTM_TESTINGS_ANOMALIES_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TESTING_ANOMALIES_URL].join('/');
export const ABS_LTM_EQUIPMENT_TESTINGS_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TEST_EQUIPMENT_TESTING_URL].join('/');
export const ABS_LTM_SILO_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_SILOS_URL].join('/');
export const ABS_LTM_ALERT_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_ALERT_URL].join('/');
export const ABS_LTM_PRODUCT_URL            = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PRODUCTS_URL].join('/');
export const ABS_LTM_EQUIPMENT_URL           = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_EQUIPMENT_URL].join('/');
export const ABS_LTM_PICKUP_POINTS_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PICKUP_POINTS_URL].join('/');
export const ABS_LTM_NORM_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_NORM_URL].join('/');
export const ABS_LTM_NORM_TREE_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_NORM_TREE_TREE].join('/');
export const ABS_LTM_BLEACHERS_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_BLEACHER_URL].join('/');
export const ABS_LTM_ZONES_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_ZONE_URL].join('/');
export const ABS_LTM_DEPOSIT_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_DEPOSIT_URL].join('/');
export const ABS_LTM_SUPPLIER_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_SUPPLIER_URL].join('/');
export const ABS_LTM_CORRECTION_ACTIONS_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_CORRECTION_ACTION_URL].join('/');
export const ABS_LTM_TEST_EQUIPMENT_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_TEST_EQUIPMENT_URL].join('/');
export const ABS_LTM_PRODUCT_TYPE_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PRODUCT_TYPE_URL].join('/');
export const ABS_LTM_PRODUCT_LIBERATION_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_PRODUCT_LIBERATION_ROUTE_URL].join('/');
export const ABS_LTM_MAILING_URL       = '/' + [MAIN_PAGE_URL, LTM_APP_URL, LTM_MAILING_LIST_URL].join('/');

// GICA
export const ABS_GICA_WEIGHTS_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_WEIGHTS_URL].join('/');
export const ABS_GICA_FAULTS_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_FAULTS_URL].join('/');
export const ABS_GICA_SCALE_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_SCALE_URL].join('/');
export const ABS_GICA_CONSTANTS_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_CONSTANTS_URL].join('/');
export const ABS_GICA_REPORTS_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_REPORTS_URL].join('/');
export const ABS_GICA_HISTORY_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_HISTORY_URL].join('/');
export const ABS_GICA_GRADING_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_GRADING_URL].join('/');
export const ABS_GICA_DEGRADING_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_DEGRADING_URL].join('/');
export const ABS_GICA_CRITERIA_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_CRITERIA_URL].join('/');
export const ABS_GICA_EVOLUTION_REPORT_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_EVOLUTIONS_URL].join('/');
export const ABS_GICA_REPORTING_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_GICA_CAREER_MOTIVES_URL       = '/' + [MAIN_PAGE_URL, GICA_APP_URL, GICA_CAREER_MOTIVE_URL].join('/');


// CMMS
export const ABS_CMMS_FAULTS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_FAULTS_URL].join('/');
export const ABS_CMMS_ASSETS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSETS_ASSET_URL].join('/');
export const ABS_CMMS_ASSETS_PM_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSETS_ASSET_PM_URL].join('/');
export const ABS_CMMS_ASSETS_TREE_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_ASSET_TREE].join('/');
export const ABS_CMMS_STATUS__URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_STATUS_URL].join('/');
export const ABS_CMMS_PRIORITY__URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_PRIORITY_URL].join('/');
export const ABS_CMMS_FAULT_CAUSE_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_FAULT_CAUSE_URL].join('/');
export const ABS_CMMS_ROOT_CAUSE_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_ROOT_CAUSE_URL].join('/');
export const ABS_CMMS_TYPE__URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_TYPE_URL].join('/');
export const ABS_CMMS_ROUTING_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_ROUTING_URL].join('/');
export const ABS_CMMS_CHECKLIST_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_CHECKLIST_URL].join('/');
export const ABS_CMMS_PLANS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS__PLANS__URL].join('/');
export const ABS_CMMS_PM_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS__PM__URL].join('/');
export const ABS_CMMS_ALERTS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_ALERT_URL].join('/');
export const ABS_CMMS_METERS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_METER_URL].join('/');
export const ABS_CMMS_READING_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_READING_URL].join('/');
export const ABS_CMMS_TRIGGER_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_TRIGGER_URL].join('/');
export const ABS_PREV_ORDERS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_PREV_ORDER_URL].join('/');
export const ABS_CMMS_SOLUTION_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_SOLUTION_URL].join('/');
export const ABS_CUR_ORDER_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_CUR_WORK_ORDER_URL].join('/');
export const ABS_INSPECTION_ORDER_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_INSPECTION_ORDER_URL].join('/');
export const ABS_INSPECTION_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_INSPECTION_URL].join('/');
export const ABS_CMMS_END_TYPES = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSET_END_TYPE_URL].join('/');
export const ABS_CMMS_STATUS_TYPES = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, FURNITURE_STATUS_URL].join('/');
export const ABS_CMMS_CLASSES = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSET_CLASS_URL].join('/');
export const ABS_CMMS_BUILDINGS = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSET_BUILDING_URL].join('/');
export const ABS_CMMS_OFFICES_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSETS_OFFICES_URL].join('/');
export const ABS_SERVICE_REQUEST_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_SERVICE_REQUEST_URL].join('/');
export const ABS_CMMS_PARTS_REQUEST_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, STOCK_PARTS_REQUEST_URL].join('/');
export const ABS_CMMS_CHARTS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_CHARTS_URL].join('/');
export const ABS_CMMS_GANT_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_GANT_URL].join('/');
export const ABS_CMMS_LOCATIONS = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, ASSET_LOCATIONS_URL].join('/');
export const ABS_CMMS_EMPLOYEES_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_EMPLOYEES_URL].join('/');
export const ABS_CMMS_FUNCTIONS = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_FUNCTION_URL].join('/');
export const ABS_CMMS_REPORTS_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_CMMS_PERMIT_TYPES_URL = '/' + [MAIN_PAGE_URL, CMMS_APP_URL, CMMS_PERMIT_TYPE_URL].join('/');

// Costing
export const ABS_COSTING_ITEMS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COSTING_ITEMS_URL].join('/');
export const ABS_COST_ACC_RECORDS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, ACC_RECORDS].join('/');
export const ABS_COSTING_KEYS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COSTING_KEY_URL].join('/');
export const ABS_COSTING_PRODUCTS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COSTING_FINAL_PRODUCT].join('/');
export const ABS_COSTING_PROJECTS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COSTING_PROJECT_URL].join('/');
export const ABS_COSTING_BOM_PRODUCTS = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, BOM_URL].join('/');
export const ABS_COSTING_ROUTING_URL = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, CMMS_ROUTING_URL].join('/');
export const ABS_COSTING_COST_CENTER_URL = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, STOCK_COST_CENTER_URL].join('/');
export const ABS_COSTING_ACCOUNTING = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COSTING_ACCOUNTING_URL].join('/');
export const ABS_COSTING_COST_CENTER_GROUP_URL = '/' + [MAIN_PAGE_URL, COSTING_APP_URL, COMMON_COST_CENTER_GROUP_URL].join('/');

// Furniture
export const ABS_FURNITURE_URL            = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_URL].join('/');
export const ABS_FURNITURE_RECEIVERS_URL  = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_RECEIVER_URL].join('/');
export const ABS_FURNITURE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_RECEPTION_URL].join('/');
export const ABS_FURNITURE_ASSIGNMENT_URL = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_ASSIGNMENT_URL].join('/');
export const ABS_FURNITURE_SALES_URL      = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_SALES_URL].join('/');
export const ABS_FURNITURE_TYPES_URL      = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, FURNITURE_TYPES_URL].join('/');
export const ABS_FURNITURE_REPORTS_URL      = '/' + [MAIN_PAGE_URL, FURNITURE_APP_URL, COMMON_REPORTS_URL].join('/');

// Park
export const ABS_PARK_DRIVER_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_DRIVER_URL].join('/');
export const ABS_PARK_MISSION_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_MISSION_URL].join('/');
export const ABS_PARK_VEHICLE_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_VEHICLE_URL].join('/');
export const ABS_PARK_VEHICLE_TYPE_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_VEHICLE_TYPES_URL].join('/');
export const ABS_PARK_VEHICLE_STATE_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_VEHICLE_STATES_URL].join('/');
export const ABS_PARK_FUEL_TYPE_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_FUEL_TYPES_URL].join('/');
export const ABS_PARK_INSURANCE_AGENCY_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_INSURANCE_AGENCIES_URL].join('/');
export const ABS_PARK_INSURANCE_POLICY_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_INSURANCE_POLICIES_URL].join('/');
export const ABS_PARK_DESTINATION_URL = '/' + [MAIN_PAGE_URL, PARK_APP_URL, PARK_DESTINATION_URL].join('/');

// App. Archive viewer
export const ABS_APP_ARCHIVE_VIEWER_URL      = '/' + [MAIN_PAGE_URL, ARCH_VIEWER_APP_URL, AA_VIEWER].join('/');
export const ABS_ARCHIVE_RIGHTS_URL      = '/' + [MAIN_PAGE_URL, ARCH_VIEWER_APP_URL, AA_RIGHTS].join('/');

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
export const ABS_BC_ASSET_INVENTORY_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_QR_INVENTORY_URL].join('/');
export const ABS_ASSET_TRANSFER_URL  = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_TRANSFER_URL].join('/');
export const ABS_ASSETS_AGENT_URL    = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSETS_AGENT_URL].join('/');
export const ABS_ASSET_BUILDINGS     = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_BUILDING_URL].join('/');
export const ABS_ASSET_ACCOUNT_URL   = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_ACCOUNT_URL].join('/');
export const ABS_ASSET_MARKS_URL     = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, COMMON_MARKS_URL].join('/');
export const ABS_ASSET_STATUS_TYPES  = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, FURNITURE_STATUS_URL].join('/');
export const ABS_ASSET_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, DASHBOARD_URL].join('/');
export const ABS_ASSETS_TREE_URL = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, CMMS_ASSET_TREE].join('/');
export const ABS_ASSETS_INVENTORY_DOC = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_INVENTORY_DOC_URL].join('/');
export const ABS_ASSETS_UNIDENTIFIED = '/' + [MAIN_PAGE_URL, ASSETS_APP_URL, ASSET_UNIDENTIFIED_INVENTORY_URL].join('/');

// sales
export const ABS_SALES_DELIVERY_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_URL].join('/');
export const ABS_SALES_INVOICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_URL].join('/');
export const ABS_SALES_INVOICE_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_INVOICE_CANCEL_URL].join('/');
export const ABS_SALES_EXPORT_INVOICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_EXPORT_INVOICE_CANCEL_URL].join('/');
export const ABS_SALES_DELIVERY_CANCEL_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_DELIVERY_CANCEL_URL].join('/');
export const ABS_SALES_ORDER_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_ORDER_URL].join('/');
export const ABS_SALES_PROFORMA_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_PROFORMA_URL].join('/');
export const ABS_SALES_REPORTS_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_SALES_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, DASHBOARD_URL].join('/');
export const ABS_SALES_AGENT_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, STOCK_AGENT_URL].join('/');
export const ABS_SALES_SERVICE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_SERVICE_ARTICLE_URL].join('/');
export const ABS_SALES_REPORT_PRIVILEGE_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, ADMINISTRATION_REPORT_PRIVILEGE_URL].join('/');
export const ABS_PRICE_LIST_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, SALES_PRICE_LIST_URL].join('/');
export const ABS_SALES_CUSTOMER_URL = '/' + [MAIN_PAGE_URL, SALES_APP_URL, LOGISTICS_CUSTOMER_URL].join('/');

//services
export const ABS_SERVICE_CLASSES_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, SERVICE_CLASSES_URL].join('/');
export const ABS_SERVICE_ORDER_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, SERVICE_ORDER_URL].join('/');
export const ABS_SERVICE_PROFORMA_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, SALES_PROFORMA_URL].join('/');
export const ABS_SERVICE_INVOICE_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, SERVICE_INVOICE_URL].join('/');
export const ABS_SERVICE_INVOICE_CANCEL_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, SERVICE_INVOICE_CANCELLATION_URL].join('/');
export const ABS_COMPLEMENT_INVOICE_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, COMPLEMENT_INVOICE_URL].join('/');
export const ABS_SALES_DUPLICATION_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, INVOICE_DUPLICATE_URL].join('/');
export const ABS_SERVICE_REPORTS_URL = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_SERVICE_PAYMENTS = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, LOGISTICS_PAYMENTS_URL].join('/');
export const ABS_SERVICES_COMPENSATIONS = '/' + [MAIN_PAGE_URL, SERVICE_APP_URL, LOGISTICS_COMPENSATION_URL].join('/');

// Purchace
export const ABS_PURCHASE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_URL].join('/');
export const ABS_PURCHASE_INVOICE_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_INVOICE_URL].join('/');
export const ABS_IMPORT_PURCHASE_RECEPTION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, IMPORT_PURCHASE_RECEPTION_URL].join('/');
export const ABS_PURCHASE_RECEPTION_CANCELLATION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_RECEPTION_CANCELLATION_URL].join('/');
export const ABS_PURCHASE_ORDER_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_ORDER_URL].join('/');
export const ABS_PURCHASE_REQUEST_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_REQUEST_URL].join('/');
export const ABS_PURCHASE_QUOTATION_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PURCHASE_QUOTATION_URL].join('/');
export const ABS_PURCHASE_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, DASHBOARD_URL].join('/');
export const ABS_PURCHASE_REPORTS_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_PURCHASE_REPORT_RIGHT_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, ADMIN_REPORT_RIGHTS_URL].join('/');
export const ABS_PRICE_REQUEST_URL = '/' + [MAIN_PAGE_URL, PURCHASES_APP_URL, PRICE_REQUEST_URL].join('/');

//dashboard
export const ABS_DASHBOARD_URL = '/' + [MAIN_PAGE_URL, DASHBOARD_APP_URL, DASHBOARD_URL].join('/');
export const ABS_DASHBOARD_QUERY_URL = '/' + [MAIN_PAGE_URL, DASHBOARD_APP_URL, DASHBOARD_QUERY_URL].join('/');

// ARCHIVE
export const ABS_ARCHIVE_URL = '/' + [MAIN_PAGE_URL, WEBARCH_APP_URL, ARCHIVE_URL].join('/');
export const ABS_TAG_URL = '/' + [MAIN_PAGE_URL, WEBARCH_APP_URL, TAG_URL].join('/');

// PRODUCTION

export const ABS_PRODUCTION_ORDER_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_ORDER_URL].join('/');
export const ABS_PRODUCTION_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTIONS_URL].join('/');
export const ABS_PRODUCTION_MRP_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_MRP_URL].join('/');
export const ABS_PRODUCTION_BOM_PRODUCTS = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, BOM_URL].join('/');
export const ABS_PRODUCTION_ARTICLE_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_ARTICLE_URL].join('/');
export const ABS_PRODUCTION_LOT_MANAGEMENT_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_LOT_MANAGEMENT_URL].join('/');
export const ABS_PRODUCTION_LOT_ANALYSIS_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_LOT_ANALYSIS_URL].join('/');
export const ABS_PRODUCTION_INTER_STORE_TRANSFER_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_INTER_STORE_TRANSFER_URL].join('/');
export const ABS_PRODUCTION_UNLOCKING_LOTS_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_UNLOCKING_LOTS_URL].join('/');
export const ABS_PRODUCTION_ARTICLE_TYPES_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_ARTICLE_TYPES_URL].join('/');
export const ABS_PRODUCTION_DOSAGE_UNITS_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_DOSAGE_UNITS_URL].join('/');
export const ABS_PRODUCTION_PACKAGING_UNITS_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_PACKAGING_UNITS_URL].join('/');
export const ABS_PRODUCTION_REPORTS_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, COMMON_REPORTS_URL].join('/');
export const ABS_LOT_PRIORITY_URL = '/' + [MAIN_PAGE_URL, PRODUCTION_APP_URL, PRODUCTION_LOT_PRIORITY_URL].join('/');

// CRM

export const ABS_CRM_SALUTATIONS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_SALUTATIONS_URL].join('/');
export const ABS_CRM_JOBS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_JOBS_URL].join('/');
export const ABS_CRM_DEPARTMENTS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_DEPARTMENTS_URL].join('/');
export const ABS_CRM_CONTACT_METHODS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_CONTACT_METHODS_URL].join('/');
export const ABS_CRM_STATUS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_STATUS_URL].join('/');
export const ABS_CRM_PAYMENT_TERMS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_PAYMENT_TERMS_URL].join('/');
export const ABS_CRM_CUSTOMER_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_CUSTOMER_URL].join('/');
export const ABS_CRM_LEADS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_LEADS_URL].join('/');
export const ABS_CRM_CAMPAIGN_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_CAMPAIGN_URL].join('/');
export const ABS_CRM_MAILING_LIST_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_MAILING_LIST_URL].join('/');
export const ABS_CRM_TEAMS_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_TEAMS_URL].join('/');
export const ABS_CRM_OPPORTUNITY_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_OPPORTUNITY_URL].join('/');
export const ABS_CRM_EMAIL_TEMPLATE_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_EMAIL_TEMPLATE_URL].join('/');
export const ABS_CRM_CALENDAR_URL = '/' + [MAIN_PAGE_URL, CRM_APP_URL, CRM_CALENDAR_URL].join('/');




// ######################################
// #            Other things            #
// ######################################

export const docInfoRoutes: Routes = [
    {
        path: 'archive',
        children: [
            {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: ACC_TRANSACTION_ARCHIVES } },
            {path: ':id', component: AppArchiveDetailComponent, data: { appId: ACC_TRANSACTION_ARCHIVES }},
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
       path: 'total-stock',
       component: UiTotalStockComponent
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
    },
    {
        path: 'agent-assets',
        component: AgentAssetsListComponent
    },
    {
        path: 'sources',
        component: DocumentSourcesComponent
    },
    {
        path: 'quantities',
        component: UiTransactionlineQuantitiesComponent
    },
    {
        path:'mrp',
        component: UiMrpComponent
    },
];
