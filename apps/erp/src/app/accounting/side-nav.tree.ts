import {SideNavNode} from '@ss/common/api-common';
import {ABS_POLICIES_URL, ABS_STOCK_ACCOUNT_URL} from '../common';


export const accountingNavTree: SideNavNode = {
    name: 'ACCOUNTING',
    icon: 'fas fa-cog',
    accessRights: 'ACCOUNTING',
    children: [
        {
            name: 'LOGISTICS_ACCOUNTS',
            icon: 'fas fa-user-circle',
            route: ABS_STOCK_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-user-circle',
            route: ABS_POLICIES_URL,
            accessRights: 'ACCPolicy'
        },
    ]
}
