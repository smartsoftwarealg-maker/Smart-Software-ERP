export const WORK_CENTER_URL = '/production/work-centers';

export const WORK_CENTER_TYPES = [
    'MACHINE',
    'LABOR',
    'ASSEMBLY',
    'INSPECTION',
    'STORAGE',
];

export interface WorkCenter {
    id: number;
    code?: string;
    name: string;
    description?: string;
    costCenterId: number;
    workCenterType?: string; // 'MACHINE' | 'LABOR' | 'ASSEMBLY' | 'INSPECTION' | 'STORAGE'
    location?: string;
    building?: string;
    floor?: string;
    capacityCapacity?: number;
    capacityUsed?: number;
    efficiencyFactor?: number;
    utilizationFactor?: number;
    queueTime?: number;
    moveTime?: number;
    waitTime?: number;
    isActive?: number;
    isBottleneck?: number;
    requiresSetup?: number;
    allowsParallel?: number;
    currencyId?: number;
    createdAt?: Date; // ISO date string
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    deletedAt?: Date;
    ccDescription?: string;
}


export interface WorkCenterActivity {
    id: number;
    parentId: number;
    activityTypeId: number;
    formulaFactor?: number;
    baseUnit?: string;
    isActive?: boolean;
    priority?: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface ActivityRate {
    id: number;
    costCenterId: number;
    activityTypeId: number;
    rateAmount: number;
    currencyId: number;
    validFrom: Date;
    validTo?: Date;
    version?: number;
    isActive?: boolean;
    approvedBy?: number;
    approvedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    typeDescription?: string;
}
