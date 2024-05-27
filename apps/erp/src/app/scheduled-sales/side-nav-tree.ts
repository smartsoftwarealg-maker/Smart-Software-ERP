import {
    ABS_SCHEDULED_SALES_PROJECTS,
    ABS_SCHEDULED_SALES_ARTICLE,
    ABS_SCHEDULED_SALES_QUOTAS,
    ABS_SCHEDULED_SALES_DISCOUNT_TYPES,
    ABS_SCHEDULED_SALES_SCHEDULES,
    ABS_SALES_MODES_URL,
    ABS_SCHEDULED_SALES_PARTNER_SCHEDULES,
    ABS_SCHEDULED_SALES_PARTNER_TRUCKS,
    ABS_SCHEDULED_SALES_AGENT_URL,
    ABS_SCHEDULED_SALES_ACTIVITY,
    ABS_SCHEDULED_SALES_VAT_URL,
    ABS_SCHEDULED_SALES_CATEGORY,
    ABS_SCHEDULED_SALES_DASHBOARD_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

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
            name: 'COMMON_AGENT',
            icon: 'fas fa-user',
            route: ABS_SCHEDULED_SALES_AGENT_URL,
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
            route: ABS_SCHEDULED_SALES_VAT_URL,
            accessRights: 'VAT'
        },
        // {
        //     name: 'COMMON_COMPANY_TYPES',
        //     icon: 'fas fa-building',
        //     route: ABS_SCHEDULED_SALES_DISCOUNT_COMPANY_TYPE
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
            route: ABS_SCHEDULED_SALES_ACTIVITY,
            accessRights: 'Activity'
        },
        // {
        //     name: 'LOGISTICS_PAY_METHOD',
        //     icon: 'fas fa-money-check-edit',
        //     route: ABS_SCHEDULED_SALES_PAY_METHOD,
        //     accessRights: 'MPay'
        // },
        // {
        //     name: 'COMMON_CURRENCIES',
        //     icon: 'fas fa-coins',
        //     route: ABS_SCHEDULED_SALES_DISCOUNT_CURRENCY,
        //     accessRights: 'Currency'
        // },
        {
            name: 'SCH_SALES_MODES',
            icon: 'fa-solid fa-light-switch',
            route: ABS_SALES_MODES_URL,
            accessRights: 'SalesMode'
        },
        {
            name: 'COMMON_CATEGORIES',
            icon: 'fas fa-users-class',
            route: ABS_SCHEDULED_SALES_CATEGORY,
            accessRights: 'SalesCategory'
        },
        {
            name: 'SCH_SUPPLIER_TRUCKS',
            icon: 'fa-solid fa-truck-monster',
            route: ABS_SCHEDULED_SALES_PARTNER_TRUCKS,
            accessRights: 'SupplierTruck'
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
        {
            name: 'SCH_PARTNER_SCHEDULES',
            icon: 'fa-solid fa-calendar-range',
            route: ABS_SCHEDULED_SALES_PARTNER_SCHEDULES,
            accessRights: 'Schedule',
            customerRights: {read: true, edit: false, delete: false, write: false}
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_SCHEDULED_SALES_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ],
    accessRights: 'SCHEDULED_SALES',
    customerRights: {read: true, edit: false, delete: false, write: false}
};
