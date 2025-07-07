import {
    ABS_CSPACE_REPORTS_URL,
    ABS_CUSTOMER_BALANCE_URL,
    ABS_CUSTOMER_COMPLAINTS_URL,
    ABS_CUSTOMER_HISTORY_URL,
    ABS_CUSTOMER_PROFILE_URL,
    ABS_CUSTOMER_SCHEDULES_URL,
    ABS_PAYMENTS_URL,
    ABS_SALES_HOME_URL,
    ABS_SALES_QUOTAS_URL,
    ABS_CUSTOMER_POLL_URL,
    ABS_CUSTOMER_SUGGESTIONS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const cSpaceNavTree: SideNavNode[] =
    [
        // {
        //     name: 'COMMON_HOME',
        //     icon: 'fa-solid fa-house',
        //     route: ABS_SALES_HOME_URL,
        //     accessRights: 'Home',
        //     customerRights: {read: true, edit: true, delete: true, write: true}
        // },
        {
            name: 'SCH_QUOTAS',
            icon: 'fa-solid fa-quote-left',
            route: ABS_SALES_QUOTAS_URL,
            accessRights: 'SQuota',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'SCH_SCHEDULES',
            icon: 'fa-solid fa-clipboard-list-check',
            route: ABS_CUSTOMER_SCHEDULES_URL,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_HISTORY',
            icon: 'fa-solid fa-rectangle-history-circle-user',
            route: ABS_CUSTOMER_HISTORY_URL,
            accessRights: 'Sale',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fa-solid fa-money-check-dollar-pen',
            route: ABS_PAYMENTS_URL,
            accessRights: 'Sale',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_BALANCE',
            icon: 'fas fa-balance-scale',
            route: ABS_CUSTOMER_BALANCE_URL,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_CSPACE_REPORTS_URL,
            accessRights: 'Report',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_COMPLAINTS',
            icon: 'fa-solid fa-face-angry',
            route: ABS_CUSTOMER_COMPLAINTS_URL,
            accessRights: 'CustomerComplaint',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_SUGGESTIONS',
            icon: 'fa-solid fa-lightbulb-exclamation-on',
            route: ABS_CUSTOMER_SUGGESTIONS_URL,
            accessRights: 'CustomerSuggestion',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE_URL,
            accessRights: 'Profile',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'SCH_CUSTOMER_POLL',
            icon: 'fa-regular fa-clipboard-question',
            route: ABS_CUSTOMER_POLL_URL,
            accessRights: 'CustomerPoll',
            customerRights: {read: true, edit: true, delete: true, write: true}
        }
    ];
