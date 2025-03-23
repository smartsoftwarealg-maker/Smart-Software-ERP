import {SideNavNode} from '@ss/common/api-common';
import {ABS_PRODUCTION_ORDER_URL } from '../common';

export const productionNavTree: SideNavNode = {
    name: 'PRODUCTION',
    icon: 'fa-solid fa-conveyor-belt-arm',
    accessRights: 'PRODUCTION_APP',
    children: [
        {
            name: 'PRODUCTION_PRODUCTION_ORDER',
            icon: 'fa-solid fa-industry',
            route: ABS_PRODUCTION_ORDER_URL,
            accessRights: 'POrder'
        }
    ]
};
