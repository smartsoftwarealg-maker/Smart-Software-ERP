import {
    ABS_LOGISTICS_PAY_METHOD,
    ABS_LOGISTICS_AGENT_URL,
    ABS_LOGISTICS_CATEGORY,
    ABS_SCHEDULED_SALES_PROJECTS,
    ABS_SCHEDULED_SALES_ARTICLE,
    ABS_SCHEDULED_SALES_QUOTAS, ABS_SCHEDULED_SALES_DISCOUNT_TYPES, ABS_SCHEDULED_SALES_SCHEDULES,
} from '../common';
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_LOGISTICS_ACTIVITY,
    ABS_LOGISTICS_COMPANY_TYPE, ABS_LOGISTICS_CURRENCY,
    ABS_LOGISTICS_VAT_URL
} from "../common";

export const scheduledSalesNavTree: SideNavNode = {
    name: 'SCHEDULED_SALES',
    icon: 'fa-solid fa-calendar-day',
    children: [
        // {
        //     name: 'COMMON_UNITS',
        //     icon: 'fas fa-balance-scale-right',
        //     route: ABS_STOCK_UNITS_URL,
        //     accessRights: 'Unit'
        // },
        {
            name: 'LOGISTICS_AGENT',
            icon: 'fas fa-user',
            route: ABS_LOGISTICS_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'LOGISTICS_ARTICLE',
            icon: 'fas fa-box',
            route: ABS_SCHEDULED_SALES_ARTICLE,
            accessRights: 'Agent'
        },
        {
            name: 'COMMON_VAT',
            icon: 'fas fa-percentage',
            route: ABS_LOGISTICS_VAT_URL,
            accessRights: 'VAT'
        },
        // {
        //     name: 'COMMON_COMPANY_TYPES',
        //     icon: 'fas fa-building',
        //     route: ABS_LOGISTICS_COMPANY_TYPE
        // },
        {
            name: 'SCH_DISCOUNTS',
            icon: 'fa-solid fa-badge-percent',
            route: ABS_SCHEDULED_SALES_DISCOUNT_TYPES,
            accessRights: 'Discount'
        },
        {
            name: 'COMMON_ACTIVITIES',
            icon: 'fab fa-app-store-ios',
            route: ABS_LOGISTICS_ACTIVITY,
            accessRights: 'Activity'
        },
        {
            name: 'LOGISTICS_PAY_METHOD',
            icon: 'fas fa-money-check-edit',
            route: ABS_LOGISTICS_PAY_METHOD,
            accessRights: 'MPay'
        },
        // {
        //     name: 'COMMON_CURRENCIES',
        //     icon: 'fas fa-coins',
        //     route: ABS_LOGISTICS_CURRENCY,
        //     accessRights: 'Currency'
        // },
        {
            name: 'COMMON_CATEGORIES',
            icon: 'fas fa-users-class',
            route: ABS_LOGISTICS_CATEGORY,
            accessRights: 'SalesCategory'
        },
        {
            name: ' COMMON_PROJECTS',
            icon: 'fa-solid fa-buildings',
            route: ABS_SCHEDULED_SALES_PROJECTS,
            accessRights: 'SalesCategory'
        },
        {
            name: 'SCH_QUOTAS',
            icon: 'fa-solid fa-money-bill-wheat',
            route: ABS_SCHEDULED_SALES_QUOTAS,
            accessRights: 'Quota',
            customerRights: {read: true, edit: false, delete: false, write: false}
        },
        {
            name: 'SCH_SCHEDULES',
            icon: 'fa-solid fa-calendar-range',
            route: ABS_SCHEDULED_SALES_SCHEDULES,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: false, delete: false, write: false}
        },
    ],
    accessRights: 'SCHEDULED_SALES',
    customerRights: {read: true, edit: false, delete: false, write: false}
};
