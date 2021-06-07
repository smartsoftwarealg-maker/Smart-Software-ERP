import { SideNavNode } from '@ss/common/ui-shell';
import {
    ABS_EXCHANGE_AGENT_URL,
    ABS_EXCHANGE_COMMISSION_URL,
    ABS_EXCHANGE_CURRENCY_URL,
    ABS_EXCHANGE_DEPOSIT_TYPE_URL,
    ABS_EXCHANGE_DEPOSIT_URL,
    ABS_EXCHANGE_EXCHANGE_URL,
    ABS_EXCHANGE_GLOBAL_BALANCE_URL,
    ABS_EXCHANGE_REPORT_PARAMS,
    ABS_EXCHANGE_TRANSFER_URL
} from '../common';

export const APP_NAME = 'EXCHANGE';

export const fileNavTree: SideNavNode = {
    name: 'COMMON_FILE',
    icon: 'fas fa-file',
    app: APP_NAME,
    children: [
        {
            name: 'LOGISTICS_AGENT',
            icon: 'fas fa-user',
            route: ABS_EXCHANGE_AGENT_URL
        },
        {
            name: 'EXCHANGE_DEPOSIT_TYPES',
            icon: 'fas fa-server',
            route: ABS_EXCHANGE_DEPOSIT_TYPE_URL
        },
        {
            name: 'LOGISTICS_CURRENCIES',
            icon: 'fas fa-euro-sign',
            route: ABS_EXCHANGE_CURRENCY_URL
        },
    ]
};

export const exchangeNavTree: SideNavNode = {
    name: 'EXCHANGE',
    icon: 'fas fa-coins',
    app: APP_NAME,
    children: [
        {
            name: 'EXCHANGE_CURRENCY_DEPOSIT',
            icon: 'fas fa-money-check-alt',
            route: ABS_EXCHANGE_DEPOSIT_URL
        },
        {
            name: 'EXCHANGE_TRANSFERS',
            icon: 'fas fa-balance-scale-left',
            route: ABS_EXCHANGE_TRANSFER_URL
        },
        {
            name: 'EXCHANGE_COMMISSIONS',
            icon: 'fas fa-funnel-dollar',
            route: ABS_EXCHANGE_COMMISSION_URL
        },
        {
            name: 'EXCHANGE_CURRENCY_EXCHANGE',
            icon: 'fas fa-cash-register',
            route: ABS_EXCHANGE_EXCHANGE_URL
        },
        {
            name: 'EXCHANGE_GLOBAL_BALANCE',
            icon: 'fas fa-balance-scale',
            route: ABS_EXCHANGE_GLOBAL_BALANCE_URL
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-file-chart-line',
            route: ABS_EXCHANGE_REPORT_PARAMS
        }
    ]
};
