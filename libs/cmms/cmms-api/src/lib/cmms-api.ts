import { Lookup } from '@ss/common/api-lookup';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Asset } from '@ss/assets-component';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { IEmployee } from '@ss/employee-services/employee-services';

export const CMMS_ASSET5S_URL = '/assets';
export const CMMS_PLANS_URL = '/cmmsplans';
export const CMMS_PREV_WORK_ORDER_URL = '/prevorders';
export const CMMS_CUR_WORK_ORDER_URL = '/curorders';
export const CMMS_INSPECTION_ORDER_URL = '/inspections';
export const CMMS_SERVICE_REQUEST_URL = '/srvrequests';
export const CMMS_PENDING_SERVICE_REQUEST_URL = '/cmms/pending';
export const CMMS_PM_URL = '/cmmspm';
export const CMMS_ALERT_URL = '/cmmspm/alerts';
export const CMMS_READINGS_URL = '/readings';
export const CMMS_TRIGGERS_URL = '/triggers';
export const CMMS_ROUTING_URL = '/routing';
export const CMMS_DETAIL_URL = '/detail';
export const CMMS_WORKS = '/works';
export const CMMS_ARTICLES = '/articles';
export const CMMS_PERSONS = '/persons';


export const CMMS_TRIGGER_TYPES: Lookup[] = [
    { id: 1, description: 'CMMS_TIME' },
    { id: 2, description: 'CMMS_READING' },
    { id: 3, description: 'CMMS_EITHER' }
];

export const PREVENTIVE = 1;
export const CURATIVE = 2;
export const INSPECTION = 3;

export const WORK_TYPES: Lookup[] = [
    { id: 1, description: 'CMMS_PREVENTIVE' },
    { id: 2, description: 'CMMS_CURATIVE' },
    { id: 3, description: 'CMMS_INSPECTION' }
];

export const CMMS_SERVICE_REQUEST = 10;
export const CMMS_PREVENTIVE_ORDER = 12;
export const CMMS_CURATIVE_ORDER = 15;


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
    orderNumber?: number;
}

export interface RoutingPart {
    id: number;
    parentId: number;
    partId: number;
    qty: number;
    reference?: string;
    description?: string;
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

export interface ChecklistDetail {
    id: number;
    parentId: number;
    order: number;
    description: string;
    hours?: number;
    cost?: number;
    hasReading: boolean;
}

export interface WorkArticle {
    id: number;
    parentId: number;
    articleId: number;
    qty: number;
    reference: string;
    description: string;
}

export interface Work {
    id: number;
    centerId: number;
    document: number;
    number: number;
    date: Date;
    description: string;
    assetId: number;
    requester?: number;
    wrType?: number;
    priority?: number;
    plannedStart?: Date;
    scheduledStart?: Date;
    actualStart?: Date;
    plannedDue?: Date;
    scheduledDue?: Date;
    actualDue?: Date;
    routingId: number;
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
    statusDescription?: string;
    creation_time: Date;
    status?: number;
    creatorId: number;
    validated: boolean;
    sourceId?: number;
    plannerId?: number;
    schedulerId?: number;
    executorId?: number;
    closerId?: number;
    closureDate?: Date;
    creatorDescription?: string;
    schedulerDescription?: string;
    executorDescription?: string;
    closerDescription?: string;
}
export interface CMMSEmployee extends IEmployee {
    hourlyRate?: number;
}

export interface WorkPerson extends IEmployee {
    id: number;
    parentId: number;
    personId: number;
    description?: string;
    from: Date;
    to: Date;
    firstName: string;
    lastName: string;
}

export class AssetLookup extends DefaultAutoCompleteModel<Asset> {
    constructor(public override entitySrv: BaseEntityService<Asset>) {
        super(entitySrv);
    }

    override toString = (x: Asset | null) => x ? x.reference + ' ' + x.description?.substring(0, 70) : null;
}
