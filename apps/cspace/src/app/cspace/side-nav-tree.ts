import {
    ABS_CUSTOMER_BALANCE_URL,
    ABS_CUSTOMER_PROFILE_URL, ABS_CUSTOMER_SCHEDULES_URL, ABS_SALES_QUOTAS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const cSpaceNavTree: SideNavNode[] =
    [
        {
            name: 'SCH_QUOTAS',
            icon: 'fas fa-balance-scale',
            route: ABS_SALES_QUOTAS_URL,
            accessRights: 'SQuota',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'SCH_CUSTOMER_SCHEDULES',
            icon: 'fas fa-balance-scale',
            route: ABS_CUSTOMER_SCHEDULES_URL,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'SCH_CUSTOMER_BALANCE',
            icon: 'fas fa-balance-scale',
            route: ABS_CUSTOMER_BALANCE_URL,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE_URL,
            accessRights: 'Profile',
            customerRights: {read: true, edit: true, delete: true, write: true}
        }
    ];
