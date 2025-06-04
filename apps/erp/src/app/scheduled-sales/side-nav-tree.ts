import {
    ABS_SCHEDULED_SALES_PROJECTS,
    ABS_SCHEDULED_SALES_ARTICLE,
    ABS_SCHEDULED_SALES_QUOTAS,
    ABS_SCHEDULED_SALES_SCHEDULES,
    ABS_SALES_MODES_URL,
    ABS_SCHEDULED_SALES_PARTNER_SCHEDULES,
    ABS_SCHEDULED_SALES_PARTNER_TRUCKS,
    ABS_SCHEDULED_SALES_AGENT_URL,
    ABS_SCHEDULED_SALES_ACTIVITY,
    ABS_SCHEDULED_SALES_VAT_URL,
    ABS_SCHEDULED_SALES_CATEGORY,
    ABS_SCHEDULED_SALES_DASHBOARD_URL,
    ABS_CUSTOMER_COMPLAINTS_URL,
    ABS_SCHEDULED_SALES_REPORTS_URL,
    ABS_SCHEDULED_SALES_PASSWORD_RESET_URL,
    ABS_SALES_COMPENSATIONS_URL,
    ABS_PAYMENT_COMPENSATIONS_URL,
    ABS_SALES_INVOICE_VALIDATION_URL,
    ABS_SCHEDULED_SALES_POLL_URL,
    ABS_SCHEDULED_POLL_QUESTION_URL,
    ABS_SCHEDULED_POLL_CHARTS_URL,
    ABS_SCHEDULED_POLL_HISTORY_CHARTS_URL, ABS_CUSTOMER_SUGGESTIONS_URL
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
        //     route: ABS_SCHEDULED_SALES_COMPANY_TYPE
        // },
        // {
        //     name: 'SCH_DISCOUNTS',
        //     icon: 'fa-solid fa-badge-percent',
        //     route: ABS_SCHEDULED_SALES_DISCOUNT_TYPES,
        //     accessRights: 'Discount'
        // },
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
            accessRights: 'Schedule'
        },
        {
            name: 'SCH_PARTNER_SCHEDULES',
            icon: 'fa-solid fa-calendar-range',
            route: ABS_SCHEDULED_SALES_PARTNER_SCHEDULES,
            accessRights: 'PSchedule',
            customerRights: {read: true, edit: false, delete: false, write: false}
        },
        {
            name: 'SCH_SHIPPING',
            icon: 'fa-solid fa-square-check',
            route: ABS_SALES_INVOICE_VALIDATION_URL,
            accessRights: 'Validation'
        },
        {
            name: 'SCH_COMPENSATIONS',
            icon: 'fa-solid fa-scale-unbalanced',
            route: ABS_SALES_COMPENSATIONS_URL,
            accessRights: 'Compensation'
        },
        {
            name: 'LOGISTICS_PAYMENT_COMPENSATION',
            icon: 'fa-solid fa-scale-unbalanced-flip',
            route: ABS_PAYMENT_COMPENSATIONS_URL,
            accessRights: 'Compensation'
        },
        {
            name: 'COMMON_COMPLAINTS',
            icon: 'fa-solid fa-face-angry',
            route: ABS_CUSTOMER_COMPLAINTS_URL,
            accessRights: 'CustomerComplaint',
        },
        {
            name: 'COMMON_SUGGESTIONS',
            icon: 'fa-solid fa-lightbulb-exclamation-on',
            route: ABS_CUSTOMER_SUGGESTIONS_URL,
            accessRights: 'CustomerSuggestion',
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_SCHEDULED_SALES_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
        {
            name: 'SCH_SALES_POLLS',
            icon: 'fa-solid fa-poll-people',
            route: ABS_SCHEDULED_SALES_POLL_URL,
            accessRights: 'SalesPoll'
        },
        {
            name: 'SCH_POLL_QUESTIONS',
            icon: 'fa-solid fa-question',
            route: ABS_SCHEDULED_POLL_QUESTION_URL,
            accessRights: 'PollQuestion'
        },

        {
            name: 'COMMON_PASSWORD_RESET',
            icon: 'fa-solid fa-empty-set',
            route: ABS_SCHEDULED_SALES_PASSWORD_RESET_URL,
            accessRights: 'User'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_SCHEDULED_SALES_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'SCH_POLL_CHARTS',
            icon: 'fa-solid fa-chart-pie-simple',
            route: ABS_SCHEDULED_POLL_CHARTS_URL,
            accessRights: 'PollQuestion'
        },
        {
            name: 'SCH_POLL_HISTORY',
            icon: 'fa-solid fa-chart-sine',
            route: ABS_SCHEDULED_POLL_HISTORY_CHARTS_URL,
            accessRights: 'PollQuestion'
        },
    ],
    accessRights: 'SCHEDULED_SALES',
    customerRights: {read: true, edit: false, delete: false, write: false}
};
