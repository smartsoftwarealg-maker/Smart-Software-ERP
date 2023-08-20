
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_CMMS_ALERTS_URL,
    ABS_CMMS_FAULT_CAUSE_URL,
    ABS_CMMS_FAULTS_URL,
    ABS_CMMS_METERS_URL,
    ABS_CUR_ORDER_URL,
    ABS_CMMS_PLANS_URL,
    ABS_CMMS_PM_URL,
    ABS_CMMS_PRIORITY__URL,
    ABS_CMMS_READING_URL,
    ABS_PREV_ORDERS_URL,
    ABS_CMMS_ROOT_CAUSE_URL,
    ABS_CMMS_ROUTING_URL,
    ABS_CMMS_SOLUTION_URL,
    ABS_CMMS_ASSETS_URL,
    ABS_CMMS_END_TYPES,
    ABS_CMMS_STATUS_TYPES,
    ABS_CMMS_CLASSES,
    ABS_CMMS_BUILDINGS,
    ABS_CMMS_OFFICES_URL,
    ABS_SERVICE_REQUEST_URL,
    ABS_CMMS_PARTS_REQUEST_URL, ABS_CMMS_TRIGGER_URL, ABS_CMMS_CHARTS_URL, ABS_CMMS_ASSETS_TREE_URL, ABS_ASSET_LOCATIONS
} from "../common";

export const cmmsNavTree: SideNavNode = {
    name: 'CMMS',
    icon: 'fa-solid fa-screwdriver-wrench',
    children: [
        {
            name: 'ASSET_END_TYPES',
            icon: 'fa-solid fa-person-walking-dashed-line-arrow-right',
            route: ABS_CMMS_END_TYPES,
            accessRights: 'AssetCostType'
        },
        {
            name: 'COMMON_FURNITURE_STATUS',
            icon: 'fa-solid fa-battery-bolt',
            route: ABS_CMMS_STATUS_TYPES,
            accessRights: 'FurnitureStatus'
        },
        {
            name: 'COMMON_CLASSES',
            icon: 'fa-solid fa-rectangle-list',
            route: ABS_CMMS_CLASSES,
            accessRights: 'AssetClass'
        },
        {
            name: 'ASSET_SITES',
            icon: 'fa-solid fa-earth-africa',
            route: ABS_ASSET_LOCATIONS,
            accessRights: 'ASSLocation'
        },
        {
            name: 'CMMS_ZONES',
            icon: 'fa-solid fa-city',
            route: ABS_CMMS_BUILDINGS,
            accessRights: 'AssetBuilding'
        },
        {
            name: 'CMMS_WORKSHOPS',
            icon: 'fa-solid fa-person-digging',
            route: ABS_CMMS_OFFICES_URL,
            accessRights: 'Office'
        },
        {
            name: 'CMMS_EQUIPMENT',
            icon: 'fa-solid fa-car-building',
            route: ABS_CMMS_ASSETS_URL,
            accessRights: 'Asset'
        },
        {
            name: 'ASSET_ASSET_TREE',
            icon: 'fa-solid fa-tree',
            route: ABS_CMMS_ASSETS_TREE_URL,
            accessRights: 'Asset'
        },
        {
            name: 'CMMS_FAULTS',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_CMMS_FAULTS_URL,
            accessRights: 'CMFault'
        },
        {
            name: 'CMMS_FAULT_CAUSES',
            icon: 'fa-solid fa-arrow-right-from-arc',
            route: ABS_CMMS_FAULT_CAUSE_URL,
            accessRights: 'CMFaultCause'
        },
        {
            name: 'CMMS_ROOT_CAUSES',
            icon: 'fa-solid fa-square-root',
            route: ABS_CMMS_ROOT_CAUSE_URL,
            accessRights: 'CMRootTCause'
        },
        {
            name: 'CMMS_SOLUTIONS',
            icon: 'fa-regular fa-memo-circle-check',
            route: ABS_CMMS_SOLUTION_URL,
            accessRights: 'CMSolution'
        },
        // {
        //     name: 'COMMON_STATUS',
        //     icon: 'fa-solid fa-signal-bars',
        //     route: ABS_CMMS_STATUS__URL,
        //     accessRights: 'CMStatus'
        // },
        {
            name: 'CMMS_PRIORITY',
            icon: 'fa-regular fa-list-ol',
            route: ABS_CMMS_PRIORITY__URL,
            accessRights: 'CMPriority'
        },
        // {
        //     name: 'CMMS_TYPES',
        //     icon: 'fa-solid fa-comment-text',
        //     route: ABS_CMMS_TYPE__URL,
        //     accessRights: 'CMType'
        // },
        {
            name: 'CMMS_METERS',
            icon: 'fa-solid fa-meter',
            route: ABS_CMMS_METERS_URL,
            accessRights: 'CMMeter'
        },
        {
            name: 'CMMS_PLANS',
            icon: 'fa-solid fa-arrow-progress',
            route: ABS_CMMS_PLANS_URL,
            accessRights: 'CMPlan'
        },
        {
            name: 'CMMS_TRIGGERS',
            icon: 'fa-solid fa-gun',
            route: ABS_CMMS_TRIGGER_URL,
            accessRights: 'CMTrigger'
        },
        {
            name: 'CMMS_READINGS',
            icon: 'fa-solid fa-gauge-low',
            route: ABS_CMMS_READING_URL,
            accessRights: 'CMReading'
        },
        {
            name: 'CMMS_ROUTINGS',
            icon: 'fa-solid fa-list-tree',
            route: ABS_CMMS_ROUTING_URL,
            accessRights: 'CMType'
        },
        {
            name: 'CMMS_PM',
            icon: 'fa-solid fa-hands-bubbles',
            route: ABS_CMMS_PM_URL,
            accessRights: 'PM'
        },
        {
            name: 'CMMS_ALERTS',
            icon: 'fa-solid fa-bells',
            route: ABS_CMMS_ALERTS_URL,
            accessRights: 'CMMSAlert'
        },
        {
            name: 'CMMS_SERVICE_REQUESTS',
            icon: 'fa-solid fa-hand-holding',
            route: ABS_SERVICE_REQUEST_URL,
            accessRights: 'CMMSRequest'
        },
        {
            name: 'CMMS_PREV_WORK_ORDER',
            icon: 'fa-solid fa-washing-machine',
            route: ABS_PREV_ORDERS_URL,
            accessRights: 'PREVOrder'
        },
        {
            name: 'CMMS_CUR_WORK_ORDER',
            icon: 'fa-solid fa-hammer-crash',
            route: ABS_CUR_ORDER_URL,
            accessRights: 'CUROrder'
        },
        {
            name: 'STOCK_PARTS_REQUEST',
            icon: 'fa-solid fa-car-battery',
            route: ABS_CMMS_PARTS_REQUEST_URL,
            accessRights: 'PartsRequest'
        },
        {
            name: 'COMMON_CHARTS',
            icon: 'fa-duotone fa-chart-simple',
            route: ABS_CMMS_CHARTS_URL,
            accessRights: 'Chart'
        },
    ],
    accessRights: 'CMMS'
};
