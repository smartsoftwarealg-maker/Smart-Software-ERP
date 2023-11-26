import {SideNavNode} from '@ss/common/api-common';
import { ABS_COSTING_ITEMS } from '../common';

export const costingNavTree: SideNavNode = {
    name: 'COSTING',
    icon: 'fa-solid fa-hand-holding-dollar',
    children: [
        {
            name: 'COSTING_ITEMS',
            icon: 'fa-solid fa-sitemap',
            route: ABS_COSTING_ITEMS,
            accessRights: 'CMMSFunction'
        },

    ]

};
