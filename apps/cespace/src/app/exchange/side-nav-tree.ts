import {
    ABS_CUSTOMER_PROFILE,
    ABS_IDIOT_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const exchangeNavTree: SideNavNode[] =
    [
        {
            name: 'EXCHANGE_CURRENCY_DEPOSIT',
            icon: 'fas fa-balance-scale',
            route: ABS_IDIOT_URL
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE
        }
    ];
