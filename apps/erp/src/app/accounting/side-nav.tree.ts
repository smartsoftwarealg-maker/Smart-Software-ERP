import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ACC_ACCOUNT_URL, ABS_ACC_ASSET_ACCOUNT_URL, ABS_ACC_CASHFLOW_ACCOUNT_URL,
    ABS_ACC_FILE_SELECTION_URL, ABS_ACC_FILES_URL, ABS_ACC_GENERATION_ACCOUNT_URL,
    ABS_ACC_JOURNALS_URL, ABS_ACC_PERIOD_SELECTION_URL, ABS_ACC_TRANSAC_ACCOUNT_URL,
    ABS_ACC_TRANSACTIONS_URL,
    ABS_POLICIES_URL,
    ABS_STOCK_ACCOUNT_URL, ACCOUNTING_APP_URL
} from '../common';


export const accountingNavTree: SideNavNode = {
    name: 'ACCOUNTING',
    icon: 'fas fa-cog',
    accessRights: 'ACCOUNTING',
    children: [
        {
            name: 'ACC_FILES',
            icon: 'fas fa-folders',
            route: ABS_ACC_FILES_URL,
            accessRights: 'ACCJournal'
        },
        {
            name: 'ACC_FILE_SELECTOR',
            icon: 'fa-solid fa-folder-open',
            route: ABS_ACC_FILE_SELECTION_URL
        },
        {
            name: 'ACC_PERIOD_SELECTION',
            icon: 'fa-solid fa-folder-open',
            route: ABS_ACC_PERIOD_SELECTION_URL
        },
        {
            name: 'ACC_JOURNALS',
            icon: 'fas fa-books',
            route: ABS_ACC_JOURNALS_URL,
            accessRights: 'ACCJournal'
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
            name: 'ACC_CASHFLOW_ACCOUNTS',
            icon: 'fa-solid fa-cash-register',
            route: ABS_ACC_CASHFLOW_ACCOUNT_URL,
            accessRights: 'Cashflow'
        },
        {
            name: 'ACC_TRANSACTIONS',
            icon: 'fas fa-calculator',
            route: ABS_ACC_TRANSACTIONS_URL,
            accessRights: 'ACCTransaction'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-tools',
            route: ABS_POLICIES_URL,
            accessRights: 'ACCPolicy'
        },
    ]
}
