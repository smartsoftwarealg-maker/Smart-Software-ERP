import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ACC_ACCOUNT_URL,
    ABS_ACC_ASSET_ACCOUNT_URL,
    ABS_ACC_CASHFLOW_ACCOUNT_URL, ABS_ACC_CATEGORY_ACCOUNTS_URL, ABS_ACC_CLASS_ACCOUNTS_URL, ABS_ACC_CLOSED_PERIODS_URL,
    ABS_ACC_DASHBOARD_URL,
    ABS_ACC_F12_URL,
    ABS_ACC_F13_URL,
    ABS_ACC_F82_URL,
    ABS_ACC_F8_URL,
    ABS_ACC_FILE_SELECTION_URL,
    ABS_ACC_FILES_URL,
    ABS_ACC_GENERATION_ACCOUNT_URL,
    ABS_ACC_JOURNALS_URL,
    ABS_ACC_PERIOD_SELECTION_URL,
    ABS_ACC_PROJECT_URL,
    ABS_ACC_REPORTS_URL,
    ABS_ACC_TRANSAC_ACCOUNT_URL, ABS_ACC_TRANSACTION_MATCHING_URL,
    ABS_ACC_TRANSACTIONS_URL,
    ABS_BALANCE_QUERIES_URL, ABS_CONSOLIDATION_CENTERS_URL,
    ABS_DEPRECIATION_GENERATION_URL, ABS_GENERAL_GENERATION_URL,
    ABS_GENERATION_URL,
    ABS_POLICIES_URL,
    ABS_REOPEN_URL, ABS_SALES_GENERATION_URL, ACC_CATEGORY_ACCOUNTS_URL, ACC_CLASS_ACCOUNTS_URL
} from '../common';


export const accountingNavTree: SideNavNode = {
    name: 'ACCOUNTING',
    icon: 'fa-solid fa-money-bill-trend-up',
    accessRights: 'ACCOUNTING_APP',
    children: [
        {
            name: 'COMMON_PROJECTS',
            icon: 'fa-solid fa-laptop-file',
            route: ABS_ACC_PROJECT_URL,
            accessRights: 'ACCProject'
        },
        {
            name: 'ACC_FILES',
            icon: 'fas fa-folders',
            route: ABS_ACC_FILES_URL,
            accessRights: 'ACCFile'
        },
        {
            name: 'ACC_FILE_SELECTOR',
            icon: 'fa-solid fa-folder-open',
            route: ABS_ACC_FILE_SELECTION_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_PERIOD_SELECTION',
            icon: 'fa-solid fa-folder-open',
            route: ABS_ACC_PERIOD_SELECTION_URL,
            accessRights: 'ACCFile'
        },
        {
            name: 'ACC_CLOSED_PERIODS',
            icon: 'fa-solid fa-ballot-check',
            route: ABS_ACC_CLOSED_PERIODS_URL,
            accessRights: 'ACCFile'
        },
        {
            name: 'COMMON_JOURNALS',
            icon: 'fas fa-books',
            route: ABS_ACC_JOURNALS_URL,
            accessRights: 'Journal'
        },
        {
            name: 'LOGISTICS_ACCOUNTS',
            icon: 'fas fa-user-circle',
            route: ABS_ACC_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_ASSET_ACCOUNTS',
            icon: 'fas fa-cogs',
            route: ABS_ACC_ASSET_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_TRANSAC_ACCOUNTS',
            icon: 'fa-solid fa-comment-dollar',
            route: ABS_ACC_TRANSAC_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_GENERATION_ACCOUNTS',
            icon: 'fa-solid fa-wind-turbine',
            route: ABS_ACC_GENERATION_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_CATEGORY_ACCOUNTS',
            icon: 'fa-solid fa-list',
            route: ABS_ACC_CATEGORY_ACCOUNTS_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_CLASSES_ACCOUNTS',
            icon: 'fa-solid fa-family',
            route: ABS_ACC_CLASS_ACCOUNTS_URL,
            accessRights: 'Account'
        },
        {
            name: 'COMMON_TRANSACTIONS',
            icon: 'fas fa-calculator',
            route: ABS_ACC_TRANSACTIONS_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_GENERATION',
            icon: 'fa-solid fa-gears',
            route: ABS_GENERATION_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_SALES_INJECTION',
            icon: 'fa-solid fa-file-excel',
            route: ABS_SALES_GENERATION_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'COMMON_EXCEL_INJECTION',
            icon: 'fa-solid fa-file-xls',
            route: ABS_GENERAL_GENERATION_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_DEPRECIATION_GENERATION',
            icon: 'fa-solid fa-engine',
            route: ABS_DEPRECIATION_GENERATION_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_CASH_FLOW',
            icon: 'fa-solid fa-cash-register',
            route: ABS_ACC_CASHFLOW_ACCOUNT_URL,
            accessRights: 'CashFlowAcc'
        },
        {
            name: 'ACC_REOPENING',
            icon: 'fa-solid fa-door-open',
            route: ABS_REOPEN_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_F8',
            icon: 'fa-solid fa-table',
            route: ABS_ACC_F8_URL,
            accessRights: 'F8'
        },
        {
            name: 'ACC_F82',
            icon: 'fa-light fa-table',
            route: ABS_ACC_F82_URL,
            accessRights: 'F8'
        },
        {
            name: 'ACC_F12',
            icon: 'fa-solid fa-table-cells',
            route: ABS_ACC_F12_URL,
            accessRights: 'F12'
        },
        {
            name: 'ACC_F13',
            icon: 'fa-solid fa-table-list',
            route: ABS_ACC_F13_URL,
            accessRights: 'F13'
        },
        {
            name: 'ACC_TRANSACTION_MATCHING',
            icon: 'fa-solid fa-link',
            route: ABS_ACC_TRANSACTION_MATCHING_URL,
            accessRights: 'MBalance'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_ACC_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'ACC_BALANCE_QUERIES',
            icon: 'fa-solid fa-database',
            route: ABS_BALANCE_QUERIES_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'ACC_CONSOLIDATION_CENTERS',
            icon: 'fa-solid fa-circles-overlap-3',
            route: ABS_CONSOLIDATION_CENTERS_URL,
            accessRights: 'ConsolidationCenter'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-tools',
            route: ABS_POLICIES_URL,
            accessRights: 'ACCPolicy'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_ACC_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ]
};
