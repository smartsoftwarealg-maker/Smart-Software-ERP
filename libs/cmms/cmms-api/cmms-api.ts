import { Lookup } from "../../common/api-lookup/src";

export const CMMS_ASSET5S_URL = '/assets';
export const CMMS_PLANS_URL = '/cmmsplans';
export const CMMS_WORKS_URL = '/cmmsworks';
export const CMMS_PM_URL = '/cmmspm';
export const CMMS_ALERT_URL = '/cmmspm/alerts';
export const CMMS_READINGS_URL = '/readings';
export const CMMS_TRIGGERS_URL = '/triggers';
export const CMMS_ROUTING_URL = '/routing';
export const CMMS_DETAIL_URL = '/detail';
export const CMMS_TYPES: Lookup[] = [
    { id: 1, description: 'CMMS_TIME'},
    { id: 1, description: 'CMMS_READING'},
    { id: 1, description: 'CMMS_EITHER'}
]

export interface CMMSPlan {
    id: number;
    description: string;
    repeatMonths: number;
    scheduleType: number;
}

export interface AssetReading {
    id: number;
    parentId: number; //assetId
    meterId: number;
    date: Date,
    amount?: number;
    meterDescription?: string;
}

export interface AssetTrigger {
    id: number;
    parentId: number; //assetId
    meterId: number;
    amount?: number;
    description?: string;
}

export interface PM {
    id: number;
    centerId: number;
    parentId: number;
    planId: number;
    nextDue?: Date;
    daysAhead: number;
    lastReleased?: Date;
    priority: number;
    status?: number;
    routingId?: number;
    description?: string;
    fault?: number;
    cause?: number;
    priorityDescription?: string;
    statusDescription?: string;
    reference?: string;
    assetDescription?: string;
    planDescription?: string;
}

export interface RoutingDetail {
    id: number;
    parentId: number;
    order: number;
    description: string;
    teamSize?: number;
    hours?: number;
    cost?: number;
}

export interface Work {
    id: number;
    document: number;
    description: string;
    assetId: number;
    requester?: number;
    wrType?: number;
    priority?: number;
    plannedStart?: Date;
    actualStart?: Date;
    plannedDue?: Date;
    actualDue?: Date;
    fault?: number;
    cause?: number;
    rootCause?: number;
    solution?: number;
    laborCost?: number;
    travelCost?: number;
    materialCost?: number;
    otherCost?: number;
    assignee?: number;
    teamSize: number;
    memo?: string;
    priorityDescription?: string;
    requesterDescription?: string;
    typeDescription?: string;
    assetDescription?: string;
    faultDescription?: string;
    creation_time: Date;
}
