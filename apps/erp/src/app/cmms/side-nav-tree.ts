
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_CMMS_FAULT_CAUSE_URL,
    ABS_CMMS_FAULTS_URL, ABS_CMMS_PLANS_URL,
    ABS_CMMS_PRIORITY__URL,
    ABS_CMMS_ROOT_CAUSE_URL, ABS_CMMS_ROUTING_URL,
    ABS_CMMS_STATUS__URL, ABS_CMMS_TYPE__URL
} from '../common';

export const cmmsNavTree: SideNavNode = {
    name: 'CMMS',
    icon: 'fa-solid fa-screwdriver-wrench',
    children: [
        {
            name: 'CMMS_FAULTS',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_CMMS_FAULTS_URL,
            accessRights: 'CMMSFault'
        },
        {
            name: 'CMMS_FAULT_CAUSE',
            icon: 'fa-solid fa-gun',
            route: ABS_CMMS_FAULT_CAUSE_URL,
            accessRights: 'CMMSFaultCause'
        },
        {
            name: 'CMMS_ROOT_CAUSE',
            icon: 'fa-solid fa-square-root',
            route: ABS_CMMS_ROOT_CAUSE_URL,
            accessRights: 'CMMSrOOTCause'
        },
        {
            name: 'CMMS_STATUS',
            icon: 'fa-solid fa-signal-bars',
            route: ABS_CMMS_STATUS__URL,
            accessRights: 'CMMSStatus'
        },
        {
            name: 'CMMS_PRIORITY',
            icon: 'fa-regular fa-list-ol',
            route: ABS_CMMS_PRIORITY__URL,
            accessRights: 'CMMSPriority'
        },
        {
            name: 'CMMS_TYPES',
            icon: 'fa-solid fa-comment-text',
            route: ABS_CMMS_TYPE__URL,
            accessRights: 'CMMSType'
        },
        {
            name: 'CMMS_PLANS',
            icon: 'fa-solid fa-arrow-progress',
            route: ABS_CMMS_PLANS_URL,
            accessRights: 'CMMPlan'
        },
        {
            name: 'CMMS_ROUTINGS',
            icon: 'fa-solid fa-list-tree',
            route: ABS_CMMS_ROUTING_URL,
            accessRights: 'CMMSType'
        },
    ],
    accessRights: 'CMMS'
};
