import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ASSET_ACCOUNT_URL,
    ABS_ASSET_ACTIVITY,
    ABS_ASSET_APPOINTMENT_DOC_URL,
    ABS_ASSET_BUILDINGS,
    ABS_ASSET_CLASSES,
    ABS_ASSET_INJECTION_URL,
    ABS_ASSET_INVENTORY_URL,
    ABS_ASSET_LOCATIONS,
    ABS_ASSET_OFFICES_URL,
    ABS_ASSET_RECEPTIONS_URL,
    ABS_ASSET_SEARCH_URL,
    ABS_ASSETS_REPORTS_URL,
    ABS_ASSETS_URL,
    ABS_ASSET_BLOCKING_TYPES,
    ABS_ASSET_COST_TYPES,
    ABS_ASSET_END_TYPES,
    ABS_ASSET_OPTIONS_URL,
    ABS_ASSET_REVALUATION_TYPES,
    ABS_ASSET_STATUS_TYPES,
    ABS_ASSETS_AGENT_URL,
    ABS_ASSET_MARKS_URL,
    ABS_ASSET_DASHBOARD_URL, ABS_ASSET_TRANSFER_URL
} from '../common';

export const assetsNavTree: SideNavNode = {
    name: 'ASSETS',
    icon: 'fa-solid fa-car-bus',
    accessRights: 'ASSETS',
    children: [
        {
            name: 'ACC_ASSET_ACCOUNTS',
            icon: 'fas fa-cogs',
            route: ABS_ASSET_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'COMMON_ACTIVITIES',
            icon: 'fab fa-app-store-ios',
            route: ABS_ASSET_ACTIVITY,
            accessRights: 'Activity'
        },
        {
            name: 'ASSET_COST_TYPES',
            icon: 'fa-solid fa-list-check',
            route: ABS_ASSET_COST_TYPES,
            accessRights: 'AssetCostType'
        },
        {
            name: 'ASSET_END_TYPES',
            icon: 'fa-solid fa-person-walking-dashed-line-arrow-right',
            route: ABS_ASSET_END_TYPES,
            accessRights: 'AssetCostType'
        },
        {
            name: 'COMMON_FURNITURE_STATUS',
            icon: 'fa-solid fa-battery-bolt',
            route: ABS_ASSET_STATUS_TYPES,
            accessRights: 'FurnitureStatus'
        },
        {
            name: 'ASSET_BLOCKING_TYPES',
            icon: 'fa-solid fa-pause',
            route: ABS_ASSET_BLOCKING_TYPES,
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
            route: ABS_ASSET_REVALUATION_TYPES,
            accessRights: 'Revaluation'
        },
        {
            name: 'COMMON_MARKS',
            icon: 'fa-solid fa-copyright',
            route: ABS_ASSET_MARKS_URL,
            accessRights: 'Mark'
        },
        {
            name: 'LOGISTICS_AGENTS',
            icon: 'fas fa-user',
            route: ABS_ASSETS_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'ASSET_SITES',
            icon: 'fa-solid fa-earth-africa',
            route: ABS_ASSET_LOCATIONS,
            accessRights: 'ASSLocation'
        },
        {
            name: 'ASSET_BUILDINGS',
            icon: 'fa-solid fa-city',
            route: ABS_ASSET_BUILDINGS,
            accessRights: 'AssetBuilding'
        },
        {
            name: 'ASSET_LOCATIONS',
            icon: 'fa-solid fa-location-crosshairs',
            route: ABS_ASSET_OFFICES_URL,
            accessRights: 'Office'
        },
        {
            name: 'ASSET_RECEPTIONS',
            icon: 'fa-solid fa-hands-holding-diamond',
            route: ABS_ASSET_RECEPTIONS_URL,
            accessRights: 'AssetReception'
        },
        {
            name: 'ASSET_APPOINTMENTS',
            icon: 'fa-solid fa-check-to-slot',
            route: ABS_ASSET_APPOINTMENT_DOC_URL,
            accessRights: 'ASSAppointmentHeader'
        },
        {
            name: 'ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL,
            accessRights: 'Asset'
        },
        {
            name: 'COMMON_SEARCH',
            icon: 'fa-brands fa-searchengin',
            route: ABS_ASSET_SEARCH_URL,
            accessRights: 'Asset'
        },
        {
            name: 'COMMON_EXCEL_INJECTION',
            icon: 'fa-solid fa-syringe',
            route: ABS_ASSET_INJECTION_URL,
            accessRights: 'Asset'
        },
        {
            name: 'INVENTORY',
            icon: 'fa-solid fa-scanner-gun',
            route: ABS_ASSET_INVENTORY_URL,
            accessRights: 'AssetInventory'
        },
        {
            name: 'ASSET_TRANSFER',
            icon: 'fa-sharp fa-solid fa-shuffle',
            route: ABS_ASSET_TRANSFER_URL,
            accessRights: 'AssetTransfer'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fa-solid fa-tools',
            route: ABS_ASSET_OPTIONS_URL,
            accessRights: 'AssetOption'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_ASSET_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-sharp fa-solid fa-file-chart-column',
            route: ABS_ASSETS_REPORTS_URL,
            accessRights: 'Report'
        },
    ]
};
