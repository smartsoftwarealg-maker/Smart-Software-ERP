import {
    ABS_CUSTOMER_PROFILE,
    ABS_EXCHANGE_AGENT_URL,
    ABS_EXCHANGE_COMMISSION_URL,
    ABS_EXCHANGE_CURRENCY_URL,
    ABS_EXCHANGE_DEPOSIT_TYPE_URL,
    ABS_EXCHANGE_DEPOSIT_URL,
    ABS_EXCHANGE_EXCHANGE_URL,
    ABS_EXCHANGE_GLOBAL_BALANCE_URL,
    ABS_EXCHANGE_REPORT_PARAMS,
    ABS_EXCHANGE_TRANSFER_URL, ABS_IDIOT_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const exchangeNavTree: SideNavNode[] =
    [
        {
            name: 'EXCHANGE_CURRENCY_DEPOSIT',
            icon: 'fas fa-balance-scale',
            route: ABS_IDIOT_URL
        },
        // {
        //     name: 'EXCHANGE_CURRENCY_DEPOSIT',
        //     icon: 'fas fa-money-check-alt',
        //     route: ABS_EXCHANGE_DEPOSIT_URL,
        //     accessRights: 'Deposit'
        // },
        // {
        //     name: 'COMMON_REPORTS',
        //     icon: 'fas fa-file-chart-line',
        //     route: ABS_EXCHANGE_REPORT_PARAMS
        // },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE
        }
    ];
