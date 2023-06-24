import {
    ABS_LOGISTICS_ACTIVITY,
    ABS_LOGISTICS_COMPANY_TYPE,
    ABS_LOGISTICS_CURRENCY,
    ABS_LOGISTICS_PAY_METHOD,
    ABS_LOGISTICS_OPTIONS,
    ABS_LOGISTICS_AGENT_URL,
    ABS_LOGISTICS_VAT_URL,
    ABS_LOGISTICS_ARTICLES_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const logisticsAdminNavTree: SideNavNode = {
    name: 'COMMON_LOGISTICS-ADMINISTRATION',
    icon: 'fas fa-users-cog',
    accessRights: 'LOGISTICS-ADMINISTRATION',
    children: [
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_LOGISTICS_ARTICLES_URL,
            accessRights: 'Article'
        },
        {
            name: 'COMMON_AGENT',
            icon: 'fas fa-user',
            route: ABS_LOGISTICS_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'COMMON_VAT',
            icon: 'fas fa-percentage',
            route: ABS_LOGISTICS_VAT_URL,
            accessRights: 'VAT'
        },
        {
            name: 'COMMON_COMPANY_TYPES',
            icon: 'fas fa-building',
            route: ABS_LOGISTICS_COMPANY_TYPE,
            accessRights: 'Company'
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
        {
            name: 'COMMON_CURRENCIES',
            icon: 'fas fa-coins',
            route: ABS_LOGISTICS_CURRENCY,
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
