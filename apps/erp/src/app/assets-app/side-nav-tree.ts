import {SideNavNode} from '@ss/common/api-common';
import {ABS_ASSETS_URL, ABS_COST_TYPES, ABS_REVALUATION_TYPES} from '../common';

export const assetsNavTree: SideNavNode = {
    name: 'ASSETS',
    icon: 'fa-solid fa-car-bus',
    accessRights: 'ASSETS',
    children: [
        {
            name: 'ASSET_COST_TYPES',
            icon: 'fa-solid fa-list-check',
            route: ABS_COST_TYPES
        },
        {
            name: 'ASSET_REVALUATION_TYPES',
            icon: 'fa-solid fa-list-tree',
            route: ABS_REVALUATION_TYPES
        },
        {
            name: 'COMMON_ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL
        },
    ]
};
