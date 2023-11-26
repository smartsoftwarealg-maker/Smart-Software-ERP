import {SideNavNode} from '@ss/common/api-common';
import { ABS_COSTING_ITEMS, ABS_COSTING_KEYS } from '../common';

export const costingNavTree: SideNavNode = {
    name: 'COSTING',
    icon: 'fa-solid fa-hand-holding-dollar',
    children: [
        {
            name: 'COSTING_ITEMS',
            icon: 'fa-solid fa-sitemap',
            route: ABS_COSTING_ITEMS,
            accessRights: 'CItem'
        },

        {
            name: 'COSTING_KEYS',
            icon: 'fa-solid fa-key-skeleton-left-right',
            route: ABS_COSTING_KEYS,
            accessRights: 'CKey'
        },

    ]

};
