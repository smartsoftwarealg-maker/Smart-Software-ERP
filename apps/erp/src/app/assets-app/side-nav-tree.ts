import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ASSET_LOCATIONS,
    ABS_ASSETS_REPORTS_URL,
    ABS_ASSETS_URL,
    ABS_COMMON_REPORTS_URL,
    ABS_COST_TYPES,
    ABS_REVALUATION_TYPES
} from '../common';

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
            name: 'ASSET_LOCATIONS',
            icon: 'fa-solid fa-location-crosshairs',
            route: ABS_ASSET_LOCATIONS
        },
        {
            name: 'ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL,
            accessRights: 'Asset'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_ASSETS_REPORTS_URL,
        },
    ]
};
