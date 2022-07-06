import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ASSET_APPOINTMENT_DOC_URL,
    ABS_ASSET_CLASSES, ABS_ASSET_INVENTORY_URL, ABS_ASSET_LOCATIONS,
    ABS_ASSET_OFFICES_URL, ABS_ASSET_RECEPTIONS_URL,
    ABS_ASSETS_REPORTS_URL,
    ABS_ASSETS_URL, ABS_BLOCKING_TYPES,
    ABS_COST_TYPES, ABS_LOGISTICS_ACTIVITY, ABS_OPTIONS_URL, ABS_REVALUATION_TYPES, ASSETS_STOCK_AGENT_URL
} from '../common';

export const assetsNavTree: SideNavNode = {
    name: 'ASSETS',
    icon: 'fa-solid fa-car-bus',
    accessRights: 'ASSETS',
    children: [
        {
            name: 'COMMON_ACTIVITIES',
            icon: 'fab fa-app-store-ios',
            route: ABS_LOGISTICS_ACTIVITY,
            accessRights: 'Activity'
        },
        {
            name: 'ASSET_COST_TYPES',
            icon: 'fa-solid fa-list-check',
            route: ABS_COST_TYPES,
            accessRights: 'AssetCostType'
        },
        {
            name: 'ASSET_BLOCKING_TYPES',
            icon: 'fa-solid fa-pause',
            route: ABS_BLOCKING_TYPES,
            accessRights: 'AssetBlockingType'
        },
        {
            name: 'COMMON_CLASSES',
            icon: 'fa-solid fa-rectangle-list',
            route: ABS_ASSET_CLASSES,
            accessRights: 'Class'
        },
        {
            name: 'ASSET_REVALUATION_TYPES',
            icon: 'fa-solid fa-list-tree',
            route: ABS_REVALUATION_TYPES,
            accessRights: 'Revaluation'
        },
        {
            name: 'LOGISTICS_AGENTS',
            icon: 'fas fa-user',
            route: ASSETS_STOCK_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'ASSET_LOCATIONS',
            icon: 'fas fa-chair',
            route: ABS_ASSET_LOCATIONS,
            accessRights: 'ASSLocation'
        },
        {
            name: 'COMMON_OFFICES',
            icon: 'fa-solid fa-location-crosshairs',
            route: ABS_ASSET_OFFICES_URL,
            accessRights: 'Office'
        },
        {
            name: 'ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL,
            accessRights: 'Asset'
        },
        {
            name: 'ASSET_RECEPTIONS',
            icon: 'fa-solid fa-hands-holding-diamond',
            route: ABS_ASSET_RECEPTIONS_URL,
            accessRights: 'ASSReception'
        },
        {
            name: 'ASSET_APPOINTMENTS',
            icon: 'fa-solid fa-check-to-slot',
            route: ABS_ASSET_APPOINTMENT_DOC_URL,
            accessRights: 'ASSAppointment'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fa-solid fa-tools',
            route: ABS_OPTIONS_URL,
            accessRights: 'AssetOption'
        },
        {
            name: 'INVENTORY',
            icon: 'fa-solid fa-scanner-gun',
            route: ABS_ASSET_INVENTORY_URL,
            accessRights: 'AssetInventory'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_ASSETS_REPORTS_URL,
        },
    ]
};
