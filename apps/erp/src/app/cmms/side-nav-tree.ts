
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_CMMS_ALERTS_URL,
    ABS_CMMS_FAULT_CAUSE_URL,
    ABS_CMMS_FAULTS_URL, ABS_CMMS_METERS_URL, ABS_CMMS_ORDER_URL, ABS_CMMS_PLANS_URL, ABS_CMMS_PM_URL,
    ABS_CMMS_PRIORITY__URL, ABS_CMMS_READING_URL, ABS_CMMS_REQUEST_URL,
    ABS_CMMS_ROOT_CAUSE_URL, ABS_CMMS_ROUTING_URL, ABS_CMMS_SOLUTION_URL,
    ABS_CMMS_STATUS__URL, ABS_CMMS_TRIGGER_URL
} from "../common";

export const cmmsNavTree: SideNavNode = {
    name: 'CMMS',
    icon: 'fa-solid fa-screwdriver-wrench',
    children: [
        {
            name: 'CMMS_FAULTS',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_CMMS_FAULTS_URL,
            accessRights: 'CMFault'
        },
        {
            name: 'CMMS_FAULT_CAUSE',
            icon: 'fa-solid fa-arrow-right-from-arc',
            route: ABS_CMMS_FAULT_CAUSE_URL,
            accessRights: 'CMFaultCause'
        },
        {
            name: 'CMMS_ROOT_CAUSE',
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
        {
            name: 'CMMS_STATUS',
            icon: 'fa-solid fa-signal-bars',
            route: ABS_CMMS_STATUS__URL,
            accessRights: 'CMStatus'
        },
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
            name: 'CMMS_REQUESTS',
            icon: 'fa-solid fa-hand-holding',
            route: ABS_CMMS_REQUEST_URL,
            accessRights: 'CMMSRequest'
        },
        {
            name: 'CMMS_ORDERS',
            icon: 'fa-solid fa-hammer-crash',
            route: ABS_CMMS_ORDER_URL,
            accessRights: 'CMMSOrder'
        },
    ],
    accessRights: 'CMMS'
};
