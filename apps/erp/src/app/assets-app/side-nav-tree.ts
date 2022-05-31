import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ASSET_CLASSES,
    ABS_ASSET_LOCATIONS, ABS_ASSET_OFFICES_URL,
    ABS_ASSETS_REPORTS_URL,
    ABS_ASSETS_URL,
    ABS_COMMON_REPORTS_URL,
    ABS_COST_TYPES, ABS_OPTIONS_URL, ABS_ORGANIZATIONS_OFFICES_URL,
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
            name: 'COMMON_CLASSES',
            icon: 'fa-solid fa-rectangle-list',
            route: ABS_ASSET_CLASSES
        },
        {
            name: 'ASSET_REVALUATION_TYPES',
            icon: 'fa-solid fa-list-tree',
            route: ABS_REVALUATION_TYPES
        },
        // {
        //     name: 'COMMON_OFFICES',
        //     icon: 'fas fa-chair',
        //     route: ABS_ASSET_OFFICES_URL,
        //     accessRights: 'Office'
        // },
        {
            name: 'ASSET_LOCATIONS',
            icon: 'fa-solid fa-location-crosshairs',
            route: ABS_ASSET_OFFICES_URL,
            // route: ABS_ASSET_LOCATIONS
        },
        {
            name: 'ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL,
            accessRights: 'Asset'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fa-solid fa-tools',
            route: ABS_OPTIONS_URL,
            accessRights: 'AssetOption'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_ASSETS_REPORTS_URL,
        },
    ]
};
