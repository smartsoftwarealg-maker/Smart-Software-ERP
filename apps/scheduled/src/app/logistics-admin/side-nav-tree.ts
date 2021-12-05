import {
    ABS_STOCK_ACTIVITY,
    ABS_STOCK_AGENT_TYPE,
    ABS_STOCK_COMPANY_TYPE,
    ABS_STOCK_CURRENCY,
    ABS_LOGISTICS_PAY_METHOD,
    ABS_STOCK_UNITS_URL,
    ABS_STOCK_VAT_URL,
    ABS_LOGISTICS_OPTIONS,
    ABS_STOCK_AGENT_URL,
    LOGISTICS_STOCK_AGENT_URL,
    ABS_FINANCE_PAYMENTS
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const logAdminNavTree: SideNavNode = {
    name: 'COMMON_LOGISTICS-ADMINISTRATION',
    icon: 'fas fa-users-cog',
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
            route: LOGISTICS_STOCK_AGENT_URL
        },
        {
            name: 'COMMON_VAT',
            icon: 'fas fa-percentage',
            route: ABS_STOCK_VAT_URL,
            accessRights: 'VAT'
        },
        // {
        //     name: 'COMMON_AGENT_TYPES',
        //     icon: 'fas fa-user',
        //     route: ABS_STOCK_AGENT_TYPE,
        //     accessRights: 'AgentType'
        // },
        {
            name: 'COMMON_COMPANY_TYPES',
            icon: 'fas fa-building',
            route: ABS_STOCK_COMPANY_TYPE
        },
        {
            name: 'COMMON_ACTIVITIES',
            icon: 'fab fa-app-store-ios',
            route: ABS_STOCK_ACTIVITY,
            accessRights: 'Activity'
        },
        {
            name: 'LOGISTICS_PAY_METHOD',
            icon: 'fas fa-money-check-edit',
            route: ABS_LOGISTICS_PAY_METHOD,
            accessRights: 'MPay'
        },
        {
            name: 'COMMON_CURRENCIES',
            icon: 'fas fa-coins',
            route: ABS_STOCK_CURRENCY,
            accessRights: 'Currency'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-coins',
            route: ABS_LOGISTICS_OPTIONS,
            accessRights: 'Option'
        },
    ]
};
