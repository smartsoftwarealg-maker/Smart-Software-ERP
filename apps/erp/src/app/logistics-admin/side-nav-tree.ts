import {SideNavNode} from '@ss/common/ui-shell';

import {
    ABS_STOCK_ACTIVITY,
    ABS_STOCK_AGENT_TYPE,
    ABS_STOCK_COMPANY_TYPE,
    ABS_STOCK_CURRENCY,
    ABS_LOGISTICS_PAY_METHOD,
    ABS_STOCK_UNITS_URL,
    ABS_STOCK_VAT_URL
} from '../constants';

export const logAdminNavTree: SideNavNode = {
    name: 'COMMON_LOGISTICS-ADMINISTRATION',
    icon: 'fas fa-users-cog',
    children: [
        {
            name: 'COMMON_UNITS',
            icon: 'fas fa-balance-scale-right',
            route: ABS_STOCK_UNITS_URL
        },
        {
            name: 'COMMON_VAT',
            icon: 'fas fa-percentage',
            route: ABS_STOCK_VAT_URL
        },
        {
            name: 'COMMON_AGENT_TYPES',
            icon: 'fas fa-user',
            route: ABS_STOCK_AGENT_TYPE
        },
        {
            name: 'COMMON_COMPANY_TYPES',
            icon: 'fas fa-building',
            route: ABS_STOCK_COMPANY_TYPE
        },
        {
            name: 'COMMON_ACTIVITIES',
            icon: 'fab fa-app-store-ios',
            route: ABS_STOCK_ACTIVITY
        },
        {
            name: 'LOGISTICS_PAY_METHOD',
            icon: 'fas fa-money-check-edit',
            route: ABS_LOGISTICS_PAY_METHOD
        },
        {
            name: 'COMMON_CURRENCIES',
            icon: 'fas fa-coins',
            route: ABS_STOCK_CURRENCY
        },
    ]
};
